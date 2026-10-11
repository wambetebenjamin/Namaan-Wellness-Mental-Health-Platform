'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ChevronLeft, Info, RotateCcw } from 'lucide-react';

/**
 * Mental wellness check-in.
 * 8 questions on a 1–5 scale. No clinical score is ever shown to the user.
 * Nothing is stored and nothing leaves the browser — this is client-side only.
 */

const QUESTIONS = [
  { id: 'sleep', text: 'How has your sleep been lately?', low: 'Broken', high: 'Restful' },
  { id: 'mood', text: 'How would you describe your mood over the past two weeks?', low: 'Heavy', high: 'Light' },
  { id: 'stress', text: 'How much pressure are you under at the moment?', low: 'Unmanageable', high: 'Very manageable' },
  { id: 'energy', text: 'How is your energy day to day?', low: 'Depleted', high: 'Steady' },
  { id: 'connection', text: 'How connected do you feel to the people around you?', low: 'Very alone', high: 'Well supported' },
  { id: 'appetite', text: 'How has your relationship with food and eating been?', low: 'Difficult', high: 'Comfortable' },
  { id: 'focus', text: 'How well are you able to concentrate on things?', low: 'Scattered', high: 'Clear' },
  { id: 'hope', text: 'When you think about the weeks ahead, how do you feel?', low: 'Dread', high: 'Hopeful' },
];

const SCALE = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

type Answers = Record<string, number>;

/** Warm, non-clinical reflections. The score is never shown. */
function reflection(answers: Answers) {
  const values = Object.values(answers);
  const total = values.reduce((a, b) => a + b, 0);
  const avg = total / values.length;
  const lowest = Object.entries(answers).sort((a, b) => a[1] - b[1])[0]?.[0];

  // Recommendations keyed to the area the person scored lowest.
  const recommendations: Record<string, { slug: string; name: string; why: string }> = {
    sleep: {
      slug: 'individual-therapy',
      name: 'Individual Therapy',
      why: 'Sleep is often the first thing to suffer and one of the first to improve once there is somewhere to put what you are carrying.',
    },
    mood: {
      slug: 'individual-therapy',
      name: 'Individual Therapy',
      why: 'A steady hour with someone who is not going to be alarmed by how you are feeling can change the texture of a week.',
    },
    stress: {
      slug: 'workplace-burnout-recovery',
      name: 'Workplace Burnout Recovery',
      why: 'When pressure stops letting up, it is worth understanding what is actually draining you rather than simply trying to endure it.',
    },
    energy: {
      slug: 'workplace-burnout-recovery',
      name: 'Workplace Burnout Recovery',
      why: 'Deep tiredness that rest does not touch usually has a specific cause. It is worth finding it.',
    },
    connection: {
      slug: 'group-therapy',
      name: 'Group Therapy',
      why: 'Feeling alone is extraordinarily common and group work addresses it more directly than almost anything else.',
    },
    appetite: {
      slug: 'individual-therapy',
      name: 'Individual Therapy',
      why: 'Changes in appetite are often the body speaking about something the mind has not named yet.',
    },
    focus: {
      slug: 'individual-therapy',
      name: 'Individual Therapy',
      why: 'A scattered mind is usually a busy one. Working out what it is busy with tends to bring the clarity back.',
    },
    hope: {
      slug: 'grief-and-loss-support',
      name: 'Grief and Loss Support',
      why: 'Dread about the future often sits alongside a loss — of a person, a relationship, or a version of your life.',
    },
  };

  const rec = recommendations[lowest ?? 'mood'] ?? recommendations.mood;

  if (avg >= 3.6) {
    return {
      headline: 'It sounds like you are holding up reasonably well.',
      body:
        'That is genuinely good to hear. If you would still like to talk something through, or you simply want a space that is yours, we are here — you do not need to be in difficulty to come.',
      rec,
    };
  }

  if (avg >= 2.6) {
    return {
      headline: 'It sounds like things have been a bit heavy lately.',
      body:
        'Not unmanageable, perhaps, but heavier than they need to be — and heavy for long enough that you have noticed. That noticing matters. Talking to someone can take the weight down considerably, and it does not have to be a crisis to be worth doing.',
      rec,
    };
  }

  return {
    headline:
      'It sounds like things have been heavy lately. Reaching out is a brave step.',
    body:
      'You have just spent a few minutes being honest with yourself about how things are, and that is not an easy thing to do. Whatever you are carrying, you do not have to keep carrying it on your own. There is someone here who will sit with you in it.',
    rec,
  };
}

export default function CheckInTool() {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const current = QUESTIONS[index];
  const answered = Object.keys(answers).length;
  const progress = (answered / QUESTIONS.length) * 100;

  function choose(value: number) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);

    if (index < QUESTIONS.length - 1) {
      window.setTimeout(() => setIndex((i) => i + 1), 220);
    } else {
      window.setTimeout(() => setComplete(true), 260);
    }
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setComplete(false);
  }

  if (complete) {
    const r = reflection(answers);
    return (
      <div className="nw-reflection" role="status">
        <p className="nw-eyebrow">Your reflection</p>
        <p className="nw-reflection__quote">{r.headline}</p>
        <p style={{ color: 'var(--nw-text-soft)', maxWidth: '54ch' }}>{r.body}</p>

        <div
          style={{
            display: 'grid',
            gap: '0.75rem',
            textAlign: 'left',
            background: 'var(--nw-surface)',
            border: '1px solid var(--nw-sage-100)',
            borderRadius: 'var(--nw-radius)',
            padding: '1.25rem 1.35rem',
            marginTop: '0.5rem',
          }}
        >
          <p className="nw-eyebrow">How we can help</p>
          <h3 style={{ fontSize: 'var(--nw-fs-h4)' }}>{r.rec.name}</h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
            {r.rec.why}
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
            <Link href="/book" className="nw-btn nw-btn--primary">
              Book a Session
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href={`/services/${r.rec.slug}`} className="nw-btn nw-btn--ghost">
              About this service
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="button" className="nw-btn nw-btn--ghost" onClick={restart}>
            <RotateCcw size={15} aria-hidden="true" />
            Start again
          </button>
        </div>

        <div className="nw-notice" style={{ textAlign: 'left', marginTop: '0.5rem' }}>
          <Info size={16} aria-hidden="true" />
          <span>
            This is not a clinical assessment and it is not a diagnosis. Your answers were
            not saved, stored or sent anywhere — the whole check-in happened in your
            browser, and closing this page removes them completely.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="nw-checkin">
      <div className="nw-panel">
        <div className="nw-progress" aria-hidden="true">
          <div className="nw-progress__bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="nw-meta">
          Question {index + 1} of {QUESTIONS.length}
        </p>

        <h2 style={{ fontSize: 'var(--nw-fs-h3)', marginTop: '0.35rem' }}>
          {current.text}
        </h2>

        <div
          className="nw-scale"
          role="group"
          aria-label={current.text}
          style={{ marginTop: '0.75rem' }}
        >
          {SCALE.map((s, i) => (
            <button
              key={s.value}
              type="button"
              className="nw-scale__btn"
              aria-pressed={answers[current.id] === s.value}
              onClick={() => choose(s.value)}
            >
              {s.label}
              <small>{i === 0 ? current.low : i === SCALE.length - 1 ? current.high : ''}</small>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <p className="nw-hint" style={{ maxWidth: '38ch' }}>
            1 means {current.low.toLowerCase()}, 5 means {current.high.toLowerCase()}.
            Go with your first instinct.
          </p>
          {index > 0 && (
            <button
              type="button"
              className="nw-btn nw-btn--ghost"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Previous
            </button>
          )}
        </div>
      </div>

      <div className="nw-notice" style={{ marginTop: '1.25rem' }}>
        <Info size={16} aria-hidden="true" />
        <span>
          This is not a clinical assessment. Nothing you select is stored or sent
          anywhere — it all stays in your browser.
        </span>
      </div>
    </div>
  );
}
