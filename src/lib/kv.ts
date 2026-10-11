/**
 * Vercel KV access.
 *
 * Every function degrades gracefully when KV is not configured (for example
 * during local development), so the site never hard-fails on a missing
 * binding. Booking, availability and subscriber records are the only things
 * stored, and no client data is ever returned by a public API route.
 */

import { kv } from '@vercel/kv';
import { randomUUID } from 'node:crypto';

export type KvResult<T> = { ok: true; value: T } | { ok: false; error: string };

function available(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export function kvEnabled(): boolean {
  return available();
}

export async function kvGet<T>(key: string): Promise<T | null> {
  if (!available()) return null;
  try {
    return (await kv.get<T>(key)) ?? null;
  } catch {
    return null;
  }
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  if (!available()) return;
  try {
    await kv.set(key, value);
  } catch {
    /* storage failures must never break a submission response */
  }
}

export async function kvLpush(key: string, value: unknown): Promise<void> {
  if (!available()) return;
  try {
    await kv.lpush(key, value);
  } catch {
    /* ignore */
  }
}

export async function kvSadd(key: string, member: string): Promise<void> {
  if (!available()) return;
  try {
    await kv.sadd(key, member);
  } catch {
    /* ignore */
  }
}

export async function kvLrange<T>(key: string, start = 0, end = -1): Promise<T[]> {
  if (!available()) return [];
  try {
    return (await kv.lrange<T>(key, start, end)) ?? [];
  } catch {
    return [];
  }
}

export async function kvHset(key: string, data: Record<string, unknown>): Promise<void> {
  if (!available()) return;
  try {
    await kv.hset(key, data);
  } catch {
    /* ignore */
  }
}

export function newId(prefix: string): string {
  return `${prefix}_${randomUUID()}`;
}

/* ------------------------------------------------------------------ */
/* Key naming                                                          */
/* ------------------------------------------------------------------ */

export const keys = {
  booking: (id: string) => `booking:${id}`,
  bookingIndex: 'bookings:index',
  bookingByDay: (isoDay: string) => `bookings:day:${isoDay}`,
  slotLock: (therapist: string, date: string, time: string) =>
    `slot:${therapist}:${date}:${time}`,
  availability: (therapist: string, isoDay: string) =>
    `availability:${therapist}:${isoDay}`,
  corporate: (id: string) => `corporate:${id}`,
  corporateIndex: 'corporate:index',
  subscriber: (email: string) => `subscriber:${email.toLowerCase()}`,
  subscriberIndex: 'subscribers:index',
  contact: (id: string) => `contact:${id}`,
  contactIndex: 'contact:index',
} as const;
