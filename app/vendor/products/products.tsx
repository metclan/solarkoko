'use client';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductTableItem } from './page';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Package, PlusCircle, Filter, MoreHorizontal, Pencil, Trash2, Link2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


type Props = {
    tableData : ProductTableItem[]
}

export default function VendorProducts({tableData} : Props) {
  const [activePage] = useState("Products")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const handleEditProduct = (productId: string) => {
    // Logic to edit the product
    console.log(`Edit product ${productId}`)
  }

  const handleDeleteProduct = (productId: string) => {
    // Logic to delete the product
    console.log(`Delete product ${productId}`)
  }

  const handleCopyLink = (productId: string) => {
    // Logic to copy the product link
    const link = `https://solarkoko.com/product/${productId}`
    navigator.clipboard.writeText(link)
    alert("Product link copied to clipboard!")
  }

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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyLink(product.id)}>
                              <Link2 className="mr-2 h-4 w-4" />
                              <span>Copy Link</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Display if user hasn't added products before  */}
            {tableData.length === 0 && <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-gray-50 rounded-lg">
                <Package className="w-24 h-24 text-orange-300 mb-6" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">No products yet</h2>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                    Start selling by adding your first product. Click the button below to get started!
                </p>
                <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    asChild
                >
                    <Link href={"/vendor/products/create"}>
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add Your First Product
                    </Link>
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                    Need help? Check out our <a href="/vendor-guide" className="text-orange-500 hover:underline">Vendor Guide</a>
                </p>
            </div>}
          </div>
        </main>
  )
}