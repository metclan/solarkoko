"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, } from "@/components/ui/radio-group"
import { PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useQuery } from '@tanstack/react-query'
import { getEndPoint } from '@/utils/getEndPoint'
import { AddressSkeleton } from './address-skeleton'
import { AddressCard } from './address-card'

type Address = {
  _id: string
  name: string
  street: string
  city: string
  state: string
  phone: string
  isDefault?: string
}

export default function CheckoutPageAddresses() {
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')
  const [userAddresses, setUserAddresses] = useState<Address[]>([])
  const { data, isLoading } = useQuery({
    queryKey: ["USER_ADDRESSES"],
    queryFn: async () => await fetch(`${getEndPoint()}/api/user`, { method: 'GET', headers: { 'action': 'GET_ADDRESSES' } })
  })

  useEffect(() => {
    async function updateData() {
      if (data?.ok) {
        const userData = await data?.json()
        const address = userData.addresses as Address[]
        setUserAddresses(address)
        if (address.length > 0 && !selectedAddressId) {
          setSelectedAddressId(address[0]._id)
        }
      } else {
        setUserAddresses([])
      }
    }
    updateData()
  }, [data, selectedAddressId])

  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="">
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b border-gray-200 pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900">Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <>
                <AddressSkeleton />
                <AddressSkeleton />
                <AddressSkeleton />
              </>
            ) : (
              <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                {userAddresses.map((address) => ( <AddressCard address={address} key={address._id}/> ))}
              </RadioGroup>
            )}
            <Button
              variant="outline"
              className="mt-4 text-orange-600 border-orange-300 hover:bg-orange-50 font-medium px-4 py-2"
              asChild
            >
              <Link href="/checkout/addresses/create">
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Location
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm mt-8">
          <CardHeader className="border-b border-gray-200 pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-base text-gray-700">
              Payment is securely processed by Paystack.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}