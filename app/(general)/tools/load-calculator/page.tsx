"use client";
import React, { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusCircle, Trash2, Info, FileText, Printer } from 'lucide-react'

const appliances = [
  { name: 'Television', defaultWattage: 100 },
  { name: 'Refrigerator', defaultWattage: 150 },
  { name: 'Washing Machine', defaultWattage: 500 },
  { name: 'Air Conditioner', defaultWattage: 1500 },
  { name: 'Ceiling Fan', defaultWattage: 75 },
  { name: 'Microwave Oven', defaultWattage: 1000 },
  { name: 'Desktop Computer', defaultWattage: 200 },
  { name: 'Laptop', defaultWattage: 50 },
  { name: 'Electric Kettle', defaultWattage: 1500 },
  { name: 'Hair Dryer', defaultWattage: 1200 },
]

const wattageUnits = ['W', 'kW', 'HP', 'GW', 'MW', 'TW']

interface ApplianceRow {
  id: number;
  appliance: string;
  quantity: number;
  wattage: number;
  wattageUnit: string;
  hours: number;
}

const PrintableComponent = React.forwardRef<HTMLDivElement, { rows: ApplianceRow[], totalEnergy: number }>((props, ref) => {
  return (
    <div ref={ref} className="p-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Solar Load Sizing Estimate</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-bold">Appliance</TableHead>
            <TableHead className="font-bold">Quantity</TableHead>
            <TableHead className="font-bold">Wattage</TableHead>
            <TableHead className="font-bold">Hours per day</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.appliance}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{`${row.wattage} ${row.wattageUnit}`}</TableCell>
              <TableCell>{row.hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 text-xl font-bold">
        Total Daily Energy: {props.totalEnergy.toFixed(2)} kWh
      </div>
      <div className="mt-8 text-sm text-gray-500 text-center">
        Made with SolarKoko | www.solarkoko.com
      </div>
    </div>
  )
})

PrintableComponent.displayName = 'PrintableComponent'

export default function BudgetEstimator() {
  const [rows, setRows] = useState<ApplianceRow[]>([
    { id: 1, appliance: 'Television', quantity: 1, wattage: 100, wattageUnit: 'W', hours: 1 }
  ])
  const [totalEnergy, setTotalEnergy] = useState(0)
  const [shareUrl] = useState('')
  const componentRef = useRef(null)

  const addRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1
    setRows([...rows, { id: newId, appliance: 'Television', quantity: 1, wattage: 100, wattageUnit: 'W', hours: 1 }])
  }

  const removeRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id))
  }

  const updateRow = (id: number, field: keyof ApplianceRow, value: string | number) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        if (field === 'appliance') {
          // const selectedAppliance = appliances.find(a => a.name === value)
          // return { ...row, [field]: value, wattage: selectedAppliance ? selectedAppliance.defaultWattage : row.wattage }
        }
        return { ...row, [field]: value }
      }
      return row
    }))
  }

  const convertToWatts = (wattage: number, unit: string): number => {
    switch (unit) {
      case 'kW': return wattage * 1000;
      case 'HP': return wattage * 745.7;
      case 'GW': return wattage * 1e9;
      case 'MW': return wattage * 1e6;
      case 'TW': return wattage * 1e12;
      default: return wattage;
    }
  }

  useEffect(() => {
    const total = rows.reduce((sum, row) => {
      const wattageInW = convertToWatts(row.wattage, row.wattageUnit)
      return sum + (row.quantity * wattageInW * row.hours)
    }, 0)
    setTotalEnergy(total / 1000) // Convert to kWh
  }, [rows])

  const generateQuote = () => {
    // This is a placeholder function. In a real application, this would generate a quote based on the current data.
    alert("Quote generation functionality would be implemented here.")
  }

  // const shareEstimate = () => {
  //   // In a real application, this would generate a unique URL for sharing
  //   const uniqueId = Math.random().toString(36).substring(2, 15)
  //   const url = `https://solarkoko.com/share/${uniqueId}`
  //   setShareUrl(url)
  // }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Solar Load Estimate',
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-12 text-center">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900">Solar Load Sizing Calculator</h1>
        </div>
        <p className="text-xl text-gray-600">Estimate your daily energy consumption for solar planning</p>
      </header>

      <main className="bg-white shadow-sm rounded-lg p-4 md:p-6 mb-8 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-900">Appliance</TableHead>
              <TableHead className="font-semibold text-gray-900">Quantity</TableHead>
              <TableHead className="font-semibold text-gray-900">Wattage</TableHead>
              <TableHead className="font-semibold text-gray-900">Hours per day</TableHead>
              <TableHead className="font-semibold text-gray-900">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className="border-b border-gray-200">
                <TableCell className="py-2">
                  <Select value={row.appliance} onValueChange={(value) => updateRow(row.id, 'appliance', value)}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select appliance" />
                    </SelectTrigger>
                    <SelectContent>
                      {appliances.map((appliance) => (
                        <SelectItem key={appliance.name} value={appliance.name}>
                          {appliance.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="py-2">
                  <Input
                    type="number"
                    min="1"
                    value={row.quantity}
                    onChange={(e) => updateRow(row.id, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full md:w-[100px]"
                  />
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <Input
                      type="number"
                      min="0"
                      value={row.wattage}
                      onChange={(e) => updateRow(row.id, 'wattage', parseFloat(e.target.value) || 0)}
                      className="w-full md:w-[120px]"
                    />
                    <Select value={row.wattageUnit} onValueChange={(value) => updateRow(row.id, 'wattageUnit', value)}>
                      <SelectTrigger className="w-full md:w-[80px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {wattageUnits.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Input
                    type="number"
                    min="0"
                    max="24"
                    value={row.hours}
                    onChange={(e) => updateRow(row.id, 'hours', parseFloat(e.target.value) || 0)}
                    className="w-full md:w-[100px]"
                  />
                </TableCell>
                <TableCell className="py-2">
                  <Button variant="ghost" size="sm" onClick={() => removeRow(row.id)}>
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <Button onClick={addRow} variant="outline" className="w-full md:w-auto mb-4 md:mb-0 text-orange-600 border-orange-600 hover:bg-orange-50">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Appliance
          </Button>
          <div className="text-xl font-semibold text-gray-900">
            Total Daily Energy: {totalEnergy.toFixed(2)} kWh
          </div>
        </div>
      </main>

      <section className="bg-gray-50 rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={generateQuote} variant="outline" className="w-full sm:w-auto text-green-600 border-green-600 hover:bg-green-50">
            <FileText className="h-4 w-4 mr-2" />
            Generate Quote
          </Button>
          <Dialog>
            {/* <DialogTrigger asChild>
              <Button onClick={shareEstimate} variant="outline" className="w-full sm:w-auto text-blue-600 border-blue-600 hover:bg-blue-50">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DialogTrigger> */}
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle>Share Your Load</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Copy this URL to share your estimate:</p>
                <div className="flex items-center space-x-2">
                  <Input value={shareUrl} readOnly />
                  <Button onClick={() => navigator.clipboard.writeText(shareUrl)}>
                    Copy
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          {/* <Button variant="outline" className="w-full sm:w-auto text-purple-600 border-purple-600 hover:bg-purple-50">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button> */}
          <Button onClick={handlePrint} variant="outline" className="w-full sm:w-auto text-red-600 border-red-600 hover:bg-red-50">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </section>

      <footer className="bg-white rounded-lg p-4 md:p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Info className="h-5 w-5 mr-2 text-gray-500" />
          Instructions
        </h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>For appliances with different capacities, add them as separate rows instead of increasing the quantity.</li>
          <li>If wattage isn&apos;t indicated, you can calculate it by multiplying current (Amps) and voltage (Volts).</li>
          <li>Use the dropdown to select the appropriate wattage unit for each appliance.</li>
        </ul>
      </footer>

      <div style={{ display: 'none' }}>
        <PrintableComponent ref={componentRef} rows={rows} totalEnergy={totalEnergy} />
      </div>
    </div>
  )
}