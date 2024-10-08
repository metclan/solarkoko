import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { verifyUser } from "@/lib/dal";
import { Cart } from './cart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignoutButton } from './signout-button';
import { NavSearchInput } from './search';
import { Menu, X, } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import SolarKokoLogo from './logo';
import { Prenav } from './prenav';


export default async function AuthenticatedNav() {
  const user = await verifyUser(); 
  const isMobileMenuOpen = false; 
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <Prenav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <SolarKokoLogo />
            </Link>
          </div>
          {/* Search Input */}
          <NavSearchInput />
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/products" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            <Link href="/tools" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Tools
            </Link>
            <Link href="/about-us" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>
          </div>
          <div className="flex items-center">
            {/* Cart */}
            <Cart />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="lg" className="ml-4 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    My Account
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link href="/account" className="flex w-full">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/orders"}>My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="flex w-full">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignoutButton />
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              <Button variant="default" className="ml-4 bg-orange-500 hover:bg-orange-600 text-white hidden sm:inline-flex">
                <Link href="/vendor">{user?.role === "vendor" ? "See Dashboard" : "Start selling"}</Link>
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
                <Link href="/vendor">See Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}