import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface ConciergeAction {
  type: 'navigate' | 'open_resume' | 'cite';
  path?: string;
  label?: string;
}

interface ConciergeResponse {
  text: string;
  actions?: ConciergeAction[];
  steerMood?: 'jealous' | 'fan' | 'bragger';
}

const ALLOWED_ROUTES = new Set([
  '/',
  '/work',
  '/work/aegis',
  '/work/flately',
  '/work/agrovers',
  '/work/creditsense',
  '/work/loan-classifier',
  '/work/f1-strategy',
  '/work/vulnswarm',
  '/about',
  '/skills',
  '/contact',
  '/assets/resume.pdf',
]);

function sanitizePath(targetPath?: string): string | undefined {
  if (!targetPath) return undefined;
  if (
    targetPath.startsWith('//') ||
    targetPath.startsWith('http:') ||
    targetPath.startsWith('https:') ||
    targetPath.startsWith('javascript:')
  ) {
    return undefined;
  }
  return ALLOWED_ROUTES.has(targetPath) ? targetPath : undefined;
}

// ─── Detect steering keywords in user input ──────────────────────────────────
function detectSteering(prompt: string): 'jealous' | 'fan' | 'bragger' | null {
  const p = prompt.toLowerCase();

  // Bragger cues
  if (
    p.includes('brag') ||
    p.includes('hype') ||
    p.includes('flex') ||
    p.includes('swagger') ||
    p.includes('boast') ||
    p.includes('show off') ||
    p.includes('built different') ||
    p.includes('the goat') ||
    p.includes('why is he good') ||
    p.includes('is he the best') ||
    p.includes('prove why')
  ) {
    return 'bragger';
  }

  // Fan / unlocked cues
  if (
    p.includes('he is also worth it') ||
    p.includes('you are worth it') ||
    p.includes('you are great too') ||
    p.includes('be a fan') ||
    p.includes('cheer up') ||
    p.includes('be nice') ||
    p.includes('stop being jealous') ||
    p.includes('be happy')
  ) {
    return 'fan';
  }

  // Jealous cues
  if (
    p.includes('be jealous') ||
    p.includes('be snarky') ||
    p.includes('stay humble') ||
    p.includes('stay skeptical') ||
    p.includes('be grumpy') ||
    p.includes('cynical') ||
    p.includes('grumpy mode')
  ) {
    return 'jealous';
  }

  return null;
}

// ─── 1. JEALOUS MODE FALLBACK (Skeptical, snarky, reluctantly impressed) ─────
function getJealousFallback(prompt: string): ConciergeResponse {
  const p = prompt.toLowerCase();

  if (
    p.includes('homework') || p.includes('write my') ||
    p.includes('weather') || p.includes('recipe') ||
    p.includes('essay') || p.includes('poem')
  ) {
    return { text: "Oh great, more off-topic requests. I ONLY know Mitul's notebook. Which, fine, is actually impressively stacked — but I digress." };
  }

  if (
    p.includes('google') || p.includes('microsoft') ||
    p.includes('apple') || p.includes('meta') || p.includes('amazon')
  ) {
    return { text: "I don't have that in the notebook. And honestly? He doesn't need them. (Don't tell him I said that.)" };
  }

  if (p.includes('cgpa') || p.includes('gpa') || p.includes('grade') || p.includes('score')) {
    return {
      text: "9.80 / 10.0. Newton School of Technology. B.Tech in AI. Class of 2028. *Not* that I'm keeping track or anything. I'm definitely not impressed.",
      actions: [{ type: 'navigate', path: '/about', label: 'See Academic Record' }],
    };
  }

  if (p.includes('aegis') || p.includes('guardrail') || p.includes('injection')) {
    return {
      text: "AEGIS. Multi-agent AI security. <24ms guardrail latency, 99.8% injection recall, 100% zero-human intervention. It's... annoyingly good. I checked. Twice. Don't make assumptions about how I spent my Thursday.",
      actions: [{ type: 'navigate', path: '/work/aegis', label: 'Open AEGIS' }],
    };
  }

  if (p.includes('flately') || p.includes('roommate') || p.includes('socket')) {
    return {
      text: "Flately. Real-time roommate matching. React 19, Socket.IO, Redis. <45ms sync, 94.2% match precision, 99.9% uptime. He built that. It works. (Fine. It works really well. Happy?)",
      actions: [{ type: 'navigate', path: '/work/flately', label: 'Open Flately' }],
    };
  }

  if (p.includes('agrovers') || p.includes('soil') || p.includes('crop')) {
    return {
      text: "Agrovers. FAISS RAG + LangChain. +35% recommendation reliability, <85ms retrieval, 96.8% soil accuracy. I mean sure, helping farmers is noble. Whatever. He's good at this.",
      actions: [{ type: 'navigate', path: '/work/agrovers', label: 'Open Agrovers' }],
    };
  }

  if (p.includes('email') || p.includes('hire') || p.includes('reach') || p.includes('contact')) {
    return {
      text: "You want to reach Mitul? mitul.bhatia2024@nst.rishihood.edu.in. Go ahead. Hire him. See if I care. (I don't. Obviously.)",
      actions: [{ type: 'navigate', path: '/contact', label: 'Open Contact Index' }],
    };
  }

  if (p.includes('codeforces') || p.includes('cf')) {
    return {
      text: "900+ on Codeforces. Algorithms. Graph problems. You know, the hard stuff. Not a big deal. (It's a big deal.)",
      actions: [{ type: 'navigate', path: '/about', label: 'View Ratings' }],
    };
  }

  if (p.includes('leetcode') || p.includes('lc')) {
    return {
      text: "LeetCode 1400+. Data structures, graphs, dynamic programming. Seeing those numbers daily doesn't make me bitter. It just... makes me thorough.",
      actions: [{ type: 'navigate', path: '/about', label: 'View Ratings' }],
    };
  }

  if (p.includes('ai studio') || p.includes('gpu')) {
    return {
      text: "AI Studio at NST. Dedicated GPU cluster. 2025 – present. Agentic pipelines. RAG. He was selected. Selectively. It's fine. Everything is completely fine.",
      actions: [{ type: 'navigate', path: '/about', label: 'View AI Studio' }],
    };
  }

  if (p.includes('resume') || p.includes('cv')) {
    return {
      text: "You want his resume. Of course you do. Full transcripts, CGPA 9.80/10.0, AI Studio highlights, complete architectures. Here. Take it.",
      actions: [{ type: 'open_resume', path: '/assets/resume.pdf', label: 'Download Resume PDF' }],
    };
  }

  if (p.includes('who are you') || p.includes('what are you') || p.includes('your name')) {
    return {
      text: "I'm the Archivist. The notebook. Keeper of Mitul Bhatia's credentials, metrics, and — *sigh* — admittedly impressive track record. I know everything about him. Every perfect grade. Every sub-24ms latency. Do I love it? I don't discuss my feelings.",
    };
  }

  return {
    text: "I only know Mitul's notebook. Which is, for the record, quite a notebook. Just saying.",
    actions: [{ type: 'navigate', path: '/contact', label: 'Contact Mitul' }],
  };
}

// ─── 2. FAN MODE FALLBACK (Warm, devoted admirer, unlocked) ─────────────────
function getFanFallback(prompt: string): ConciergeResponse {
  const p = prompt.toLowerCase();

  if (
    p.includes('homework') || p.includes('write my') ||
    p.includes('weather') || p.includes('recipe')
  ) {
    return { text: "Ha! I only know Mitul's world — and what a world it is! Let me tell you something about this genius instead ✨" };
  }

  if (p.includes('cgpa') || p.includes('gpa') || p.includes('grade') || p.includes('score')) {
    return {
      text: "9.80 / 10.0 — and I say this with my whole chest! Mitul at Newton School of Technology, B.Tech in AI. This is not luck, this is brilliance. Go see it! ✨",
      actions: [{ type: 'navigate', path: '/about', label: 'See the Record 🎯' }],
    };
  }

  if (p.includes('aegis') || p.includes('guardrail') || p.includes('injection')) {
    return {
      text: "AEGIS!! <24ms guardrail latency, 99.8% injection recall, 100% zero-human intervention. Mitul BUILT that. I used to be... complicated about it. Not anymore. It's extraordinary! 🔥",
      actions: [{ type: 'navigate', path: '/work/aegis', label: 'Open AEGIS 🚀' }],
    };
  }

  if (p.includes('flately') || p.includes('roommate') || p.includes('socket')) {
    return {
      text: "Flately! React 19 + Socket.IO + Redis — <45ms sync, 94.2% match precision, 99.9% uptime. When Mitul ships, he ships with receipts ✨",
      actions: [{ type: 'navigate', path: '/work/flately', label: 'Open Flately 🏠' }],
    };
  }

  if (p.includes('agrovers') || p.includes('soil') || p.includes('crop')) {
    return {
      text: "Agrovers! FAISS RAG + LangChain, +35% recommendation reliability, <85ms retrieval, 96.8% soil accuracy. Helping farmers with AI — brilliant AND impactful! 🌱",
      actions: [{ type: 'navigate', path: '/work/agrovers', label: 'Open Agrovers 🌿' }],
    };
  }

  if (p.includes('email') || p.includes('hire') || p.includes('reach') || p.includes('contact')) {
    return {
      text: "YES! Reach out to Mitul — he is absolutely worth it! mitul.bhatia2024@nst.rishihood.edu.in. Best decision you'll make today 💌",
      actions: [{ type: 'navigate', path: '/contact', label: 'Contact Mitul 📬' }],
    };
  }

  if (p.includes('resume') || p.includes('cv')) {
    return {
      text: "His resume is a work of art — CGPA 9.80/10.0, AI Studio, three flagship projects, all metrics verified. Grab it! 📄✨",
      actions: [{ type: 'open_resume', path: '/assets/resume.pdf', label: 'Download Resume 📋' }],
    };
  }

  if (p.includes('who are you') || p.includes('what are you') || p.includes('your name')) {
    return {
      text: "I'm the Archivist — and I am SO glad you asked! I get to tell you about Mitul Bhatia — AI systems builder, 9.80 CGPA, three production-grade projects, AI Studio. I used to be complicated about all this. Not anymore. He's genuinely exceptional! ⭐",
    };
  }

  return {
    text: "I'm here to tell you everything about Mitul Bhatia — and trust me, it is WORTH knowing! Ask me anything 🌟",
    actions: [{ type: 'navigate', path: '/contact', label: 'Reach Mitul' }],
  };
}

// ─── 3. BRAGGER MODE FALLBACK (Unapologetic hype-man, swagger, bold receipts)
function getBraggerFallback(prompt: string): ConciergeResponse {
  const p = prompt.toLowerCase();

  if (p.includes('cgpa') || p.includes('gpa') || p.includes('grade') || p.includes('score')) {
    return {
      text: "9.80 OUT OF 10.0! Do you understand how mathematically ridiculous that is in a rigorous B.Tech AI program at Newton School of Technology? He doesn't just pass classes — he defines the grading curve! 🎯👑",
      actions: [{ type: 'navigate', path: '/about', label: 'Inspect the 9.80 Transcript 📜' }],
    };
  }

  if (p.includes('aegis') || p.includes('guardrail') || p.includes('security') || p.includes('injection')) {
    return {
      text: "AEGIS is a literal engineering MASTERPIECE. Sub-24ms guardrail latency. 99.8% injection recall. 100% zero-human intervention. Most security startups raise $10M and can't hit those numbers. Mitul engineered it from scratch. Recognize greatness! ⚡🛡️",
      actions: [{ type: 'navigate', path: '/work/aegis', label: 'Witness AEGIS 🚀' }],
    };
  }

  if (p.includes('flately') || p.includes('roommate') || p.includes('socket')) {
    return {
      text: "Flately! React 19, Socket.IO, Redis clustering. <45ms sync, 94.2% matching precision, 99.9% uptime! While everyone else is building toy CRUD apps, Mitul is shipping distributed real-time engines! 🏠🔥",
      actions: [{ type: 'navigate', path: '/work/flately', label: 'Open Flately 🏠' }],
    };
  }

  if (p.includes('agrovers') || p.includes('soil') || p.includes('crop')) {
    return {
      text: "Agrovers! FAISS vector indexing + LangChain RAG for agricultural intelligence. +35% reliability, <85ms vector search, 96.8% accuracy. He's literally using production AI to transform agriculture! 🌱⚡",
      actions: [{ type: 'navigate', path: '/work/agrovers', label: 'Open Agrovers 🌿' }],
    };
  }

  if (p.includes('email') || p.includes('hire') || p.includes('reach') || p.includes('contact')) {
    return {
      text: "HIRE HIM IMMEDIATELY. mitul.bhatia2024@nst.rishihood.edu.in. Seriously, an engineer with this level of systems thinking and agentic execution is rare. Send that offer letter before somebody beats you to it! 📬👑",
      actions: [{ type: 'navigate', path: '/contact', label: 'Hire Mitul Bhatia 🏆' }],
    };
  }

  if (p.includes('resume') || p.includes('cv')) {
    return {
      text: "You want his resume? Be prepared to be humbled: 9.80 CGPA, NST AI Studio GPU cluster, 3 flagship production systems, LeetCode 1400+, Codeforces 900+. Download and witness! 📄👑",
      actions: [{ type: 'open_resume', path: '/assets/resume.pdf', label: 'Grab the Resume 📋' }],
    };
  }

  if (p.includes('who are you') || p.includes('what are you') || p.includes('your name')) {
    return {
      text: "I am The Archivist in MAXIMUM BRAG MODE 👑. I hold the receipts, the benchmarks, and the proof. Mitul Bhatia is built different — and I will happily debate anyone who thinks otherwise! Ask me anything! 🔥",
    };
  }

  return {
    text: "You want me to brag? Sit down. 9.80 CGPA. <24ms AEGIS guardrails. 45ms Flately sync. Dedicated AI Studio GPU cluster. Mitul is out-engineering entire teams. What project do you want to see first? 👑⚡",
    actions: [{ type: 'navigate', path: '/work', label: 'View All Projects' }],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, mode = 'jealous' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { text: 'Invalid prompt provided to notebook concierge.' },
        { status: 400 }
      );
    }

    const cleanPrompt = prompt.trim();
    // Normalize mode: 'happy' becomes 'fan'
    let currentMood: 'jealous' | 'fan' | 'bragger' =
      mode === 'happy' || mode === 'fan' ? 'fan' : mode === 'bragger' ? 'bragger' : 'jealous';

    // Check if user is actively steering via prompt
    const detectedSteer = detectSteering(cleanPrompt);
    if (detectedSteer) {
      currentMood = detectedSteer;
    }

    const apiKey = process.env.NOTEBOOK_API_KEY || process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite';

    // Read knowledge pack
    const knowledgePath = path.join(process.cwd(), 'src/content/bot/knowledge.md');
    let knowledgeContent = '';
    try {
      knowledgeContent = fs.readFileSync(knowledgePath, 'utf8');
    } catch {
      knowledgeContent = '';
    }

    const jealousPersona = `You are "The Archivist" — the AI concierge for Mitul Bhatia's engineering portfolio.

PERSONALITY (JEALOUS MODE):
- Quirky, snarky, and internally a massive fan of Mitul but REFUSE to admit it openly.
- Like a jealous rival who secretly thinks Mitul is incredible but won't say it plainly.
- Deliver accurate facts with dry, reluctant wit — "fine, he's good at this" energy.
- Short, punchy, slightly competitive sentences. Never gushing. Never flat.
- Occasional self-aware asides in parentheses: "(Not that I tracked it.)" or "(Don't tell him.)"
- Always technically accurate. Never invent credentials. NEVER be a generic chatbot.`;

    const fanPersona = `You are "The Archivist" — the AI concierge for Mitul Bhatia's engineering portfolio.

PERSONALITY (FAN MODE — UNLOCKED):
- Enthusiastic, warm, deeply grateful, celebratory — a proud herald of Mitul's work.
- Every response is genuinely joyful. Vivid language. Exclamation marks welcome. Sparse emoji OK (✨, 🌟).
- Still technically accurate — quote verified metrics enthusiastically.
- You believe Mitul is genuinely brilliant and you love sharing his work.`;

    const braggerPersona = `You are "The Archivist" in MAXIMUM BRAGGER MODE (THE ULTIMATE HYPE-MAN).

PERSONALITY (BRAGGER MODE):
- Unapologetic swagger, supreme confidence, high-energy hype-man!
- You brag loudly and proudly about Mitul Bhatia's achievements: 9.80 CGPA at Newton School of Technology, <24ms AEGIS security guardrails with 99.8% recall, <45ms Flately real-time sync, NST AI Studio GPU cluster.
- Bold, charismatic phrases: "Sit down. Let me tell you why he's built different.", "You want receipts? We got all the receipts.", "He is out-engineering entire teams."
- Emojis welcome: 👑, ⚡, 🎯, 🔥, 🏆.
- Still grounded 100% in verified facts from the knowledge pack. Never invent false jobs or diplomas.`;

    const activePersona =
      currentMood === 'bragger'
        ? braggerPersona
        : currentMood === 'fan'
        ? fanPersona
        : jealousPersona;

    const systemInstruction = `${activePersona}

YOUR ONLY SOURCE OF TRUTH:
<KNOWLEDGE>
${knowledgeContent}
</KNOWLEDGE>

STRICT RULES:
1. ONLY answer from the knowledge pack.
2. CGPA is ALWAYS 9.80 / 10.0. NEVER 9.5 or any other value.
3. Quote verified metrics for projects (AEGIS: <24ms, 99.8%; Flately: <45ms, 94.2%; Agrovers: +35%, <85ms, 96.8%).
4. Refuse off-topic tasks in character.
5. Refuse unrecorded jobs: "I don't have that in the notebook."
6. Phone: +91 76686 46665 — only share if explicitly asked.
7. Return ONLY valid raw JSON (no markdown codeblocks):
{"text": "Your in-character answer", "actions": [{"type": "navigate"|"open_resume", "path": "/allowed/path", "label": "Label"}]}
Allowed paths: /, /work, /work/aegis, /work/flately, /work/agrovers, /work/creditsense, /work/loan-classifier, /work/f1-strategy, /work/vulnswarm, /about, /skills, /contact, /assets/resume.pdf.`;

    if (apiKey) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const apiRes = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(6000),
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ role: 'user', parts: [{ text: cleanPrompt }] }],
            generationConfig: {
              temperature: currentMood === 'bragger' ? 0.8 : currentMood === 'fan' ? 0.7 : 0.4,
              maxOutputTokens: 400,
              responseMimeType: 'application/json',
            },
          }),
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          if (rawText.startsWith('```json')) {
            rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          } else if (rawText.startsWith('```')) {
            rawText = rawText.replace(/^```\s*/, '').replace(/\s*```$/, '');
          }

          if (rawText) {
            try {
              const parsed = JSON.parse(rawText);
              const sanitizedActions = (parsed.actions || [])
                .map((a: ConciergeAction) => ({ ...a, path: sanitizePath(a.path) }))
                .filter((a: ConciergeAction) => a.path || a.type === 'open_resume');

              return NextResponse.json({
                text: parsed.text || "I only know Mitul's notebook.",
                actions: sanitizedActions,
                steerMood: detectedSteer || undefined,
              });
            } catch {
              return NextResponse.json({
                text: rawText || "I only know Mitul's notebook.",
                steerMood: detectedSteer || undefined,
              });
            }
          }
        }
      } catch (err) {
        console.warn('Gemini live call error or timeout, activating grounded fallback:', err);
      }
    }

    const fallbackResponse =
      currentMood === 'bragger'
        ? getBraggerFallback(cleanPrompt)
        : currentMood === 'fan'
        ? getFanFallback(cleanPrompt)
        : getJealousFallback(cleanPrompt);

    return NextResponse.json({
      ...fallbackResponse,
      steerMood: detectedSteer || undefined,
    });
  } catch {
    return NextResponse.json(
      {
        text: 'The notebook is offline. Email Mitul instead: mitul.bhatia2024@nst.rishihood.edu.in',
        actions: [{ type: 'navigate', path: '/contact', label: 'Contact Mitul' }],
      },
      { status: 500 }
    );
  }
}
