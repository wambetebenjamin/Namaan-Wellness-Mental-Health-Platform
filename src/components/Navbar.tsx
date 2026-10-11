'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { navLinks } from '@/data/site';

/**
 * EFFECT-28 — Glassmorphic sticky nav.
 * Solid at rest; glass with blur capped at 20px after 80px of scroll.
 * Solid fallback for browsers without backdrop-filter.
 * Focus rings remain visible over the blur at all times.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`nw-nav${scrolled ? ' nw-nav--scrolled' : ''}`}>
      <div className="nw-nav__inner">
        <Link href="/" className="nw-brand" aria-label="Naaman Wellness — home">
          <Leaf className="nw-brand__leaf" size={26} aria-hidden="true" />
          <span className="nw-brand__text">
            <span className="nw-brand__name">Naaman Wellness</span>
            <span className="nw-brand__tag">Nairobi &amp; Online</span>
          </span>
        </Link>

        <nav className="nw-nav__links" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nw-nav__link"
              aria-current={isCurrent(l.href) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nw-nav__actions">
          <Link href="/book" className="nw-btn nw-btn--primary">
            Book a Session
          </Link>
          <button
            type="button"
            className="nw-burger"
            aria-expanded={open}
            aria-controls="nw-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Gentle slide-down drawer */}
      <div
        id="nw-drawer"
        className={`nw-drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="nw-drawer__list">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nw-drawer__link"
              tabIndex={open ? 0 : -1}
              aria-current={isCurrent(l.href) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="nw-btn nw-btn--primary nw-drawer__cta"
            tabIndex={open ? 0 : -1}
          >
            Book a Session
          </Link>
        </div>
      </div>
    </header>
  );
}
