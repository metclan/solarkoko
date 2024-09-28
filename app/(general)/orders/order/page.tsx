
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sun, Truck, Package, CheckCircle, CreditCard, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const orderDetails = {
  orderNumber: 'ORD123456',
  orderDate: '2023-09-15',
  shippingAddress: '123 Solar St, Sunny City, SC 12345, United States',
  billingAddress: '456 Panel Ave, Bright Town, BT 67890, United States',
  items: [
    { name: 'Solar Panel 400W', quantity: 2, price: 299.99, discount: 20 },
    { name: 'Inverter 5kW', quantity: 1, price: 1299.99, discount: 0 },
  ],
  statusTimeline: [
    { status: 'Order Placed', date: '2023-09-15', completed: true },
    { status: 'Processing', date: '2023-09-16', completed: true },
    { status: 'Shipped', date: '2023-09-18', completed: true },
    { status: 'Delivered', date: '2023-09-20', completed: false },
  ],
  trackingNumber: 'TRK9876543210',
  paymentInfo: 'Visa ending in 1234',
  returnStatus: 'No return requested',
}

export default function OrderDetails() {
  const subtotal = orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalDiscount = orderDetails.items.reduce((sum, item) => sum + (item.discount * item.quantity), 0)
  const total = subtotal - totalDiscount

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/orders" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to My Orders
      </Link>
      
      <Card className="bg-white shadow-sm mb-6">
        <CardHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Order Details</CardTitle>
            <Badge variant="outline" className="text-orange-500 border-orange-500">
              {orderDetails.orderNumber}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">Ordered on {orderDetails.orderDate}</p>
        </CardHeader>
        <CardContent className="grid gap-6 pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-600">{orderDetails.shippingAddress}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Billing Address</h3>
              <p className="text-sm text-gray-600">{orderDetails.billingAddress}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-4">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${item.discount.toFixed(2)}</TableCell>
                    <TableCell>${((item.price - item.discount) * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-semibold">Subtotal</TableCell>
                  <TableCell>${subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-semibold">Total Discount</TableCell>
                  <TableCell>-${totalDiscount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-semibold">Total</TableCell>
                  <TableCell className="font-bold">${total.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-4">Order Status Timeline</h3>
            <div className="space-y-4">
              {orderDetails.statusTimeline.map((status, index) => (
                <div key={index} className="flex items-center">
                  <div className={`rounded-full p-2 ${status.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {index === 0 && <Sun className="h-5 w-5" />}
                    {index === 1 && <Package className="h-5 w-5" />}
                    {index === 2 && <Truck className="h-5 w-5" />}
                    {index === 3 && <CheckCircle className="h-5 w-5" />}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{status.status}</p>
                    <p className="text-sm text-gray-500">{status.date}</p>
                  </div>
                  {index < orderDetails.statusTimeline.length - 1 && (
                    <div className="h-14 w-px bg-gray-200 mx-4" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Tracking Number: <span className="font-medium">{orderDetails.trackingNumber}</span>
            </p>
          </div>
          
          <Separator />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <p className="text-sm text-gray-600 flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                {orderDetails.paymentInfo}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Return Status</h3>
              <p className="text-sm text-gray-600">{orderDetails.returnStatus}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center mt-8">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Need Help? Contact Support
        </Button>
      </div>
    </div>
  )
}