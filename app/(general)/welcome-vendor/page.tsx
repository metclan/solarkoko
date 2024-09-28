import React from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Home } from 'lucide-react';
import {GobackButton} from './interactivity'
import Link from 'next/link';

export const metadata = {
  title: 'Become A vendor | Start Selling on SolarKoko',
  description: 'Become a vendor on SolarKoko and join a thriving community of solar equipment suppliers. Reach more customers and power up your business.',
  keywords: 'Vendor, SolarKoko, solar products, solar marketplace, sell solar products, Nigeria, renewable energy, start selling',
  openGraph: {
    title: 'Vendor Access | Start Selling on SolarKoko',
    description: 'Join SolarKoko as a vendor and grow your solar equipment business. Reach more customers and expand your brand in the solar market.',
    url: 'https://solarkoko.com/vendor-access',
    type: 'website',
    siteName: 'SolarKoko',
    images: [
      {
        url: 'https://solarkoko.com/images/vendor-access-og.png', // Replace with actual image URL
        width: 800,
        height: 600,
        alt: 'SolarKoko Vendor Access',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendor Access | Start Selling on SolarKoko',
    description: 'Start selling solar products on SolarKoko and reach a growing market in Nigeria.',
    images: ['https://solarkoko.com/images/vendor-access-og.png'], // Replace with actual image URL
    site: '@SolarKoko',
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function VendorAccess() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <Sun className="h-12 w-12 text-orange-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Start Your Vendor Journey</h1>
        <p className="text-xl text-gray-600 mb-6">
          You&apos;re about to embark on an exciting journey as a SolarKoko vendor!
        </p>
        <p className="text-gray-600 mb-8">
          Join our community of solar equipment suppliers and reach more customers across Nigeria. Are you ready to power up your business?
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/become-vendor">
              Start Selling on SolarKoko
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Homepage
            </Link>
          </Button>
          <GobackButton />
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Have questions? Visit our <Link href="/faq" className="text-orange-500 hover:underline">FAQ</Link> or contact our <Link href="/support" className="text-orange-500 hover:underline">support team</Link>.
        </p>
      </div>
    </div>
  );
}
