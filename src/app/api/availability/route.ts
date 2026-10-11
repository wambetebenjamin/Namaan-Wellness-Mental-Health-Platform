import { NextResponse } from 'next/server';
import { getSlots, getUpcomingDays, isValidIsoDate } from '@/lib/availability';
import { getTherapist } from '@/data/therapists';

/**
 * GET /api/availability
 *   ?therapist=<slug>&date=YYYY-MM-DD  -> { date, therapist, slots: string[] }
 *   ?therapist=<slug>                  -> { therapist, days: [{date, count}] }
 *
 * Returns counts and times only. No client data is ever exposed.
 */
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const therapistParam = searchParams.get('therapist');
  const date = searchParams.get('date');

  const therapist =
    therapistParam && getTherapist(therapistParam) ? therapistParam : null;

  if (date) {
    if (!isValidIsoDate(date)) {
      return NextResponse.json({ error: 'Invalid date format.' }, { status: 400 });
    }
    const slots = await getSlots(therapist, date);
    return NextResponse.json(
      { date, therapist, slots },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const days = await getUpcomingDays(therapist);
  return NextResponse.json(
    { therapist, days },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
