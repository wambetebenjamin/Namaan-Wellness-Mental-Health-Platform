import type { Metadata } from 'next';
import Link from 'next/link';
import LegalNav from '@/components/LegalNav';
import { site } from '@/data/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Naaman Wellness handles your personal and mental health data under the Kenya Data Protection Act 2019.',
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Legal</span>
            <span aria-hidden="true">/</span>
            <span>Privacy Policy</span>
          </nav>
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <LegalNav />

        <p className="nw-updated">
          Last updated: 11 October 2026 · Naaman Wellness, Nairobi, Kenya
        </p>

        <div className="nw-prose">
          <p>
            This policy explains what information Naaman Wellness collects, why we collect
            it, how long we keep it, and what rights you have. It is written to be read —
            if anything here is unclear, please ask us and we will explain it in plain
            language.
          </p>
          <p>
            We are a data controller under the <strong>Kenya Data Protection Act 2019</strong>. Because
            some of the information we hold is health information, we treat all of it as
            special category data and apply the highest standard of care to every record.
          </p>

          <h2>1. Mental health data and confidentiality</h2>
          <p>
            We understand that the decision to contact a therapy practice is a significant
            one, and that confidentiality is not a formality — it is the foundation of the
            work.
          </p>
          <ul>
            <li>
              What you say in a session is confidential. It is not shared with your
              employer, your family, your school, your university or your insurer.
            </li>
            <li>
              For <strong>corporate programme</strong> clients, we never tell an employer
              who attended a session, how many times, or anything discussed. Reporting is
              aggregate only.
            </li>
            <li>
              Your therapist discusses their work in <strong>clinical supervision</strong>,
              which is a professional requirement. In supervision, clients are referred to
              by first name or pseudonym, with identifying details removed.
            </li>
          </ul>

          <h3>The narrow limits of confidentiality</h3>
          <p>
            We will explain these to you in your first session, because you should know
            them before you begin. A therapist may break confidentiality only where:
          </p>
          <ul>
            <li>
              there is a serious and imminent risk to your life or to someone else&apos;s
              safety;
            </li>
            <li>
              we are required to do so by a court order or other legal obligation under
              Kenyan law;
            </li>
            <li>
              there is a disclosure of harm to a child or a vulnerable adult, which we are
              obliged to act on.
            </li>
          </ul>
          <p>
            Even then, wherever it is safe and practical to do so, we will tell you first
            and involve you in the decision. We will share the minimum information
            necessary.
          </p>

          <h2>2. Session data</h2>
          <p>
            When you book a session we collect only what we need to deliver it:
          </p>
          <ul>
            <li>Your name, email address and phone number</li>
            <li>Your preferred therapist, session format, language and session type</li>
            <li>The date and time of your appointment</li>
            <li>
              Anything you choose to write in the &ldquo;anything you would like your
              therapist to know&rdquo; field — which is <strong>entirely optional</strong>
            </li>
          </ul>
          <p>
            After a session, your therapist keeps a brief clinical record. These notes are
            the property of the practice, are stored securely, and are used only to provide
            you with continuity of care.
          </p>
          <p>
            <strong>How long we keep it:</strong> appointment records are kept for seven
            years, which is the professional standard for clinical records. Marketing
            enquiries that do not become appointments are deleted after twelve months.
          </p>

          <h2>3. Website analytics</h2>
          <p>
            We use privacy-respecting analytics to understand which pages visitors find
            useful. Analytics cookies are <strong>switched off by default</strong> and are
            only set if you explicitly enable them in our cookie preferences, as required
            by the Kenya Data Protection Act 2019.
          </p>
          <p>
            Analytics data is aggregated and anonymous. It is never linked to your therapy
            enquiry, your booking, or any clinical record. We do not use advertising
            trackers, we do not sell data, and we do not share it with third parties for
            their own marketing.
          </p>

          <h2>4. Your rights</h2>
          <p>
            Under the Kenya Data Protection Act 2019 you have the following rights, and we
            will act on any of them promptly:
          </p>
          <ul>
            <li>
              <strong>The right to be informed</strong> — to know what we hold and why,
              which is what this policy sets out.
            </li>
            <li>
              <strong>The right of access</strong> — to request a copy of the personal data
              we hold about you.
            </li>
            <li>
              <strong>The right to rectification</strong> — to have inaccurate information
              corrected.
            </li>
            <li>
              <strong>The right to erasure</strong> — to ask us to delete your data, subject
              to our professional obligation to retain clinical records for seven years.
            </li>
            <li>
              <strong>The right to restrict processing</strong> — to ask us to pause how we
              use your data while a concern is resolved.
            </li>
            <li>
              <strong>The right to object</strong> — including to any processing based on
              legitimate interests.
            </li>
            <li>
              <strong>The right to withdraw consent</strong> — at any time, including
              consent to cookies or to our newsletter.
            </li>
            <li>
              <strong>The right to lodge a complaint</strong> with the Office of the Data
              Protection Commissioner.
            </li>
          </ul>
          <p>
            To exercise any of these rights, email{' '}
            <a href={`mailto:${site.clinicEmail}`}>{site.clinicEmail}</a>. We respond within
            thirty days, and usually much sooner.
          </p>

          <h2>5. Therapist data handling</h2>
          <p>
            Every member of our clinical team is bound by a professional duty of
            confidentiality and by this policy. Specifically:
          </p>
          <ul>
            <li>Clinical records are stored in an access-controlled system.</li>
            <li>
              Only your therapist and, where clinically necessary, the clinical lead can
              access your file.
            </li>
            <li>
              Therapists discuss cases in supervision using pseudonyms and with identifying
              details removed.
            </li>
            <li>
              All therapists receive annual training on data protection and confidentiality.
            </li>
            <li>
              Where a therapist leaves the practice, their records transfer to the clinical
              lead and remain subject to the same protections.
            </li>
          </ul>

          <h2>6. Security</h2>
          <p>
            Our website is served over HTTPS with HSTS enabled. Form submissions are
            protected by reCAPTCHA and validated server-side. Booking and enquiry records
            are stored in an encrypted, access-controlled database hosted on Vercel&apos;s
            infrastructure.
          </p>
          <p>
            No public API route on this website returns client data. Our availability
            endpoint returns only times and counts.
          </p>

          <h2>7. Contact</h2>
          <p>
            For anything to do with your data, please contact us:
            <br />
            Email: <a href={`mailto:${site.clinicEmail}`}>{site.clinicEmail}</a>
            <br />
            Phone: <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
            <br />
            Address: {site.address.street}, {site.address.area}, {site.address.city},{' '}
            {site.address.country}
          </p>
          <p>
            If you are not satisfied with our response, you may complain to the Office of
            the Data Protection Commissioner in Kenya.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            If we change this policy in a way that materially affects how we handle your
            data, we will update this page and, where appropriate, contact you directly. We
            will never reduce the level of protection described here without telling you.
          </p>
        </div>
      </section>
    </>
  );
}
