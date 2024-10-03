"use client"

// import React, { useState } from 'react'
// import { useCartStore } from '@/state-management/providers/cart-provider'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { PaystackButton } from 'react-paystack'
// import { PlusCircle, Edit2, CreditCard } from 'lucide-react'

// const existingAddresses = [
//   {
//     id: 1,
//     name: "Chibyke Harmony",
//     street: "Tetlow Road",
//     city: "Owerri-Wetheral",
//     state: "Imo",
//     zipCode: "",
//     phone: "+234 8166211248",
//     isDefault: true
//   },
//   {
//     id: 2,
//     name: "Chibyke Harmony",
//     street: "123 Solar Street",
//     city: "Lagos",
//     state: "Lagos",
//     zipCode: "",
//     phone: "+234 8166211248",
//     isDefault: false
//   }
// ]

export default function CheckoutPage() {
//   const { cartItems} = useCartStore(state => state)
//   const total = 100
//   const [selectedAddressId, setSelectedAddressId] = useState(existingAddresses.find(addr => addr.isDefault)?.id || 1)
//   const [isAddingNewAddress, setIsAddingNewAddress] = useState(false)
//   const [newAddress, setNewAddress] = useState({
//     name: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     phone: ''
//   })
//   const [deliveryMethod, setDeliveryMethod] = useState('standard')

//   const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewAddress({ ...newAddress, [e.target.name]: e.target.value })
//   }

//   const handleAddNewAddress = () => {
//     console.log("New address to be added:", newAddress)
//     setIsAddingNewAddress(false)
//     setNewAddress({
//       name: '',
//       street: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       phone: ''
//     })
//   }

//   const handlePaystackSuccess = (reference : string) => {
//     console.log("Payment successful", reference)
//   }

//   const handlePaystackClose = () => {
//     console.log("Payment window closed")
//   }

//   const paystackConfig = {
//     reference: (new Date()).getTime().toString(),
//     email: "customer@example.com",
//     amount: total * 100,
//     publicKey: 'YOUR_PAYSTACK_PUBLIC_KEY',
//   }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1>Page still under construction</h1>
      {/* <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-orange-600 text-xl">Customer Address</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup value={selectedAddressId.toString()} onValueChange={(value) => setSelectedAddressId(parseInt(value))}>
                {existingAddresses.map((address) => (
                  <div key={address.id} className="flex items-center space-x-2 mb-4 p-3 border border-gray-200 rounded-md">
                    <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} />
                    <Label htmlFor={`address-${address.id}`} className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{address.name}</span>
                        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        {address.street}, {address.city}, {address.state}
                      </div>
                      <div className="text-sm text-gray-600">{address.phone}</div>
                      {address.isDefault && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full mt-1 inline-block">
                          Default Address
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {!isAddingNewAddress ? (
                <Button 
                  onClick={() => setIsAddingNewAddress(true)}
                  variant="outline"
                  className="mt-4 text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              ) : (
                <div className="mt-4 space-y-4">
                  <Input 
                    placeholder="Full Name" 
                    name="name" 
                    value={newAddress.name} 
                    onChange={handleNewAddressChange}
                  />
                  <Input 
                    placeholder="Street Address" 
                    name="street" 
                    value={newAddress.street} 
                    onChange={handleNewAddressChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      placeholder="City" 
                      name="city" 
                      value={newAddress.city} 
                      onChange={handleNewAddressChange}
                    />
                    <Input 
                      placeholder="State" 
                      name="state" 
                      value={newAddress.state} 
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      placeholder="Zip Code" 
                      name="zipCode" 
                      value={newAddress.zipCode} 
                      onChange={handleNewAddressChange}
                    />
                    <Input 
                      placeholder="Phone" 
                      name="phone" 
                      value={newAddress.phone} 
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      onClick={() => setIsAddingNewAddress(false)}
                      variant="outline"
                      className="text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddNewAddress}
                      className="bg-orange-600 text-white hover:bg-orange-700"
                    >
                      Save Address
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-orange-600 text-xl">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard Delivery (3-5 business days)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Express Delivery (1-2 business days)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-orange-600 text-xl">Payment</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4 text-gray-600">Secure payment via Paystack</p>
              <PaystackButton
                {...paystackConfig}
                text="Pay Now with Paystack"
                onSuccess={handlePaystackSuccess}
                onClose={handlePaystackClose}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Pay ₦{total.toLocaleString()} Now
              </PaystackButton>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-orange-600 text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between font-bold">
                <span>Total Items:</span>
                <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-orange-600">
                <span>Total Amount:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}