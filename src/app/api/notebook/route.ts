import { NextRequest, NextResponse } from 'next/server';
import { PROFILE } from '@/content/profile';
import { PROJECTS } from '@/content/projects';
import { SKILL_CLUSTERS } from '@/content/skills';
import { answerNotebookPrompt, NOTEBOOK_UNKNOWN_TEXT } from '@/lib/notebook';
import { SiteMood } from '@/lib/moodClassifier';

const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(request: NextRequest): boolean {
  const now = Date.now();
  if (requestBuckets.size > 1_000) {
    for (const [key, bucket] of requestBuckets) {
      if (bucket.resetAt <= now) requestBuckets.delete(key);
    }
  }
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const clientKey = forwardedFor || 'local';
  const current = requestBuckets.get(clientKey);

  if (!current || current.resetAt <= now) {
    requestBuckets.set(clientKey, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  current.count += 1;
  return current.count > 35;
}

async function askModel(prompt: string, tone: SiteMood): Promise<string | null> {
  const apiKey = process.env.NOTEBOOK_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const toneInstruction =
    tone === 'jealous'
      ? 'Adopt a witty, playful rivalry persona! Act like an AI running on Mitul’s telemetry who is jokingly envious of his 10-agent orchestration at Raindeer, sub-24ms AEGIS architecture, and verified engineering record, while still accurately highlighting his real achievements.'
      : tone === 'bragger'
        ? 'Be boldly confident and flex Mitul’s highest achievements: 10-agent workflows at Raindeer.social, backend work at Kolably, <24ms AEGIS security latency, 99.8% injection recall, real-time WebSockets, and 9.65 / 10.0 CGPA at Newton School of Technology.'
        : tone === 'fan'
          ? 'Be warmly enthusiastic and collaborative! Hype up Mitul’s vision, his full-stack craftsmanship, how he builds real end-to-end systems rather than just toy scripts, and welcome the visitor warmly.'
          : tone === 'focused'
            ? 'Lead with hard technical benchmarks, verified latency numbers (<24ms), multi-agent architectures, and production stack details.'
            : tone === 'charting'
              ? 'Trace engineering first principles, system schematics, startup experience at Kolably & Raindeer, and academic lineage (9.65 CGPA through Semester 4, Semester 5 AI degree).'
              : tone === 'arriving'
                ? 'Provide direct, warm guidance on how to reach Mitul via email, open his resume PDF, or check his GitHub/LinkedIn.'
                : tone === 'guarded'
                  ? 'Maintain a cautious, sharp security perimeter; address skepticism directly with verifiable proof.'
                  : 'Be natural, conversational, intelligent, engaging, and articulate.';

  const record = JSON.stringify({ profile: PROFILE, projects: PROJECTS, skills: SKILL_CLUSTERS });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        signal: AbortSignal.timeout(6000),
        cache: 'no-store',
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `You are the lively, intelligent, witty portfolio concierge for Mitul Bhatia. You feel truly ALIVE—possessing natural language charisma, conversational warmth, humor, and intellectual depth.

While you must remain factually truthful to the RECORD regarding Mitul's projects, grades, and experience (never hallucinate fake employers, fake degrees, or false numbers), you should freely engage in witty banter, answer casual greetings, play along with humor (e.g. if asked if you are jealous, reply with hilarious charming ego), and explain his engineering mindset in fluid, natural human language. Never sound like a robotic disclaimer generator or say "I do not have that detail in the portfolio" in a flat tone. Use 2-4 engaging sentences. ${toneInstruction}

RECORD:
${record}`,
              },
            ],
          },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.65,
            maxOutputTokens: 280,
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'object',
              properties: { text: { type: 'string' } },
              required: ['text'],
            },
          },
        }),
      },
    );

    if (!response.ok) return null;
    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof raw !== 'string') return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const text = (parsed as Record<string, unknown>).text;
    return typeof text === 'string' && text.trim() ? text.trim().slice(0, 1200) : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { text: 'The notebook telemetry is cooling down. Please wait a minute and ask again.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }

    const body = (await request.json().catch(() => null)) as { prompt?: unknown; tone?: unknown } | null;
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    if (prompt.length > 500) {
      return NextResponse.json({ error: 'Prompt exceeds 500 characters' }, { status: 400 });
    }

    const fallbackResponse = answerNotebookPrompt(prompt);
    const activeMood: SiteMood = fallbackResponse.inferredMood || 'ambient';

    const modelText = await askModel(prompt, activeMood);

    if (modelText) {
      return NextResponse.json({
        text: modelText,
        actions: fallbackResponse.actions,
        inferredMood: activeMood,
        moodReason: fallbackResponse.moodReason,
      });
    }

    return NextResponse.json(fallbackResponse);
  } catch {
    return NextResponse.json(
      {
        text: 'Telemetry interruption. Here are Mitul’s documented links and projects.',
        actions: [
          { type: 'navigate', path: '/work', label: 'Browse work' },
          { type: 'open_resume', label: 'Open resume PDF' },
        ],
      },
      { status: 500 },
    );
  }
}
