// import type { Metadata } from 'next';
// import Link from 'next/link';
// import { ContactForm } from '../components/contact-form';
// import { Waves } from '../components/visuals';

// export const metadata: Metadata = { title: 'Contact — Comvoix', description: 'Talk to the Comvoix team about cloud calling, business numbers, SIP trunking and voice services for your business.' };

// const emails = ['support@comvoix.com', 'sales@comvoix.com'];

// export default function ContactPage() {
//   return <><Waves /><main className="pbx-page contact-page">
//     <section className="container pbx-hero contact-hero">
//       <div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Contact</span></div>
//       <div className="contact-copy">
//         <div className="product-hero-copy">
//           <h1>Let’s Talk About <em>Your Communication</em></h1>
//           <p>Tell us about your teams, locations and calling requirements. Our team will come back to you with the right next step for your business.</p>
//         </div>
//         <aside className="contact-info">
//           <div className="contact-block">
//             <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.6" /></svg></span>
//             <div>
//               <h3>Business mailing address</h3>
//               <address className="legal-address"><strong>ComVoix, LLC</strong><br />1000 N West St, Suite 1200<br />Wilmington, DE 19801</address>
//             </div>
//           </div>
//           <div className="contact-block">
//             <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" /></svg></span>
//             <div>
//               <h3>Phone</h3>
//               <a href="tel:+13024855838">+1 302-485-5838</a>
//             </div>
//           </div>
//           <div className="contact-block">
//             <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6.5L20.5 7" /></svg></span>
//             <div>
//               <h3>Email</h3>
//               <ul>{emails.map(address => <li key={address}><a href={`mailto:${address}`}>{address}</a></li>)}</ul>
//             </div>
//           </div>
//         </aside>
//       </div>
//       <div className="glass contact-form-card">
//         <ContactForm />
//       </div>
//     </section>
//   </main></>;
// }

import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '../components/contact-form';
import { Waves } from '../components/visuals';
import { ProtectedContact } from '../components/protected-contact';

export const metadata: Metadata = { title: 'Contact — Comvoix', description: 'Talk to the Comvoix team about cloud calling, business numbers, SIP trunking and voice services for your business.' };

export default function ContactPage() {
  return <><Waves /><main className="pbx-page contact-page">
    <section className="container pbx-hero contact-hero">
      <div className="product-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Contact</span></div>
      <div className="contact-copy">
        <div className="product-hero-copy">
          <h1>Let’s Talk About <em>Your Communication</em></h1>
          <p>Tell us about your teams, locations and calling requirements. Our team will come back to you with the right next step for your business.</p>
        </div>
        <aside className="contact-info">
          <div className="contact-block">
            <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.6" /></svg></span>
            <div>
              <h3>Business mailing address</h3>
              <address className="legal-address"><strong>ComVoix, LLC</strong><br />1000 N West St, Suite 1200<br />Wilmington, DE 19801</address>
            </div>
          </div>
          <div className="contact-block">
            <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 3.5h3.5l1.8 5-2.6 1.8a12 12 0 0 0 5.5 5.5l1.8-2.6 5 1.8v3.5q0 1.7-1.7 1.7A17 17 0 0 1 4.8 5.2q0-1.7 1.7-1.7Z" /></svg></span>
            <div><h3>Phone</h3><ProtectedContact contact="phone" /></div>
          </div>
          <div className="contact-block">
            <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6.5L20.5 7" /></svg></span>
            <div><h3>Email</h3><ul><li><ProtectedContact contact="support" /></li><li><ProtectedContact contact="sales" /></li></ul></div>
          </div>
        </aside>
      </div>
      <div className="glass contact-form-card"><ContactForm /></div>
    </section>
  </main></>;
}
