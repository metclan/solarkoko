import { cookies } from "next/headers";
import VendorProducts from "./products";
export const metadata = {
  title: 'Your Products | SolarKoko Vendor Dashboard',
  description: 'Manage and view all your products listed on SolarKoko. Keep track of your inventory, prices, and more.',
  keywords: 'SolarKoko, vendor dashboard, product management, solar products, inventory, manage listings',
  openGraph: {
    title: 'Your Products | SolarKoko Vendor Dashboard',
    description: 'Easily manage all your solar products and stay updated with your inventory on SolarKoko.',
    url: 'https://solarkoko.com/vendor/products',
    type: 'website',
    siteName: 'SolarKoko',
    images: [
      {
        url: 'https://solarkoko.com/images/vendor-products-og.png', // Replace with actual image URL
        width: 800,
        height: 600,
        alt: 'SolarKoko Vendor Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Products | SolarKoko Vendor Dashboard',
    description: 'Keep track of and manage your solar product listings on SolarKoko.',
    images: ['https://solarkoko.com/images/vendor-products-og.png'], // Replace with actual image URL
    site: '@SolarKoko',
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
};

export type ProductTableItem = {
  id : string; 
  name : string;
  category : string; 
  price : number; 
  stock : number; 
}
export default async function Products() {
  const backendApi = process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:3000"
  const cookieStore = cookies()
  if(cookieStore.has('session')){
    const fetchProducts = await fetch(`${backendApi}/api/vendor/products`, { method : 'GET', headers : { 'Cookie' : cookies().toString()}})
    if(fetchProducts.ok){
      const fetchedData = await fetchProducts.json()
      const data = Object.values(fetchedData) as ProductTableItem[]
      if(data.length > 0){
        return <VendorProducts tableData = {data}/>
      }
      return <VendorProducts tableData={data} />
    }else{
      return <VendorProducts tableData={[]} />
    }
  }
}
