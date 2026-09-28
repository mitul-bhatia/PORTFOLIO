import { NextRequest, NextResponse } from 'next/server';
import { askNotebook } from '@/lib/notebook';
import { generateWithGemini } from '@/lib/notebookModel';
import { getNewsEdition } from '@/lib/news/edition';
import type { NotebookLane, NotebookReply } from '@/lib/petTypes';
import { moodForRoute } from '@/lib/moods';

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

const LANES: NotebookLane[] = ['record', 'edition', 'general'];

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { prompt?: unknown; route?: unknown; lane?: unknown }
    | null;
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
  const route =
    typeof body?.route === 'string' && body.route.startsWith('/') ? body.route.slice(0, 200) : '/';
  const lane = LANES.find((value) => value === body?.lane);

  if (isRateLimited(request)) {
    const slowDown: NotebookReply = {
      lane: 'general',
      text: 'Whoa, too many questions at once. Give me a minute to catch my breath.',
      citations: [],
      actions: [],
      degraded: true,
      mood: 'guarded',
      reaction: 'sulk',
    };
    return NextResponse.json(slowDown, { status: 429, headers: { 'Retry-After': '60' } });
  }

  if (!prompt) return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  if (prompt.length > 500) return NextResponse.json({ error: 'Prompt exceeds 500 characters' }, { status: 400 });

  try {
    const reply = await askNotebook(
      { prompt, route, lane },
      { generate: generateWithGemini, getEdition: getNewsEdition },
    );
    return NextResponse.json(reply);
  } catch {
    const failure: NotebookReply = {
      lane: 'general',
      text: 'Something went wrong on my side. His work and résumé are still right here.',
      citations: [],
      actions: [
        { type: 'navigate', path: '/work', label: 'Browse work', target: 'lead-case-studies' },
        { type: 'open_resume', label: 'Open résumé' },
      ],
      degraded: true,
      mood: moodForRoute(route),
    };
    return NextResponse.json(failure, { status: 500 });
  }
}
