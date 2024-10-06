import { Toaster } from "@/components/ui/toaster";
import localFont from "next/font/local";
import "./globals.css";
import { CartStoreProvider } from "@/state-management/providers/cart-provider";
import { GoogleAnalytics } from '@next/third-parties/google'
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata = {
  title: 'Solarkoko |  Solar Marketplace And E-commerce',
  description: 'Solarkoko offers high-quality solar products, including panels, batteries, inverters, and solar accessories. Explore sustainable energy solutions designed to power homes, businesses, and industries at competitive prices.',
  keywords: 'solar energy, solar panels, inverters, solar batteries, renewable energy, solar accessories, green energy, sustainable solutions, solar kits, solar marketplace',
  author: 'Metclan Technologies',
  openGraph: {
    title: 'Solarkoko | Transforming the Future with Solar Power',
    description: 'Discover a wide range of solar energy products tailored for homes and businesses. At Solarkoko, we provide efficient and cost-effective solar solutions to meet your energy needs.',
    url: 'https://www.solarkoko.com',
    images: [
      {
        url: 'https://www.solarkoko.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solarkoko - Solar Products and Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@solarkoko',
    title: 'Solarkoko | Power Your World with Solar',
    description: 'Shop the best solar panels, batteries, and complete solar solutions at Solarkoko. Empowering a sustainable future through renewable energy.',
    image: 'https://www.solarkoko.com/twitter-image.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <script>
          window.dataLayer = window.dataLayer || [];
        </script>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <CartStoreProvider>
            <ReactQueryClientProvider>
              {children}
            </ReactQueryClientProvider>
          </CartStoreProvider>
          <Toaster />
          <GoogleAnalytics gaId="G-H2QPPK44PN" />
        </body>
      </html>
  );
}
