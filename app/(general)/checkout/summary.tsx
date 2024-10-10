"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/app/utils/formatCurrency";

type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
}
type Cart = {
    cartitems : CartItem[], 
    amountTotal : number; 
}
function handleCompleteCheckout () {

}
export default function OrderSummary () {
    const [cart] = useState<Cart>({
        cartitems : [], 
        amountTotal : 0
    })
    return(
        <Card className="border-none shadow-sm h-fit">
          <CardHeader className="border-b border-gray-200 pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {cart?.cartitems.map((item : CartItem) => (
                <div key={item._id} className="flex justify-between text-base">
                  <span className="text-gray-700">{item.name} x {item.quantity}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatCurrency(cart.amountTotal)}</span>
                </div>
                <div className="flex justify-between text-base text-gray-600 mt-2">
                  <span>Tax</span>
                  <span>₦0.00</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatCurrency(cart.amountTotal)}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCompleteCheckout}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-md mt-6 transition duration-300 ease-in-out text-base"
            >
              Complete Checkout
            </Button>
            <p className="text-sm text-gray-600 mt-4 text-center">
              By completing your purchase you agree to these Terms of Service.
            </p>
          </CardContent>
        </Card>
    )
}
