/**
 * The only place that talks to the language model. Server-only.
 * Returns null whenever the model is unavailable so callers can fall back.
 */
export const DEFAULT_GEMINI_MODEL = 'gemini-3.6-flash';

export interface ModelOutput {
  text: string;
  citations: string[];
}

export type Generate = (system: string, prompt: string, temperature: number) => Promise<ModelOutput | null>;

/**
 * Back-off after a failure so a dead key or an exhausted quota costs visitors
 * nothing: Pip answers from the record straight away instead of waiting on a timeout.
 */
let unavailableUntil = 0;
let lastLogged = '';

function backOff(status: number, detail: string) {
  const ms = status === 429 ? 60_000 : status >= 500 || status === 0 ? 30_000 : 10 * 60_000;
  unavailableUntil = Date.now() + ms;
  const line = `[notebook] model unavailable (${status || 'network'}): ${detail.slice(0, 160)}; backing off ${ms / 1000}s`;
  if (line !== lastLogged) {
    lastLogged = line;
    console.warn(line);
  }
}

export function resetModelBackOff() {
  unavailableUntil = 0;
}

export const generateWithGemini: Generate = async (system, prompt, temperature) => {
  const apiKey = process.env.NOTEBOOK_API_KEY;
  if (!apiKey || Date.now() < unavailableUntil) return null;

  const model = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;

  // One deadline for both attempts, inside the client's 9s patience.
  const signal = AbortSignal.timeout(7000);

  try {
    const call = () => fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        signal,
        cache: 'no-store',
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            // Thinking tokens count against the output budget; keep thinking low
            // and the budget roomy so a short answer is never cut to nothing.
            thinkingConfig: { thinkingLevel: 'low' },
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'object',
              properties: {
                text: { type: 'string' },
                citations: { type: 'array', items: { type: 'string' } },
              },
              required: ['text'],
            },
          },
        }),
      },
    );

    let response = await call();
    // "High demand" 503s are usually gone a moment later; try once more before backing off.
    if (response.status === 503 || response.status === 500) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      response = await call();
    }

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      const message = (() => {
        try {
          return String(JSON.parse(body)?.error?.message ?? '');
        } catch {
          return '';
        }
      })();
      backOff(response.status, message || `empty body for model ${model}`);
      return null;
    }
    lastLogged = '';
    const data = await response.json();
    const candidate = data?.candidates?.[0];
    const parts: Array<{ text?: unknown; thought?: unknown }> = candidate?.content?.parts ?? [];
    const raw = parts.find((part) => typeof part.text === 'string' && !part.thought)?.text;
    if (typeof raw !== 'string') {
      console.warn(`[notebook] model returned no text (finish: ${candidate?.finishReason ?? 'unknown'})`);
      return null;
    }
    const parsed = JSON.parse(raw) as Record<string, unknown> | null;
    const text = parsed?.text;
    if (typeof text !== 'string' || !text.trim()) return null;
    const citations = Array.isArray(parsed?.citations)
      ? parsed.citations.filter((value): value is string => typeof value === 'string')
      : [];
    return { text: text.trim().slice(0, 1200), citations };
  } catch (error) {
    // Timeouts and network failures back off; a malformed reply is just skipped.
    if (!(error instanceof SyntaxError)) backOff(0, error instanceof Error ? error.message : 'request failed');
    return null;
  }
};
