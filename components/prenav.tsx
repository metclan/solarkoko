import { Phone, Mail } from "lucide-react"
import Link from "next/link"
export function Prenav () {
    return (
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

    )
}