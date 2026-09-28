import { NextResponse } from 'next/server';
import { getNewsEdition } from '@/lib/news/edition';

export const revalidate = 21600;

export async function GET() {
  const edition = await getNewsEdition();
  return NextResponse.json(edition);
}
