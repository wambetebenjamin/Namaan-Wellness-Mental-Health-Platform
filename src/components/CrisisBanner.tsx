import { LifeBuoy } from 'lucide-react';
import { site } from '@/data/site';

/**
 * Persistent crisis banner — top of every page, above the navbar.
 * Deliberately quiet: a thin warm bar with small text. Never alarming,
 * never a call to action dressed as urgency.
 */
export default function CrisisBanner() {
  return (
    <div className="nw-crisis" role="region" aria-label="Crisis support line">
      <div className="nw-crisis__inner">
        <LifeBuoy size={14} aria-hidden="true" />
        <p className="nw-crisis__text">
          If you are in crisis or need immediate help, please call{' '}
          {site.crisis.name}:{' '}
          <a className="nw-crisis__link" href={`tel:${site.crisis.tel}`}>
            {site.crisis.number}
          </a>
          . Free. 24 hours.
        </p>
      </div>
    </div>
  );
}
