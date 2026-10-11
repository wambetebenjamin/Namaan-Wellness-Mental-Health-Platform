import Link from 'next/link';
import { Instagram, Facebook, Leaf } from 'lucide-react';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { therapists } from '@/data/therapists';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="nw-footer">
      <div className="nw-footer__grid">
        <div className="nw-footer__brand">
          <span className="nw-footer__name">
            <Leaf
              size={18}
              aria-hidden="true"
              style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: 6 }}
            />
            Naaman Wellness
          </span>
          <p className="nw-footer__about">
            Confidential therapy and counselling in Nairobi and online across Kenya.
            You do not have to figure this out alone.
          </p>

          <div className="nw-footer__crisis">
            In crisis? Call {site.crisis.name} free, 24 hours:{' '}
            <a href={`tel:${site.crisis.tel}`}>{site.crisis.number}</a>
          </div>

          <a
            href={site.whatsappHref}
            className="nw-footer__about"
            style={{ color: '#aebccd', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us (non-urgent enquiries)
          </a>
        </div>

        <div className="nw-footer__col">
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="nw-footer__col">
          <h3>Therapists</h3>
          <ul>
            {therapists.map((t) => (
              <li key={t.slug}>
                <Link href={`/therapists/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/therapists">All therapists</Link>
            </li>
          </ul>
        </div>

        <div className="nw-footer__col">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link href="/resources">Self-care resources</Link>
            </li>
            <li>
              <Link href="/check-in">Wellness check-in</Link>
            </li>
            <li>
              <Link href="/corporate">For corporates</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/book">Book a session</Link>
            </li>
          </ul>
        </div>

        <div className="nw-footer__col">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link href="/legal/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/legal/terms">Terms of Use</Link>
            </li>
            <li>
              <Link href="/legal/cookie-policy">Cookie Policy</Link>
            </li>
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>Follow</h3>
          <div className="nw-footer__social">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Naaman Wellness on Instagram"
            >
              <Instagram size={20} aria-hidden="true" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Naaman Wellness on Facebook"
            >
              <Facebook size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="nw-footer__bottom">
        <NewsletterForm compact />
        <p>
          © {new Date().getFullYear()} Naaman Wellness. All rights reserved.
          <br />
          {site.address.street}, {site.address.area}, {site.address.city}
        </p>
      </div>
    </footer>
  );
}
