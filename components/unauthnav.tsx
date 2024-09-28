"use client";

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sun, User, Menu, X } from 'lucide-react'
import { NavSearchInput } from './search';
import { motion, AnimatePresence } from "framer-motion"
import { useState } from 'react';
import { Cart } from './cart';

export default async function UnAutheticatedNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* <Prenav /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Sun className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900 hidden sm:inline">SolarKoko</span>
            </Link>
          </div>
          {/* Search Input */}
          <NavSearchInput />
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
          <div className="flex items-center">
            {/* Cart component */}
            <Cart />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="lg" className="ml-4 p-2">
                  <User className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Sign in
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/login" className="flex w-full">My account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/login" className="flex w-full">Sign in</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              <Button variant="default" className="ml-4 bg-orange-500 hover:bg-orange-600 text-white hidden sm:inline-flex">
                <Link href="/signup">Register</Link>
              </Button>
          </div>
          <div className="flex md:hidden">
            <Button variant="ghost" className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white pt-16"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/products" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Products</Link>
              <Link href="/how-it-works" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">How It Works</Link>
              <Link href="/tools" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Tools</Link>
              <Link href="/about" className="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
              <div className="mt-4 flex">
                <Input
                  id="mobile-search"
                  name="mobile-search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                />
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-r-md">
                  Search
                </Button>
              </div>
                <Button variant="default" className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/vendor">Start Selling</Link>
                </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}