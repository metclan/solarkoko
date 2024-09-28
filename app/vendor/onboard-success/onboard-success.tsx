"use client"; 
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sun, ShoppingCart, DollarSign, BarChart } from 'lucide-react'
import Link from 'next/link'
import Confetti from 'react-confetti'

export default function VendorSuccess() {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} />}
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <Sun className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to SolarKoko!</h1>
          <p className="text-xl text-gray-600">Your vendor account has been successfully created.</p>
        </div>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-4">
            Congratulations! You&apos;re now part of our growing community of solar equipment vendors.
          </p>
          <p className="text-gray-600">
            Here&apos;s what you can do with your new account:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-3 rounded-full mb-2">
              <ShoppingCart className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Buy Products</h3>
            <p className="text-sm text-gray-600">Access a wide range of solar equipment</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-3 rounded-full mb-2">
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Sell Your Products</h3>
            <p className="text-sm text-gray-600">List and sell your solar equipment</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-3 rounded-full mb-2">
              <BarChart className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Track Orders</h3>
            <p className="text-sm text-gray-600">Monitor your sales and purchases</p>
          </div>
        </div>
        <div className="text-center">
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg mb-4">
            <Link href="/vendor-dashboard">
              View Your Dashboard
            </Link>
          </Button>
          <p className="text-sm text-gray-500">
            Need help? Contact our <Link href="/support" className="text-orange-500 hover:underline">support team</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}