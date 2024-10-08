import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sun, Zap, Battery, Calculator } from 'lucide-react'
import Link from 'next/link'
import FeaturedProducts from '@/components/featured-products'

export default async function HomePage() {
  const categories = [
    { name: 'Solar Panels', icon: Sun, description: 'High-efficiency panels for maximum energy capture', link : "/products?q=solar%20panels=&category=solar-panels" },
    { name: 'Inverters', icon: Zap, description: 'Convert DC to AC power for your home', link : "/products?q=inverters=&category=inverters"},
    { name: 'Batteries', icon: Battery, description: 'Store excess energy for use anytime', link: "/products?q=batteries=&category=batteries"},
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Power Your Home with Solar</h1>
          <p className="mt-6 max-w-2xl text-xl">Harness the sun&apos;s energy and take control of your power consumption. Browse our curated selection of top-quality solar products.</p>
          <div className="mt-10 flex space-x-4">
            <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-50">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-orange-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      {/* Featured Products */}
      <FeaturedProducts />
      {/* Product Categories */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Product Categories</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={category.link}>
                      Explore {category.name}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Solar Budget Calculator CTA */}
      <div className="bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Not sure where to start?</span>
            <span className="block text-orange-200">Try our Solar Load Calculator</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-50" asChild>
                <Link href="/tools/load-calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Your Load
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Want solar energy updates?</span>
            <span className="block text-orange-500">Sign up for our newsletter.</span>
          </h2>
          <form className="mt-8 sm:flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:max-w-xs"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Notify me
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}