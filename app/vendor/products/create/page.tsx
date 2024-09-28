"use client";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createProduct } from '@/app/actions/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';

const categories = ['Solar Panels', 'Inverters', 'Batteries', 'Charge Controllers', 'Accessories']
const capacityUnits = ['volts', 'watts', 'amperes', 'kilowatt-hours', 'amp-hours']

export default function AddProduct() {
    const {toast} = useToast()
  const [state, action] = useFormState(createProduct, { message : null, success : false})
  const [images, setImages] = useState<string[]>([])
  const [specifications, setSpecifications] = useState<{ [key: string]: string }>({})

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const handleImageRemove = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSpecificationAdd = () => {
    setSpecifications(prev => ({ ...prev, '': '' }))
  }

  const handleSpecificationChange = (key: string, value: string, index: number) => {
    const newSpecs = { ...specifications }
    delete Object.keys(newSpecs)[index]
    newSpecs[key] = value
    setSpecifications(newSpecs)
  }
  useEffect(() => {
    if(state.success && state.message){
        toast({
            title : state.message, 
            variant : "default"
        })
    }if(!state.success && state.message){
        toast({
            title : state.message, 
            variant : "destructive"
        })
    }
  }, [state, toast])
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Add New Product</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" action={action}>
        <div className='space-y-6'>
            <Card>
            <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">General Information</h2>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input name="name" id="name" className="mt-1" placeholder="Enter product name" required />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" id="description" className="mt-1" placeholder="Enter product description" required />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select required name='category'>
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Pricing and Stock</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input name="price" id="price" type="number" min="0" step="0.01" className="mt-1" placeholder="0.00" required />
                </div>
                <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input name="quantity" id="stock" type="number" min="0" className="mt-1" placeholder="Enter stock quantity" required />
                </div>
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Capacity</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="capacityValue">Capacity Value</Label>
                    <Input name="capacity" id="capacityValue" type="number" min="0" step="0.01" className="mt-1" placeholder="Enter capacity value" />
                </div>
                <div>
                    <Label htmlFor="capacityUnit">Capacity Unit</Label>
                    <Select required name="unit">
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {capacityUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Additional Information</h2>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="warranty">Warranty</Label>
                    <Input name="warranty" id="warranty" className="mt-1" placeholder="Enter warranty information" />
                </div>
                <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input name="brand" id="brand" className="mt-1" placeholder="Enter brand name" />
                </div>
                </div>
            </CardContent>
            </Card>

        </div>
        <div className='space-y-6'> 
            <Card>
            <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Specifications</h2>
                <div className="space-y-2">
                {Object.entries(specifications).map(([key, value], index) => (
                    <div key={index} className="flex space-x-2">
                    <Input 
                        placeholder="Key" 
                        value={key} 
                        onChange={(e) => handleSpecificationChange(e.target.value, value, index)} 
                    />
                    <Input 
                        placeholder="Value" 
                        value={value} 
                        onChange={(e) => handleSpecificationChange(key, e.target.value, index)} 
                    />
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={handleSpecificationAdd} className="mt-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Specification
                </Button>
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Product Images</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                    <Image src={image} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                    <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-1 right-1" 
                        onClick={() => handleImageRemove(index)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    </div>
                ))}
                <label className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center cursor-pointer hover:border-orange-500 transition-colors">
                    <input name="images" type="file" accept="image/*" multiple onChange={handleImageAdd} className="hidden" />
                    <PlusCircle className="h-6 w-6 text-gray-400" />
                </label>
                </div>
            </CardContent>
            </Card>
        </div>
        <Card className='col-span-2'>
            <CardContent className="p-4 md:p-6">
                <div className='flex gap-6 flex-col md:flex-row'>
                    <Button type="button" variant="destructive" className="w-full text-white">
                        Cancel
                    </Button>
                    <SubmitButton />
                </div>
            </CardContent>
        </Card>
      </form>
    </div>
  )
}

function SubmitButton () {
    const { pending } = useFormStatus()
    return (                    
    <Button disabled={pending} type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
        {pending ? "Pending" : "Save"}
    </Button>)
}