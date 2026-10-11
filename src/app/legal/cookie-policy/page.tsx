import type { Metadata } from 'next';
import Link from 'next/link';
import LegalNav from '@/components/LegalNav';
import CookiePolicyManager from '@/components/CookiePolicyManager';
import { site } from '@/data/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'A full breakdown of the cookies Naaman Wellness uses, by category, and how to change your preferences at any time.',
  robots: { index: true, follow: true },
};

const CATEGORIES = [
  {
    name: 'Necessary',
    status: 'Always on — cannot be switched off',
    body: 'These cookies are required for the site to function. They remember your cookie choice, keep forms protected against automated abuse, and maintain basic security. Without them, booking would not work.',
    cookies: [
      { name: 'nw:cookie-consent', purpose: 'Stores your cookie preferences', duration: '1 year' },
      { name: '__Host-nw-session', purpose: 'Security and form protection', duration: 'Session' },
    ],
  },
  {
    name: 'Functional',
    status: 'Off until you enable it',
    body: 'These remember choices that make the site easier to use, such as whether you have already seen the intro animation. They never identify you and are never linked to a therapy enquiry.',
    cookies: [
      { name: 'nw:intro', purpose: 'Remembers the preloader has been shown this visit', duration: 'Session' },
      { name: 'nw:lang', purpose: 'Remembers your preferred language', duration: '1 year' },
    ],
  },
  {
    name: 'Analytics',
    status: 'Off until you enable it',
    body: 'Anonymous, aggregated statistics that tell us which pages and resources people find useful, so we can improve them. These are never linked to your booking, your enquiry, or any clinical record.',
    cookies: [
      { name: '_nw_pageview', purpose: 'Counts page views, anonymously', duration: '30 days' },
      { name: '_nw_referrer', purpose: 'Records how visitors found the site, anonymously', duration: '30 days' },
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Legal</span>
            <span aria-hidden="true">/</span>
            <span>Cookie Policy</span>
          </nav>
          <h1>Cookie Policy</h1>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <LegalNav />

        <p className="nw-updated">Last updated: 11 October 2026</p>

        <div className="nw-prose">
          <p>
            This policy explains what cookies are, which ones this site uses, and how to
            change your mind at any point. It is written in plain language because you
            should not need to be a technologist to understand what is being stored on your
            device.
          </p>

          <h2>What a cookie is</h2>
          <p>
            A cookie is a small text file that a website stores in your browser. It lets the
            site remember things between pages and between visits. Cookies cannot read other
            files on your device and cannot install anything.
          </p>

          <h2>Our approach</h2>
          <p>
            We use as few cookies as we can. Only <strong>necessary</strong> cookies are set
            before you make a choice. Functional and analytics cookies are{' '}
            <strong>switched off until you switch them on</strong> — which is what the Kenya
            Data Protection Act 2019 requires, and what we would want ourselves.
          </p>
          <p>
            We do not use advertising or cross-site tracking cookies, we do not sell data,
            and we never link any cookie to your therapy enquiry or clinical record.
          </p>

          {/* Change preferences at any time */}
          <CookiePolicyManager />
        </div>

        <h2 style={{ marginTop: '3rem', marginBottom: '1rem' }}>
          Full breakdown by category
        </h2>

        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '78ch' }}>
          {CATEGORIES.map((cat) => (
            <section
              key={cat.name}
              style={{
                border: '1px solid var(--nw-border-soft)',
                borderRadius: 'var(--nw-radius)',
                padding: '1.5rem',
                background: 'var(--nw-surface)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem',
                }}
              >
                <h3 style={{ fontSize: 'var(--nw-fs-h4)', margin: 0 }}>{cat.name}</h3>
                <span className="nw-meta">{cat.status}</span>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--nw-text-soft)', marginBottom: '1rem' }}>
                {cat.body}
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 'var(--nw-fs-meta)',
                    textAlign: 'left',
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ padding: '0.5rem 0.75rem 0.5rem 0', color: 'var(--nw-text-muted)', fontWeight: 600 }}>
                        Cookie
                      </th>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--nw-text-muted)', fontWeight: 600 }}>
                        Purpose
                      </th>
                      <th style={{ padding: '0.5rem 0 0.5rem 0.75rem', color: 'var(--nw-text-muted)', fontWeight: 600 }}>
                        Retention
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.cookies.map((c) => (
                      <tr key={c.name} style={{ borderTop: '1px solid var(--nw-border-soft)' }}>
                        <td style={{ padding: '0.6rem 0.75rem 0.6rem 0', fontFamily: 'monospace' }}>
                          {c.name}
                        </td>
                        <td style={{ padding: '0.6rem 0.75rem', color: 'var(--nw-text-soft)' }}>
                          {c.purpose}
                        </td>
                        <td style={{ padding: '0.6rem 0 0.6rem 0.75rem', color: 'var(--nw-text-muted)' }}>
                          {c.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        <div className="nw-prose" style={{ marginTop: '3rem' }}>
          <h2>Managing cookies in your browser</h2>
          <p>
            Independently of our settings, every major browser lets you block or delete
            cookies. You will usually find these controls under Settings, then Privacy or
            Site Data. Blocking all cookies will affect the booking form, which relies on a
            necessary cookie for security.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we add or remove a category of cookie, we will update this page and ask for
            your consent again where the change is material.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about cookies or your data are welcome — email{' '}
            <a href={`mailto:${site.clinicEmail}`}>{site.clinicEmail}</a> or call{' '}
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>.
          </p>
          <p>
            See also our <Link href="/legal/privacy-policy">Privacy Policy</Link> and{' '}
            <Link href="/legal/terms">Terms of Use</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
