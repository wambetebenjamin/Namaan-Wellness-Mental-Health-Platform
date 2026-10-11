import { MessageCircle } from 'lucide-react';
import { site } from '@/data/site';

/**
 * Floating WhatsApp button.
 * Static — no pulse, no bounce, no attention-seeking animation.
 * Clearly labelled as non-emergency contact.
 */
export default function WhatsAppButton() {
  return (
    <div className="nw-wa">
      <span className="nw-wa__tooltip" aria-hidden="true">
        Reach out. We are here.
      </span>
      <a
        href={site.whatsappHref}
        className="nw-wa__btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Naaman Wellness on WhatsApp. This is a non-emergency contact."
      >
        <MessageCircle size={26} aria-hidden="true" />
        <span className="nw-wa__label">
          WhatsApp Naaman Wellness — non-emergency enquiries
        </span>
      </a>
    </div>
  );
}
