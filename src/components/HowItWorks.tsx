import { UserSearch, CalendarCheck, Sprout } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  {
    icon: UserSearch,
    title: 'Choose a Therapist',
    copy: 'Browse our team and find someone whose approach feels right. No preference is fine too.',
  },
  {
    icon: CalendarCheck,
    title: 'Book a Session',
    copy: 'Pick a time that suits you, online or in person at our Kilimani practice.',
  },
  {
    icon: Sprout,
    title: 'Begin Your Journey',
    copy: 'Turn up exactly as you are. There is nothing you need to prepare in advance.',
  },
];

export default function HowItWorks() {
  return (
    <section className="nw-section nw-shell" aria-labelledby="nw-how-title">
      <div className="nw-section-head nw-section-head--center">
        <p className="nw-eyebrow">How it works</p>
        <h2 id="nw-how-title">Three gentle steps</h2>
        <p className="nw-lead" style={{ textAlign: 'center' }}>
          There is no intake form to fill in advance and nothing you need to work out
          before you arrive.
        </p>
      </div>

      <div className="nw-steps">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 140}>
            <div className="nw-step">
              <span className="nw-step__icon">
                <s.icon size={26} aria-hidden="true" />
              </span>
              <p className="nw-step__num">Step {i + 1}</p>
              <h3 style={{ fontSize: 'var(--nw-fs-h4)' }}>{s.title}</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)' }}>
                {s.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
