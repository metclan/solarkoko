"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, DollarSign, Boxes, BarChart2, MessageSquare, HelpCircle, Settings, LogOut, X } from 'lucide-react'
import { cn } from "@/lib/utils"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", link : "/vendor" },
    { icon: Package, label: "Products", link : "/vendor/products" },
    { icon: ShoppingCart, label: "Orders", link : "/vendor/orders" },
    { icon: DollarSign, label: "Payouts", link : "/vendor/payouts" },
    { icon: Boxes, label: "Inventory", link : "/vendor/inventory" },
    { icon: BarChart2, label: "Analytics", link : "/vendor/analytics" },
    { icon: MessageSquare, label: "Reviews", link : "/vendor/reviews" },
    { icon: HelpCircle, label: "Support", link : "/vendor/support" },
    { icon: Settings, label: "Settings", link : "/vendor/settings" },
  ]
export default function VendorSidebar () {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [activePage, setActivePage] = useState("Dashboard")
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
      }
    
    return(
        <aside
        className={cn(
          "bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          "fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0",
          "lg:w-64 sm:w-16"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold text-orange-500 lg:block sm:hidden">SolarKoko</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <nav className="p-2 space-y-2">
            {sidebarItems.map((item, index) => (
            <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal",
              "hover:bg-orange-100 hover:text-orange-500",
              activePage === item.label && "bg-orange-100 text-orange-500",
              "lg:px-4 sm:px-2"
            )}
            onClick={() => setActivePage(item.label)}
            asChild
          >
            <Link href={item.link}>
                <item.icon className="h-5 w-5 lg:mr-2" />
                <span className="lg:inline sm:hidden">{item.label}</span>
            </Link>
          </Button>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-left font-normal hover:bg-orange-100 hover:text-orange-500 lg:px-4 sm:px-2"
          >
            <LogOut className="h-5 w-5 lg:mr-2" />
            <span className="lg:inline sm:hidden">Logout</span>
          </Button>
        </div>
      </aside>
    )

}