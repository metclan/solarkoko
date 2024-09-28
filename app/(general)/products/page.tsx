import ProductSearch from "./products";
export const metadata = {
    title: 'Solar Products | SolarKoko Marketplace',
    description: 'Browse and search through a wide selection of solar panels, inverters, charge controllers, batteries, and more on SolarKoko.',
    keywords: 'Solar products, SolarKoko, solar panels, inverters, charge controllers, batteries, solar equipment, renewable energy',
    openGraph: {
      title: 'Solar Products | SolarKoko Marketplace',
      description: 'Find the best solar products including solar panels, inverters, charge controllers, and batteries on SolarKoko.',
      url: 'https://solarkoko.com/products',
      type: 'website',
      siteName: 'SolarKoko',
      images: [
        {
          url: 'https://solarkoko.com/images/products-page-og.png', // Replace with actual image URL
          width: 800,
          height: 600,
          alt: 'Solar products on SolarKoko',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Solar Products | SolarKoko Marketplace',
      description: 'Discover top-quality solar panels, inverters, batteries, and more at SolarKoko.',
      images: ['https://solarkoko.com/images/products-page-og.png'], // Replace with actual image URL
      site: '@SolarKoko',
    },
    robots: 'index, follow',
    icons: {
      icon: '/favicon.ico',
    },
  };
  
  export type ProductSearchResult = {
    _id: string;
    name: string;
    price: number;
    discountedPrice: number;
    rating: number,
    reviews: number,
    images : [ {image : string}],
    description: string;
    power: number;
    voltage: number;
    type: string;
    inStock: string;
    shipping: string,
    vendor: string;
  }

  export default async function ProductSearchPage() {
    return <ProductSearch  />;
  }
  