import type { Metadata } from 'next';
import Link from 'next/link';
import LegalNav from '@/components/LegalNav';
import { site } from '@/data/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Therapy disclaimer, booking and cancellation policy, and governing law for Naaman Wellness, Nairobi, Kenya.',
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Legal</span>
            <span aria-hidden="true">/</span>
            <span>Terms of Use</span>
          </nav>
          <h1>Terms of Use</h1>
        </div>
      </section>

      <section className="nw-section nw-shell">
        <LegalNav />

        <p className="nw-updated">Last updated: 11 October 2026</p>

        <div className="nw-prose">
          <div className="nw-notice" style={{ marginBottom: '2rem' }}>
            <span aria-hidden="true">•</span>
            <span>
              <strong>Please read this first.</strong> Naaman Wellness is not a crisis
              service. If you are in crisis or need immediate help, call {site.crisis.name}{' '}
              on {site.crisis.number} — free, 24 hours.
            </span>
          </div>

          <h2>1. Therapy disclaimer</h2>
          <p>
            Naaman Wellness provides talking therapy and counselling. By using this website
            or booking a session, you acknowledge and agree to the following.
          </p>
          <ul>
            <li>
              <strong>We are not a crisis or emergency service.</strong> We do not offer
              emergency psychiatric care, crisis intervention, or an on-call service outside
              booked appointment times. In an emergency, contact Befrienders Kenya on{' '}
              {site.crisis.number}, or go to your nearest hospital accident and emergency
              department.
            </li>
            <li>
              <strong>We are not a substitute for medical care.</strong> Our therapists are
              not medical doctors and do not prescribe medication. Where medication may be
              helpful, we will suggest you speak with a psychiatrist or your GP, and we can
              work alongside them.
            </li>
            <li>
              <strong>Therapy does not guarantee a particular outcome.</strong> Many people
              find it considerably helpful; some find it hard; some find it is not for them.
              We will be honest with you about how it is going and will say so if we think a
              different approach would serve you better.
            </li>
            <li>
              <strong>Website content is general information.</strong> Our self-care
              resources are not personal medical advice and reading them does not create a
              therapeutic relationship.
            </li>
            <li>
              <strong>The wellness check-in is not a clinical assessment.</strong> It is a
              reflection aid. It produces no diagnosis and no score.
            </li>
          </ul>

          <h3>Confidentiality</h3>
          <p>
            Sessions are confidential, with the narrow exceptions set out in our{' '}
            <Link href="/legal/privacy-policy">Privacy Policy</Link>. Your therapist will
            explain those limits to you in your first session.
          </p>

          <h2>2. Booking</h2>
          <ul>
            <li>
              A booking is confirmed when you complete the booking form and receive a
              confirmation email containing a reference number.
            </li>
            <li>
              If you do not receive a confirmation within a few minutes, please check your
              spam folder and then contact us — it may be that the booking did not complete.
            </li>
            <li>
              Sessions are 50 minutes unless otherwise stated. Couples and family sessions
              are 75 minutes, and groups are 90 minutes.
            </li>
            <li>
              If you select &ldquo;no preference&rdquo; for a therapist, we will allocate
              the first suitable therapist with availability and tell you who it is.
            </li>
            <li>
              For online sessions you are responsible for finding a private space where you
              will not be overheard. We will send your link shortly before the session.
            </li>
          </ul>

          <h2>3. Cancellation and rescheduling policy</h2>
          <p>
            We understand that life happens, and we would rather be flexible than punitive.
            At the same time, a late cancellation is time another client could have used.
          </p>
          <ul>
            <li>
              <strong>More than 24 hours&apos; notice:</strong> no charge, and we will
              happily reschedule.
            </li>
            <li>
              <strong>Less than 24 hours&apos; notice:</strong> 50% of the session fee may
              be charged.
            </li>
            <li>
              <strong>Non-attendance without notice:</strong> the full session fee may be
              charged.
            </li>
            <li>
              <strong>If we cancel:</strong> your session is rescheduled at no cost, and we
              will offer you a priority slot.
            </li>
          </ul>
          <p>
            We will always consider genuine emergencies and circumstances beyond your
            control. If something serious has happened, please tell us — we are reasonable
            people and a conversation is always better than an invoice.
          </p>
          <p>
            To cancel or change a session, reply to your confirmation email, message us on
            WhatsApp, or call us.
          </p>

          <h2>4. Fees and payment</h2>
          <p>
            Current fees are provided before you confirm your booking and are also available
            on request. Payment is due before or at the time of the session unless a
            corporate arrangement is in place.
          </p>

          <h2>5. Late arrival</h2>
          <p>
            If you arrive late, the session will still end at the scheduled time so that we
            do not keep the next client waiting. If we are running late, you will still
            receive your full session length.
          </p>

          <h2>6. Children and young people</h2>
          <p>
            Clients aged 16 and 17 may consent to their own therapy where they are
            assessed as having sufficient understanding. We will explain the limits of
            confidentiality to them directly, at the start, in language they can follow.
            Parents and guardians are supported separately where that is helpful.
          </p>

          <h2>7. Website use</h2>
          <ul>
            <li>
              You may browse, read and print our resources for your own personal,
              non-commercial use.
            </li>
            <li>
              You may not copy, republish or sell our articles without written permission.
            </li>
            <li>
              You may not attempt to interfere with the operation or security of this
              website.
            </li>
            <li>
              We do our utmost to keep the site available, but we do not guarantee
              uninterrupted access.
            </li>
          </ul>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by Kenyan law, Naaman Wellness is not liable for
            any indirect or consequential loss arising from your use of this website or its
            content. Nothing in these terms limits our liability for death or personal
            injury caused by negligence, or for fraud.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the
            Republic of Kenya. The courts of Kenya have exclusive jurisdiction over any
            dispute arising out of or in connection with these terms or the services
            provided by Naaman Wellness.
          </p>
          <p>
            Nothing in these terms affects your rights as a consumer under Kenyan law, or
            your rights under the Kenya Data Protection Act 2019.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these terms are welcome:
            <br />
            Email: <a href={`mailto:${site.clinicEmail}`}>{site.clinicEmail}</a>
            <br />
            Phone: <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
            <br />
            {site.address.street}, {site.address.area}, {site.address.city}
          </p>
        </div>
      </section>
    </>
  );
}
