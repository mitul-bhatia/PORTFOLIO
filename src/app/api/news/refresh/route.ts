import { NextRequest, NextResponse } from 'next/server';
import { refreshNewsEdition } from '@/lib/news/edition';

export const dynamic = 'force-dynamic';

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.NEWS_REFRESH_SECRET || process.env.CRON_SECRET;
  if (!expected) return false;
  return request.headers.get('authorization') === `Bearer ${expected}`;
}

export async function GET(request: NextRequest) {
  if (!process.env.NEWS_REFRESH_SECRET && !process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'News refresh is not configured.' }, { status: 503 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const edition = await refreshNewsEdition();
  return NextResponse.json(edition);
}
