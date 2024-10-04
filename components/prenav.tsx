"use client"; 
import { Phone, Mail, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Prenav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 md:h-12">
          <div className="hidden md:flex items-center">
            <Phone className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">+234 8166211248</span>
            <Mail className="h-4 w-4 text-gray-500 ml-4 mr-2" />
            <span className="text-sm text-gray-500">sales@solarkoko.com</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/shipping" className="text-sm text-gray-500 hover:text-gray-700">Shipping</Link>
            <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-700">FAQ</Link>
            <Link href="/contact-us" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="tel:+2348166211248" className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              <Phone className="h-4 w-4 inline-block mr-2" />
              +234 8166211248
            </a>
            <a href="mailto:sales@solarkoko.com" className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              <Mail className="h-4 w-4 inline-block mr-2" />
              sales@solarkoko.com
            </a>
            <Link href="/shipping" className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Shipping
            </Link>
            <Link href="/faq" className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}