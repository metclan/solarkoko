"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/state-management/providers/cart-provider'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, ShoppingCart } from 'lucide-react'

// interface ProductDescriptionProps {
//   product: {
//     _id: string
//     name: string
//     description: string
//     images: string[]
//     price: number
//     category: string
//     vendorName: string
//     rating: number
//     reviews: number
//     specifications: { [key: string]: string }
//     warranty: string
//     additionalInfo: string
//   }
// }

interface ProductDescriptionProps {
  product : {
    capacity: { unit: 'kilowatt-hours', value: 3 },
    _id: string;
    vendor: string;
    name: string; 
    description: string; 
    category: string;
    price: number;
    stock: number;
    warranty: string;
    brand: string; 
    images: [ { image : string} ],
    createdAt: string; 
    updatedAt: string; 
  }
}
export default function ProductDescription({ product }: ProductDescriptionProps) {
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const { addToCart } = useCartStore(state => state)
  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      image: product.images[0].image,
      price: product.price,
      quantity: quantity,
    }, 1)
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square mb-4">
            <Image
              src={product.images[currentImage].image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 cursor-pointer ${
                  index === currentImage ? 'border-2 border-orange-500' : ''
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <Image
                  src={image.image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            {/* <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div> */}
            {/* <span className="ml-2 text-sm text-gray-600">
              ({product.reviews} reviews)
            </span> */}
          </div>
          <p className="text-2xl font-bold text-orange-500 mb-4">
            ₦{product.price.toLocaleString()}
          </p>
          <Badge className="mb-4">{product.category}</Badge>
          {/* <p className="mb-4">Sold by: {product.vendorName}</p> */}
          
          {/* Add to Cart */}
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20 mx-2 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button className="ml-4 bg-orange-500 hover:bg-orange-600" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          {/* Short Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Key Features */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc pl-5">
                {/* {Object.entries(product.specifications).slice(0, 5).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))} */}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList>
          <TabsTrigger value="description">Full Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="warranty">Warranty</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Product Description</h3>
              <p>{product.description}</p>
              <h4 className="font-semibold mt-4 mb-2">Additional Information</h4>
              {/* <p>{product.additionalInfo}</p> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Full Specifications</h3>
              {/* <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="warranty">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Warranty Information</h3>
              <p>{product.warranty}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}