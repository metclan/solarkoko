"use client"; 
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sun, Search, ShoppingCart, User, Menu, X, Phone, Mail } from 'lucide-react'

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      {/* Small top nav */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">+234 8166211248</span>
              <Mail className="h-4 w-4 text-gray-500 ml-4 mr-2" />
              <span className="text-sm text-gray-500">sales@solarkoko.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/shipping" className="text-sm text-gray-500 hover:text-gray-700">Shipping</Link>
              <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-700">FAQ</Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Sun className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900">SolarKoko</span>
            </Link>
          </div>

          {/* Wide search bar */}
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-start">
            <div className="max-w-2xl w-full">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Search for solar panels, inverters, batteries..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="/products" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/how-it-works" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                How It Works
              </Link>
              <Link href="/tools" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Tools
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                About Us
              </Link>
            </div>
            <Button variant="ghost" size="sm" className="ml-4 text-gray-400 hover:text-gray-500">
              <ShoppingCart className="h-6 w-6" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-4 text-gray-400 hover:text-gray-500">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/login" className="flex w-full">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account" className="flex w-full">My Account</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="default" className="ml-4 bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/signup">Start Selling</Link>
            </Button>
          </div>
          <div className="flex md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/products" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Products</Link>
          <Link href="/how-it-works" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">How It Works</Link>
          <Link href="/tools" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Tools</Link>
          <Link href="/about" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
        </div>
      </div>
    </nav>
  )
}