export const site = {
  name: 'Naaman Wellness',
  legalName: 'Naaman Wellness Mental Health Platform',
  tagline: 'Compassionate, confidential therapy in Nairobi and online.',
  description:
    'Naaman Wellness offers confidential therapy and counselling in Nairobi and online across Kenya. Individual, couples, family and group sessions, plus corporate wellness programmes.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.naamanwellness.co.ke').replace(
    /\/$/,
    ''
  ),
  locale: 'en_KE',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hello@naamanwellness.co.ke',
  clinicEmail: 'hello@naamanwellness.co.ke',
  phone: '+254 112 272 061',
  phoneTel: '+254112272061',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '254112272061',
  whatsappHref:
    'https://wa.me/254112272061?text=Hello.%20I%20would%20like%20to%20enquire%20about%20a%20therapy%20session%20at%20Naaman%20Wellness.',
  crisis: {
    name: process.env.NEXT_PUBLIC_CRISIS_LINE_NAME ?? 'Befrienders Kenya',
    number: process.env.NEXT_PUBLIC_CRISIS_LINE_NUMBER ?? '0800 723 253',
    tel: process.env.NEXT_PUBLIC_CRISIS_LINE_TEL ?? '+254800723253',
  },
  address: {
    street: 'Ngong Lane Plaza, Ngong Road',
    area: 'Kilimani',
    city: 'Nairobi',
    country: 'Kenya',
    postal: 'P.O. Box 10245-00100',
  },
  geo: {
    lat: -1.2921,
    lng: 36.8219,
  },
  // Google Maps embed (no API key required)
  mapSrc:
    'https://www.google.com/maps?q=Naaman+Wellness+Kilimani+Nairobi+Kenya&output=embed',
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  },
  hours: [
    { day: 'Monday to Friday', time: '8:00 am – 7:00 pm' },
    { day: 'Saturday', time: '9:00 am – 2:00 pm' },
    { day: 'Sunday', time: 'Online sessions only' },
  ],
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/therapists', label: 'Our Therapists' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Resources' },
  { href: '/corporate', label: 'For Corporates' },
  { href: '/book', label: 'Book a Session' },
] as const;
