import type { Metadata, Viewport } from 'next';
import './globals.css';

import { site } from '@/data/site';
import CrisisBanner from '@/components/CrisisBanner';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieConsent from '@/components/CookieConsent';
import RouteAnnouncer from '@/components/RouteAnnouncer';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Naaman Wellness | Therapy & Counselling in Nairobi and Online',
    template: '%s | Naaman Wellness',
  },
  description: site.description,
  keywords: [
    'therapy Nairobi',
    'counselling Kenya',
    'mental health Nairobi',
    'anxiety therapy Kenya',
    'couples therapy Nairobi',
    'grief counselling Kenya',
    'corporate wellness Kenya',
    'online therapy Kenya',
  ],
  authors: [{ name: 'Naaman Wellness' }],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: site.url,
    siteName: site.name,
    title: 'Naaman Wellness | Therapy & Counselling in Nairobi and Online',
    description: site.description,
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Naaman Wellness — therapy and counselling in Nairobi and online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naaman Wellness | Therapy & Counselling in Nairobi and Online',
    description: site.description,
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#fdfbf7',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/** MedicalClinic + LocalBusiness structured data. */
const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': ['MedicalClinic', 'LocalBusiness'],
  '@id': `${site.url}/#organisation`,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.clinicEmail,
  medicalSpecialty: 'Psychiatric',
  availableService: [
    { '@type': 'MedicalProcedure', name: 'Individual Therapy' },
    { '@type': 'MedicalProcedure', name: 'Couples Therapy' },
    { '@type': 'MedicalProcedure', name: 'Family Counselling' },
    { '@type': 'MedicalProcedure', name: 'Group Therapy' },
    { '@type': 'MedicalProcedure', name: 'Grief and Loss Support' },
    { '@type': 'MedicalProcedure', name: 'Workplace Burnout Recovery' },
    { '@type': 'MedicalProcedure', name: 'Teen and Young Adult Therapy' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.area,
    addressRegion: 'Nairobi',
    addressCountry: 'KE',
    postalCode: '00100',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: [
    { '@type': 'Country', name: 'Kenya' },
    { '@type': 'City', name: 'Nairobi' },
  ],
  image: `${site.url}/images/og-default.jpg`,
  sameAs: [site.social.instagram, site.social.facebook],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '14:00',
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: 'en-KE',
  publisher: { '@id': `${site.url}/#organisation` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        {/* Fonts loaded exactly as the design ZIP did. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Exo:wght@500;600;700&family=Roboto:wght@400;500;700&family=Montserrat:wght@500;800;900&display=swap"
        />
      </head>
      <body>
        <JsonLd data={organisationSchema} />
        <JsonLd data={websiteSchema} />

        <a className="nw-skip-link" href="#main">
          Skip to main content
        </a>

        {/* 1. Crisis banner — always the very top of every page */}
        <CrisisBanner />

        {/* 2. Sticky navbar (EFFECT-28) */}
        <Navbar />

        <main id="main" className="nw-route-fade">
          {children}
        </main>

        <Footer />

        <WhatsAppButton />
        <CookieConsent />
        <RouteAnnouncer />
        <Preloader />
      </body>
    </html>
  );
}
