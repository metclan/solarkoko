"use client";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sun, Upload, ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { createVendor } from '@/app/actions/vendor';
import { useFormStatus, useFormState } from 'react-dom';


const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
]

export default function BecomeVendorComponent() {
    const [state, action] = useFormState(createVendor, { message : null, success : false})
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState({
    terms: false,
    returnPolicy: false,
    privacyPolicy: false
  })
  useEffect(() => {
    // Do something in here
  }, [state])
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
            <button onClick={() => router.back()} className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
            </button>
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Sun className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Become a SolarKoko Vendor</h1>
          <p className="text-gray-600">Join our network of solar equipment suppliers and reach more customers!</p>
        </div>

        <form action={action} className="space-y-8">
          {/* Store Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Store Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="storeName">Store Name *</Label>
                <Input id="storeName" required name={"storeName"}/>
              </div>
              <div>
                <Label htmlFor="companyName">Business/Company Name</Label>
                <Input id="companyName" name="companyName"/>
              </div>
              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea id="storeDescription" name="businessDescription"/>
              </div>
            </div>
            <div className="sm:col-span-2 max-w-xs mx-auto">
              <Label htmlFor="storeLogo">Store Logo Upload</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="businessLogo" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                      <span>Upload a file</span>
                      <input id="businessLogo" name="businessLogo" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="businessEmail">Business Email *</Label>
                <Input id="businessEmail" type="email" name={"businessEmail"}/>
              </div>
              <div>
                <Label htmlFor="businessPhone">Business Phone Number *</Label>
                <Input id="businessPhone" type="tel" name={"businessPhone"}/>
              </div>
              {/* <div className="sm:col-span-2">
                <Label htmlFor="supportContact">Customer Support Contact</Label>
                <Input id="supportContact" name={"supportContact"}/>
              </div> */}
            </div>
          </div>

          {/* Business Address */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Business Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="businessAddress">Business Address *</Label>
                <Input id="businessAddress" required name="businessAddress"/>
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" required name="city"/>
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select required name="state">
                  <SelectTrigger id="state" name="state">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input id="postalCode" required name={"postalCode"}/>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" value="Nigeria" disabled name={"country"}/>
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Banking Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input id="bankName" required name={"bankName"}/>
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input id="accountNumber" required name={"accountNumber"}/>
              </div>
              <div>
                <Label htmlFor="accountName">Account Name *</Label>
                <Input id="accountName" required name="accountName"/>
              </div>
              {/* <div>
                <Label htmlFor="bvn">BVN (Optional)</Label>
                <Input id="bvn" />
              </div> */}
            </div>
          </div>

          {/* Tax Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Tax Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="taxId">Tax Identification Number</Label>
                <Input id="taxId" name="taxIdentificationNumber"/>
              </div>
              {/* <div>
                <Label htmlFor="businessLicense">Business License Number</Label>
                <Input id="businessLicense" />
              </div> */}
            </div>
          </div>

          {/* Product Categories */}
          {/* <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Product Categories</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="primaryCategory">Primary Category *</Label>
                <Select required>
                  <SelectTrigger id="primaryCategory">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar-panels">Solar Panels</SelectItem>
                    <SelectItem value="inverters">Inverters</SelectItem>
                    <SelectItem value="batteries">Batteries</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="additionalCategories">Additional Categories</Label>
                <Select>
                  <SelectTrigger id="additionalCategories">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solar-panels">Solar Panels</SelectItem>
                    <SelectItem value="inverters">Inverters</SelectItem>
                    <SelectItem value="batteries">Batteries</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div> */}

          {/* Shipping Information */}
          {/* <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Shipping Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="shippingMethods">Shipping Methods *</Label>
                <Select required>
                  <SelectTrigger id="shippingMethods">
                    <SelectValue placeholder="Select shipping methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                    <SelectItem value="both">Both Local and International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deliveryZones">Delivery Zones *</Label>
                <Input id="deliveryZones" required />
              </div>
              <div>
                <Label htmlFor="handlingTime">Handling Time (in days) *</Label>
                <Input id="handlingTime" type="number" required />
              </div>
            </div>
          </div> */}

          {/* Terms and Agreements */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Terms and Agreements</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  name="terms"
                  checked={termsAccepted.terms}
                  onCheckedChange={(checked) => setTermsAccepted(prev => ({ ...prev, terms: checked as boolean }))}
                />
                <Label htmlFor="terms">I agree to the Terms & Conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="returnPolicy" 
                  name="returnPolicy"
                  checked={termsAccepted.returnPolicy}
                  onCheckedChange={(checked) => setTermsAccepted(prev => ({ ...prev, returnPolicy: checked as boolean }))}
                />
                <Label htmlFor="returnPolicy">I agree to the Return/Refund Policy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="privacyPolicy" 
                  name="privacyPolicy"
                  checked={termsAccepted.privacyPolicy}
                  onCheckedChange={(checked) => setTermsAccepted(prev => ({ ...prev, privacyPolicy: checked as boolean }))}
                />
                <Label htmlFor="privacyPolicy">I agree to the Privacy Policy</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
function SubmitButton () { 
    const {pending} = useFormStatus()
    return <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
    {pending ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : "Save and Continue"}
  </Button>   
}