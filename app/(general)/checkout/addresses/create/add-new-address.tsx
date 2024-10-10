"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCheckoutAddressAction } from '@/app/actions/user'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
]
type Address = {
    name : string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
} 

export function AddNewAddress() {
    const [state, action]  = useFormState(createCheckoutAddressAction, { success : false, message : ''})
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    const [ isFormDirty, setIsFormDirty] = useState<boolean>(false); 
    const [newAddress, setNewAddress] = useState<Address>({
        name : '',
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
    })

    // Handle form changes
    useEffect(() => {
        function handleFormChange() {
            setIsFormDirty(true)
        }
        const form = formRef.current
        form?.addEventListener('input', handleFormChange)

        return () => {
            form?.removeEventListener('input', handleFormChange)
        }
    }, [])
    // Go back with confirmation if form is dirty
    function handleGoBack() {
        if (isFormDirty) {
            const leavePage = window.confirm("You have unsaved changes. Do you really want to leave?")
            if (leavePage) {
                window.history.back() // Navigate back if user confirms
            }
        } else {
            window.history.back() // No warning if form is clean
        }
    }

    useEffect(() => {
        if (state.success) {
            toast({
                title: "New address added successfully",
                className: "bg-green-500"
            })
            setIsFormDirty(false); 
            router.push('/checkout/addresses')
        }
    }, [state, router])

    return (
        <div className="lg:col-span-2 space-y-8">
            <form ref={formRef} action={action}>
                <Card className="border-none shadow-sm">
                    <CardHeader className="border-b border-gray-200 pb-4">
                        <CardTitle className="text-xl font-semibold text-gray-900">
                            Add New Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="street" className="text-sm font-medium text-gray-700">
                                    Street
                                </Label>
                                <Input
                                    id="street"
                                    name="street"
                                    value={newAddress.street}
                                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                    City
                                </Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                                    Zip Code
                                </Label>
                                <Input
                                    id="postalCode"
                                    name="postalCode"
                                    value={newAddress.postalCode}
                                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                                    State
                                </Label>
                                <Select
                                    name="state"
                                    value={newAddress.state}
                                    onValueChange={(value) => setNewAddress({ ...newAddress, state: value })}
                                    required
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {nigerianStates.map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6 space-x-4">
                            <Button type="button" onClick={handleGoBack} variant="outline" className="text-gray-600 hover:text-gray-800">
                                Go Back
                            </Button>
                            <SubmitButton />
                        </div>
                    </CardContent>
                </Card>
            </form>

            <Card className="border-none shadow-sm">
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
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white" disabled={pending}>
            Save Address
        </Button>
    )
}
