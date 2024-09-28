import NavigationBar from "@/components/navbar";
import { Footer } from "@/components/footer";
export const metadata = {
  title: 'Solarkoko | Your Ultimate Solar Solutions Marketplace',
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

export default async function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <>
        <NavigationBar/>
        {children}
        <Footer />
    </>
  )
}
