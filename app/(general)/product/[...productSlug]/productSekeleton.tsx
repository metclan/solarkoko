import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProductDescriptionSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Skeleton */}
        <div>
          <Skeleton className="aspect-square w-full mb-4 rounded-lg" />
          <div className="flex space-x-2 overflow-x-auto">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-20 h-20 rounded" />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" /> {/* Product name */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-5 h-5 mr-1" />
              ))}
            </div>
            <Skeleton className="w-24 h-5 ml-2" /> {/* Reviews count */}
          </div>
          <Skeleton className="h-8 w-32 mb-4" /> {/* Price */}
          <Skeleton className="h-6 w-24 mb-4" /> {/* Category badge */}
          <Skeleton className="h-5 w-48 mb-4" /> {/* Vendor name */}
          
          {/* Add to Cart Skeleton */}
          <div className="flex items-center mb-6">
            <Skeleton className="h-10 w-10 mr-2" />
            <Skeleton className="h-10 w-20 mx-2" />
            <Skeleton className="h-10 w-10 mr-4" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Short Description Skeleton */}
          <Skeleton className="h-20 w-full mb-6" />

          {/* Key Features Skeleton */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <Skeleton className="h-6 w-32 mb-2" />
              <ul className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-4 w-full" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList>
          <TabsTrigger value="description"><Skeleton className="h-5 w-32" /></TabsTrigger>
          <TabsTrigger value="specifications"><Skeleton className="h-5 w-32" /></TabsTrigger>
          <TabsTrigger value="warranty"><Skeleton className="h-5 w-24" /></TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-6 w-56 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications">
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-48 mb-2" />
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(8)].map((_, index) => (
                  <li key={index} className="flex justify-between border-b pb-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="warranty">
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}