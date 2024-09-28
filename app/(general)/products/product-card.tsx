"use client";
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { AddToCartButton } from '@/components/add-to-cart';

interface ProductCardProps {
  _id: string
  name: string
  description: string
  power: number
  voltage: number
  type: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  images: [{ image: string }]
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full pt-[75%]">
        <Skeleton className="absolute inset-0 rounded-t-lg" />
      </div>
      <CardContent className="flex-grow p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 mr-1" />
          ))}
          <Skeleton className="w-16 h-4 ml-2" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col p-4 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center w-full mb-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex space-x-2 w-full">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default function ProductCard({
  _id,
  name,
  description,
  power,
  voltage,
  type,
  price,
  originalPrice,
  rating,
  reviews,
  images
}: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300" key={_id}>
      <div className="relative w-full pt-[75%]">
        <Image
          src={images[0].image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          priority
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({reviews} reviews)
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <Badge variant="secondary" className="justify-center text-xs">
            {power}W
          </Badge>
          <Badge variant="secondary" className="justify-center text-xs">
            {voltage}V
          </Badge>
          <Badge variant="secondary" className="justify-center text-xs">
            {type}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col p-4 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center w-full mb-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">
              ₦{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₦{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {originalPrice && (
            <Badge variant="outline" className="text-orange-500 border-orange-500">
              {((originalPrice - price) / originalPrice * 100).toFixed(0)}% OFF
            </Badge>
          )}
        </div>
        <div className="flex space-x-2 w-full">
          <Button variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <AddToCartButton item={{ _id, name, price, quantity : 1, image : images[0].image}} quantityRequested={1}/>
        </div>
      </CardFooter>
    </Card>
  )
}
