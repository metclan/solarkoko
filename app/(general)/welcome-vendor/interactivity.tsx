"use client"; 
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function GobackButton () {
    return(<Button 
        variant="ghost" 
        className="w-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Go Back
      </Button>)
}