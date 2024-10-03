import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AddToCartButton } from "./add-to-cart"
import { formatCurrency } from "@/app/utils/formatCurrency"
import { getEndPoint } from "@/utils/getEndPoint"
import Link from "next/link"
type FeaturedProduct = {
  _id : string; 
  name : string; 
  category : string; 
  capacity : {
    unit : string; 
    value : number;
  };
  images : [{
    image : string;
  }]; 
  price : number; 

}
export default async function FeaturedProducts () {
    let featuredProducts:FeaturedProduct[] = [];
    const backendApi = getEndPoint()
    const featuredProductsResponse = await fetch(`${backendApi}/api/products-display`, { method : 'GET', next : { revalidate : 60 * 30}})
    if(featuredProductsResponse.ok){
      const featuredProductsResponseJson = await featuredProductsResponse.json()
      const featuredProductsResponseArray = Object.values(featuredProductsResponseJson) as FeaturedProduct[];
      featuredProducts = featuredProductsResponseArray;
    }
    return <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Products</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredProducts.map((product) => (
        <Card key={product._id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <Link href={`/product/${product._id}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Image height={1000} width={1000} src={product.images[0].image} alt={product.name} className="w-full h-52 object-fill rounded-t-lg" />
            </Link>
          </CardHeader>
          <CardContent>
            <Badge className="mb-2">{product.category}</Badge>
            <CardTitle>
              <Link href={`/product/${product._id}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  {product.name}
              </Link>
              </CardTitle>
            <CardDescription>
              {product.category && <span className="mr-2">{product.category}</span>}
              {product.capacity.value && <span className="mr-2">{product.capacity.unit}</span>}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-2xl font-bold text-orange-500">{formatCurrency(product.price)}</span>
            <div>
              <AddToCartButton item={{_id : product._id, name : product.name, image : product.images[0].image, quantity : 1, price : product.price}} quantityRequested={1}/>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
}