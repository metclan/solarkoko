"use client";
import React, { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusCircle, Trash2, Info, FileText, Printer, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
    setRows([...rows, { id: newId, appliance: '', quantity: 1, wattage: 0, wattageUnit: 'W', hours: 1 }])
  }

  const removeRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id))
  }

  const updateRow = (id: number, field: keyof ApplianceRow, value: string | number) => {
    setRows(rows.map(row => {
      if (row.id === id) {
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Solar Load Estimate',
  })

  const handleDownload = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    const lineHeight = 10
    let yPosition = 15
  
    // Add SolarKoko branding at the top
    doc.setFontSize(12)
    doc.setTextColor(255, 165, 0) // Orange color for SolarKoko
    // doc.text('made with solarkoko | www.solarkoko.com', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += lineHeight * 2
  
    // Add title
    doc.setFontSize(20)
    doc.setTextColor(0)
    doc.text('Solar Load Sizing Estimate', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += lineHeight * 2
  
    // Set up table
    const columns = ['Appliance', 'Quantity', 'Wattage', 'Hours per day']
    const columnWidths = [70, 30, 40, 40]
    const tableWidth = columnWidths.reduce((sum, width) => sum + width, 0)
    const tableX = (pageWidth - tableWidth) / 2
  
    // Draw table header
    doc.setFillColor(255, 165, 0) // Orange background for header
    doc.rect(tableX, yPosition, tableWidth, lineHeight, 'F')
    doc.setFontSize(12)
    doc.setTextColor(255, 255, 255) // White text for header
    
    let xPosition = tableX
    columns.forEach((column, index) => {
      doc.text(column, xPosition + columnWidths[index] / 2, yPosition + lineHeight - 2, { align: 'center' })
      xPosition += columnWidths[index]
    })
    yPosition += lineHeight
  
    // Draw table rows
    doc.setFontSize(10)
    doc.setTextColor(0)
    rows.forEach((row, index) => {
      // Alternate row background colors
      if (index % 2 === 0) {
        doc.setFillColor(240, 240, 240)
        doc.rect(tableX, yPosition, tableWidth, lineHeight, 'F')
      }
  
      xPosition = tableX
      doc.text(row.appliance, xPosition + 2, yPosition + lineHeight - 2)
      xPosition += columnWidths[0]
      doc.text(row.quantity.toString(), xPosition + columnWidths[1] / 2, yPosition + lineHeight - 2, { align: 'center' })
      xPosition += columnWidths[1]
      doc.text(`${row.wattage} ${row.wattageUnit}`, xPosition + columnWidths[2] / 2, yPosition + lineHeight - 2, { align: 'center' })
      xPosition += columnWidths[2]
      doc.text(row.hours.toString(), xPosition + columnWidths[3] / 2, yPosition + lineHeight - 2, { align: 'center' })
      
      yPosition += lineHeight
      doc.setDrawColor(200, 200, 200) // Light gray for table lines
      doc.line(tableX, yPosition, tableX + tableWidth, yPosition)
    })
  
    yPosition += lineHeight
  
    // Add total energy
    doc.setFontSize(14)
    doc.setTextColor(0)
    doc.text(`Total Daily Energy: ${totalEnergy.toFixed(2)} kWh`, pageWidth / 2, yPosition, { align: 'center' })
  
    // Add footer
    doc.setFontSize(10)
    doc.setTextColor(128, 128, 128) // Gray color for the footer
    doc.text('made with solarkoko | www.solarkoko.com', pageWidth / 2, pageHeight - 10, { align: 'center' })
  
    // Save the PDF
    doc.save('SolarLoadEstimate.pdf')
  }
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
                  <Input
                    type="text"
                    value={row.appliance}
                    onChange={(e) => updateRow(row.id, 'appliance', e.target.value)}
                    placeholder="Enter appliance name"
                    className="w-full md:w-[200px]"
                  />
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
          <Button onClick={handleDownload} variant="outline" className="w-full sm:w-auto text-blue-600 border-blue-600 hover:bg-blue-50">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
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
          <li>Enter the name of your appliance in the &quot;Appliance&quot; field.</li>
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