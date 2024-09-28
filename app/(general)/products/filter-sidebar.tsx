"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

export function FilterSidebar() {
  const [category, setCategory] = useState<string>('all')
  const [volts, setVolts] = useState<string>('all')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [powerOutput, setPowerOutput] = useState([100, 5000])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    capacityRatings: true,
    priceRange: true,
    brand: true,
    warranty: true,
    customerRatings: true,
  })
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section as keyof typeof expandedSections]}))
  }

  const handleApplyFilter = () => {
    let queryUrl = `${pathname}?`
    const params = searchParams.get('q')
    queryUrl += `q=${params || 'all'}`
    queryUrl += category !== 'all' ? `&category=${category}` : '';
    queryUrl += volts !== 'all' ? `&volts=${volts}` : '';
    queryUrl += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
    router.push(queryUrl)
  }

  const clearFilter = () => {
    setCategory('all'); 
    setVolts('all'); 
    let queryUrl = `${pathname}?`
    const params = searchParams.get('q')
    queryUrl += `q=${params || 'all'}`
    router.push(queryUrl)
  }

  return (
    <div className="space-y-4 max-w-xs mx-auto bg-white p-4 rounded-lg shadow">
      {/* Categories */}
      <div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('categories')}>
          <h3 className="text-lg font-semibold">Categories</h3>
          {expandedSections.categories ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.categories && (
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select product type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="solar-panels">Solar Panels</SelectItem>
              <SelectItem value="charge-controllers">Charge Controllers</SelectItem>
              <SelectItem value="inverters">Inverters</SelectItem>
              <SelectItem value="batteries">Batteries</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Capacity Ratings */}
      <div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('capacityRatings')}>
          <h3 className="text-lg font-semibold">Capacity Ratings</h3>
          {expandedSections.capacityRatings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.capacityRatings && (
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm font-medium">Power Output (Watts)</Label>
              <Slider
                min={100}
                max={5000}
                step={100}
                value={powerOutput}
                onValueChange={setPowerOutput}
                className="mt-2"
              />
              <div className="flex justify-between text-sm mt-1">
                <span>{powerOutput[0]}W</span>
                <span>{powerOutput[1]}W</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Voltage (Volts)</Label>
              <Select value={volts} onValueChange={(value) => setVolts(value)}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select voltage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Voltage</SelectItem>
                  <SelectItem value="12">12V</SelectItem>
                  <SelectItem value="24">24V</SelectItem>
                  <SelectItem value="48">48V</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('priceRange')}>
          <h3 className="text-lg font-semibold">Price Range</h3>
          {expandedSections.priceRange ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.priceRange && (
          <>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-1/2"
                placeholder="Min"
              />
              <span>-</span>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-1/2"
                placeholder="Max"
              />
            </div>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-4"
            />
            <Button variant="outline" size="sm" className="mt-2" onClick={clearFilter}>
              Clear <X size={16} className="ml-2" />
            </Button>
          </>
        )}
      </div>

      {/* Brand */}
      <div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('brand')}>
          <h3 className="text-lg font-semibold">Brand</h3>
          {expandedSections.brand ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.brand && (
          <div className="space-y-2 mt-2">
            {['LG', 'Tesla', 'Renogy'].map((brand) => (
              <div key={brand} className="flex items-center">
                <Checkbox id={brand} />
                <Label htmlFor={brand} className="ml-2">{brand}</Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Warranty */}
      <div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('warranty')}>
          <h3 className="text-lg font-semibold">Warranty</h3>
          {expandedSections.warranty ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.warranty && (
          <div className="space-y-2 mt-2">
            {['1 year', '2 years', '5+ years'].map((warranty) => (
              <div key={warranty} className="flex items-center">
                <Checkbox id={warranty} />
                <Label htmlFor={warranty} className="ml-2">{warranty}</Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Ratings */}
      {/* <div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection('customerRatings')}>
          <h3 className="text-lg font-semibold">Customer Ratings</h3>
          {expandedSections.customerRatings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        {expandedSections.customerRatings && (
          <RadioGroup defaultValue="4" className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="r4" />
              <Label htmlFor="r4">4★ & above</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="r3" />
              <Label htmlFor="r3">3★ & above</Label>
            </div>
          </RadioGroup>
        )}
      </div> */}

      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" onClick={handleApplyFilter}>
        Apply Filters
      </Button>
    </div>
  )
}