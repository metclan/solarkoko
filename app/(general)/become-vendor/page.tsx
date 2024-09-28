// become-vendor.js (or become-vendor.page.js if using app directory)

import BecomeVendorComponent from "./become-vendor"

// Export metadata using Next.js metadata API
export const metadata = {
  title: "Become a Solar Equipment Vendor | YourSolarMarketplace",
  description: "Join our leading solar marketplace as a vendor. Expand your reach, boost sales, and contribute to sustainable energy. Partner with us to power the future.",
  keywords: "solar vendor, solar marketplace, sell solar equipment, solar panels, renewable energy business",
  viewport: "width=device-width, initial-scale=1",
  charset: "utf-8",
  openGraph: {
    type: 'website',
    url: 'https://yoursolarmarketplace.com/become-vendor',
    title: "Become a Solar Equipment Vendor | YourSolarMarketplace",
    description: "Join our leading solar marketplace as a vendor. Expand your reach, boost sales, and contribute to sustainable energy. Partner with us to power the future.",
    images: [
      {
        url: 'https://yoursolarmarketplace.com/images/vendor-opportunity.jpg',
        alt: 'Solar Vendor Opportunity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://yoursolarmarketplace.com/become-vendor',
    title: "Become a Solar Equipment Vendor | YourSolarMarketplace",
    description: "Join our leading solar marketplace as a vendor. Expand your reach, boost sales, and contribute to sustainable energy. Partner with us to power the future.",
    image: 'https://yoursolarmarketplace.com/images/vendor-opportunity.jpg',
  },
  robots: 'index, follow',
  author: 'YourSolarMarketplace',
  canonical: 'https://yoursolarmarketplace.com/become-vendor',
}

export default function BecomeVendor() {
  return (
    <div>
      <BecomeVendorComponent />
    </div>
  )
}
