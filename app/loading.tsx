"use client"; 
import React from 'react'
import { Sun } from 'lucide-react'
import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  fullPage?: boolean
}

export default function Loading({ size = 'medium', className, fullPage = false }: LoadingProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    fullPage ? "fixed inset-0 bg-white bg-opacity-75 z-50" : "w-full h-full",
    className
  )

  return (
    <div className={containerClasses}>
      <div className="relative">
        <Sun className={cn(
          "text-orange-500 animate-spin",
          sizeClasses[size]
        )} />
        <div className={cn(
          "absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-orange-200 rounded-full animate-pulse",
          sizeClasses[size]
        )} />
      </div>
      <p className={cn(
        "mt-4 text-orange-600 font-medium animate-pulse",
        {
          'text-sm': size === 'small',
          'text-base': size === 'medium',
          'text-lg': size === 'large'
        }
      )}>
        Loading...
      </p>
    </div>
  )
}