import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Search, Filter, ArrowUpDown, Truck, Eye } from 'lucide-react'

type StatusColors = {
  delivered: string;
  shipped: string;
  inProgress: string;
  cancelled: string;
}
type Order = {
    id : string; 
    date : string; 
    status : string; 
    total : number; 
    address : string; 
    payment : string; 
}
// Mock data for demonstration
const orders:Order[] = [
  { id: 'ORD123456', date: '2023-09-15', status: 'delivered', total: 2500.00, address: '123 Solar St, Sunny City, SC 12345', payment: 'Credit Card' },
  { id: 'ORD123457', date: '2023-09-20', status: 'shipped', total: 1800.50, address: '456 Panel Ave, Bright Town, BT 67890', payment: 'Bank Transfer' },
  { id: 'ORD123458', date: '2023-09-25', status: 'inProgress', total: 3200.75, address: '789 Inverter Rd, Power City, PC 13579', payment: 'PayPal' },
  { id: 'ORD123459', date: '2023-09-30', status: 'cancelled', total: 500.25, address: '321 Battery Ln, Energy Villa, EV 24680', payment: 'Credit Card' },
]

const statusColors:StatusColors =  {
  "delivered": 'bg-green-100 text-green-800',
  "shipped": 'bg-blue-100 text-blue-800',
  "inProgress": 'bg-yellow-100 text-yellow-800',
  "cancelled": 'bg-red-100 text-red-800',
}

export default function MyOrders() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-white shadow-sm">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-800">My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Input 
                placeholder="Search orders..." 
                className="max-w-sm"
              />
              <Button variant="outline" className="shrink-0">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="shrink-0">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="hidden md:table-cell">Shipping Address</TableHead>
                <TableHead className="hidden md:table-cell">Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status as keyof StatusColors]}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.address}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.payment}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}