'use client';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LayoutDashboard, Package, ShoppingCart, DollarSign, Boxes, PlusCircle, BarChart2, MessageSquare, HelpCircle, Settings, LogOut, Menu, X, Bell, User, Filter } from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Package, label: "Products" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: DollarSign, label: "Payouts" },
  { icon: Boxes, label: "Inventory" },
  { icon: PlusCircle, label: "Add Product" },
  { icon: BarChart2, label: "Analytics" },
  { icon: MessageSquare, label: "Reviews" },
  { icon: HelpCircle, label: "Support" },
  { icon: Settings, label: "Settings" },
]

const products = [
  { id: 1, name: "Solar Panel 400W", category: "Panels", price: 299.99, stock: 50 },
  { id: 2, name: "Inverter 5kW", category: "Inverters", price: 1299.99, stock: 30 },
  { id: 3, name: "Battery 10kWh", category: "Batteries", price: 4999.99, stock: 20 },
  { id: 4, name: "Solar Panel 300W", category: "Panels", price: 249.99, stock: 75 },
  { id: 5, name: "Inverter 3kW", category: "Inverters", price: 899.99, stock: 40 },
]

export default function VendorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activePage, setActivePage] = useState("Products")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const filteredProducts = products.filter(product => 
    (categoryFilter === "All" || product.category === categoryFilter) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    
        <main className="flex-1 overflow-y-auto bg-white p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">{activePage}</h1>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                <Link href={"/vendor/products/create"}>
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Add Product
                </Link>
              </Button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Panels">Panels</SelectItem>
                    <SelectItem value="Inverters">Inverters</SelectItem>
                    <SelectItem value="Batteries">Batteries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                className="max-w-xs"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Products Table */}
            <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
  )
}