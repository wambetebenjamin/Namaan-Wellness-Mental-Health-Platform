import type { Metadata } from 'next';
import Link from 'next/link';
import ContactSection from '@/components/ContactSection';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Naaman Wellness, Ngong Lane Plaza, Kilimani, Nairobi. Online sessions available anywhere in Kenya. Phone and WhatsApp for non-urgent enquiries.',
  openGraph: {
    title: 'Contact | Naaman Wellness',
    description:
      'Find us in Kilimani, Nairobi, or meet online from anywhere in Kenya.',
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="nw-pagehead">
        <div className="nw-pagehead__inner">
          <nav className="nw-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>
          <h1>Contact us</h1>
          <p className="nw-lead">
            Our practice is in Kilimani, Nairobi. Online sessions are available anywhere in
            Kenya — all you need is a quiet space and a connection.
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
