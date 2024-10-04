import ContactPage from "./contact-us";
export const metadata = {
    title: 'Contact Us | SolarKoko',
    description: 'Get in touch with SolarKoko for inquiries, product information, vendor assistance, or customer support. Contact us via email, phone, or WhatsApp for quick responses.',
    openGraph: {
      title: 'Contact Us | SolarKoko',
      description: 'Reach out to SolarKoko for any questions or support related to solar products, orders, or vendor services. We are here to help!',
      url: 'https://solarkoko.com/contact',
      siteName: 'SolarKoko',
      images: [
        {
          url: 'https://solarkoko.com/images/contact-us-banner.jpg',
          width: 800,
          height: 600,
          alt: 'SolarKoko Contact Us',
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us | SolarKoko',
      description: 'Need assistance? Get in touch with SolarKoko for support with solar products, orders, or vendor inquiries.',
      images: ['https://solarkoko.com/images/contact-us-banner.jpg'],
    }
  };
  
  export default function ContactUs() {
    return (
      <ContactPage />
    );
  }
  