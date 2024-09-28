import Head from 'next/head'
import VendorSuccess from "./onboard-success"

export default function VendorOnboardSuccess() {
  const title = "Welcome to Solar Coco! Vendor Onboarding Success"
  const description = "Congratulations on successfully joining Solar Coco as a vendor! Access your dashboard to view sales, list products, and manage your solar business. Start selling renewable energy solutions today."
  const keywords = "solar vendor onboarding, solar marketplace, sell solar products, renewable energy business"

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://solarcoco.com/vendor/onboard-success" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://solarcoco.com/images/vendor-onboarding-success.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://solarcoco.com/vendor/onboard-success" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://solarcoco.com/images/vendor-onboarding-success.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://solarcoco.com/vendor/onboard-success" />

        {/* Additional tags */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="Solar Coco" />
      </Head>
      <VendorSuccess />
    </>
  )
}