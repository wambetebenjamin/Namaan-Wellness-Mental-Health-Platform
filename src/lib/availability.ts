import { therapists, getTherapist } from '@/data/therapists';
import { kvGet, keys } from './kv';

/**
 * Availability model.
 *
 * Slots are generated from each therapist's published working days and a
 * standard set of session times. Booked slots are removed using the KV record
 * written by /api/booking. When KV is not configured nothing is filtered, so
 * local development shows the full set.
 */

export const SLOT_TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const HORIZON_DAYS = 30;

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Sunday = 0 … Saturday = 6 */
function weekdayOf(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

function baseSlotsFor(therapistSlug: string, iso: string): string[] {
  const therapist = getTherapist(therapistSlug);
  if (!therapist) return [];
  if (!therapist.availableDays.includes(weekdayOf(iso))) return [];

  // Deterministic thinning so availability looks natural rather than uniform.
  const seed = [...therapistSlug, ...iso].reduce((a, c) => a + c.charCodeAt(0), 0);
  return SLOT_TIMES.filter((_, i) => (seed + i * 7) % 5 !== 0);
}

/**
 * Slots still free for a therapist on a date.
 * A therapist of null/undefined means "no preference" — the union of every
 * therapist's availability.
 */
export async function getSlots(therapistSlug: string | null, iso: string): Promise<string[]> {
  const slugs = therapistSlug
    ? [therapistSlug]
    : therapists.filter((t) => t.availableDays.includes(weekdayOf(iso))).map((t) => t.slug);

  const taken = new Set<string>();

  await Promise.all(
    slugs.map(async (slug) => {
      for (const time of SLOT_TIMES) {
        const booked = await kvGet<unknown>(keys.slotLock(slug, iso, time));
        if (booked) {
          taken.add(therapistSlug ? time : `${slug}|${time}`);
        }
      }
    })
  );

  const all = new Set<string>();
  for (const slug of slugs) {
    for (const time of baseSlotsFor(slug, iso)) {
      const key = therapistSlug ? time : `${slug}|${time}`;
      if (!taken.has(key)) all.add(time);
    }
  }

  return SLOT_TIMES.filter((t) => all.has(t));
}

/** Upcoming days with a count of free slots each. */
export async function getUpcomingDays(
  therapistSlug: string | null
): Promise<{ date: string; count: number }[]> {
  const today = new Date();
  const out: { date: string; count: number }[] = [];

  for (let i = 1; i <= HORIZON_DAYS; i += 1) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = isoDay(d);
    const slots = await getSlots(therapistSlug, iso);
    out.push({ date: iso, count: slots.length });
  }

  return out;
}

export function isValidIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}
