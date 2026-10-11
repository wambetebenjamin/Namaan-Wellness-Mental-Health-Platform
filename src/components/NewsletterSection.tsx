import { Mail } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export default function NewsletterSection() {
  return (
    <section className="nw-section nw-shell" aria-labelledby="nw-newsletter-title">
      <div className="nw-news">
        <span
          style={{
            width: 52,
            height: 52,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 'var(--nw-radius)',
            background: 'var(--nw-sage-100)',
            color: 'var(--nw-sage-700)',
          }}
        >
          <Mail size={24} aria-hidden="true" />
        </span>
        <h2 id="nw-newsletter-title" style={{ fontSize: 'var(--nw-fs-h2)' }}>
          A weekly reflection
        </h2>
        <p className="nw-lead" style={{ textAlign: 'center' }}>
          A weekly reflection and wellness resource, straight to your inbox. One short
          email, no pressure, and you can leave whenever you like.
        </p>
        <NewsletterForm />
        <p className="nw-form-note">
          We only use your email for the newsletter. You can unsubscribe from any email
          in one click.
        </p>
      </div>
    </section>
  );
}
