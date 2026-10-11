'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/legal/privacy-policy', label: 'Privacy Policy' },
  { href: '/legal/terms', label: 'Terms of Use' },
  { href: '/legal/cookie-policy', label: 'Cookie Policy' },
];

export default function LegalNav() {
  const pathname = usePathname();

  return (
    <nav className="nw-legalnav" aria-label="Legal documents">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
