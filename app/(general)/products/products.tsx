"use client";
import { Button } from "@/components/ui/button"
import ProductCard from './product-card'
import { Filter } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterSidebar } from './filter-sidebar'
import { ProductCardSkeleton } from "./product-card"
import { useEffect, useState, useCallback } from "react"
import { ProductSearchResult } from "./page"
import { useSearchParams } from 'next/navigation'
import { getEndPoint } from "@/utils/getEndPoint";

export default function ProductSearch() {
  const [filteredProductsData, setFilteredProductsData] = useState<ProductSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${getEndPoint()}/api/products?${searchParams}`);
      if (response.ok) {
        const productsJson = await response.json();
        const productsArray = Object.values(productsJson) as ProductSearchResult[]
        setFilteredProductsData(productsArray)
      } else {
        setFilteredProductsData([])
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setFilteredProductsData([])
    } finally {
      setIsLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts, searchParams]) // Re-run the effect when the pathname changes

  return (
    <main className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Solar Products</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className='bg-white'>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your search results
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
              <FilterSidebar />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(8).fill(0).map((_, index) => <ProductCardSkeleton key={index} />)
          : filteredProductsData.map(product => <ProductCard key={product._id} {...product} />)
        }
      </div>
    </main>
  )
}