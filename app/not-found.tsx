"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Search, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-lg border-orange-200 border-2">
        <CardHeader className="text-center">
          <div className="mx-auto bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
            <Sun className="h-12 w-12 text-orange-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            Oops! It seems the resource you&apos;re looking for has gone off-grid. Don&apos;t worry, we&apos;ll help you find your way back to a brighter path.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-md p-4 text-sm text-orange-800 mb-6">
            <p className="font-semibold mb-2">Here are a few places you might want to check:</p>
            <ul className="list-disc list-inside text-left">
              <li>Our <Link href="/products" className="text-orange-600 hover:underline">Products</Link> page for solar equipment</li>
              <li>The <Link href="/how-it-works" className="text-orange-600 hover:underline">How It Works</Link> section for information</li>
              <li>Our <Link href="/tools" className="text-orange-600 hover:underline">Tools</Link> for solar calculations</li>
            </ul>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="mb-6">
            <div className="flex">
              <Input 
                type="search" 
                placeholder="Search SolarKoko..." 
                className="rounded-r-none border-r-0 focus-visible:ring-orange-500 focus-visible:border-orange-500"
              />
              <Button type="submit" className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
          <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}