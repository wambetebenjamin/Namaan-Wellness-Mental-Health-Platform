import { MapPin, Phone, Clock, Video, AlertCircle } from 'lucide-react';
import { site } from '@/data/site';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className="nw-section nw-shell" aria-labelledby="nw-contact-title">
      <div className="nw-section-head">
        <p className="nw-eyebrow">Contact</p>
        <h2 id="nw-contact-title">Come and find us</h2>
        <p className="nw-lead">
          Our practice is in Kilimani, Nairobi. Online sessions are available anywhere in
          Kenya — all you need is a quiet space and a connection.
        </p>
      </div>

      <div className="nw-contact">
        <div className="nw-info-list">
          <div className="nw-info-row">
            <span className="nw-info-row__icon">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="nw-info-row__label">Our practice</p>
              <p className="nw-info-row__value">
                {site.address.street}
                <br />
                {site.address.area}, {site.address.city}
                <br />
                {site.address.country}
                <br />
                {site.address.postal}
              </p>
            </div>
          </div>

          <div className="nw-info-row">
            <span className="nw-info-row__icon">
              <Phone size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="nw-info-row__label">Phone &amp; WhatsApp</p>
              <p className="nw-info-row__value">
                <a href={`tel:${site.phoneTel}`} style={{ textDecoration: 'underline' }}>
                  {site.phone}
                </a>
                <br />
                <span style={{ fontSize: 'var(--nw-fs-meta)', color: 'var(--nw-text-muted)' }}>
                  Non-urgent enquiries only
                </span>
              </p>
            </div>
          </div>

          <div className="nw-info-row">
            <span className="nw-info-row__icon">
              <Video size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="nw-info-row__label">Online sessions</p>
              <p className="nw-info-row__value">
                Available anywhere in Kenya. We will send you a private link before your
                session.
              </p>
            </div>
          </div>

          <div className="nw-info-row">
            <span className="nw-info-row__icon">
              <Clock size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="nw-info-row__label">Opening hours</p>
              <p className="nw-info-row__value">
                {site.hours.map((h) => (
                  <span key={h.day}>
                    {h.day} — {h.time}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>

          <iframe
            className="nw-contact__map"
            src={site.mapSrc}
            title="Map showing Naaman Wellness, Kilimani, Nairobi"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

          <div className="nw-notice">
            <AlertCircle size={16} aria-hidden="true" />
            <span>
              Phone and WhatsApp are for non-urgent enquiries only. If you are in crisis,
              please call {site.crisis.name} on {site.crisis.number} — free, 24 hours.
            </span>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--nw-fs-h3)', marginBottom: '1rem' }}>
            Send us a message
          </h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
