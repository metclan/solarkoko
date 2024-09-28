import React from 'react'
import Image from 'next/image'
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/state-management/providers/cart-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {formatCurrency}  from '@/app/utils/formatCurrency'

export function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore(state => state)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-6 w-6 text-gray-400" />
          <Badge className="absolute -top-2 -right-2 bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
            {cartItems.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <h3 className="text-xl font-bold p-4 border-b">Your Cart</h3>
        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-2">Add some amazing solar products to your cart and they will show up here</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[300px] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 py-4 px-4 hover:bg-gray-50">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                      priority
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.size}</p>
                    <p className="font-semibold text-orange-600">{formatCurrency(item.price)}</p>
                    <div className="flex items-center mt-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => decreaseQuantity(item._id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 font-medium">{item.quantity}</span>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => increaseQuantity(item._id)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              <Separator className="my-4" />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 text-lg">
                Continue To Checkout
              </Button>
              <p className="text-sm text-orange-600 mt-4 text-center font-medium">
                Psst, secure your solar gear now before it&apos;s gone!
              </p>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}