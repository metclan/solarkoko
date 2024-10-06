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
