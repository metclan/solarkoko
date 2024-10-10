import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Calculator } from 'lucide-react'

export const metadat = {
  "title": "Load Size Calculator - Calculate Power Consumption Effortlessly",
  "description": "Use our Load Size Calculator to effortlessly calculate the power consumption of your electrical appliances. Discover the total power required to choose the right solar inverter, panel, and battery for your solar system.",
  "keywords": [
    "load size calculator",
    "solar power consumption",
    "solar panel calculator",
    "inverter sizing",
    "battery sizing",
    "solar system power requirements",
    "calculate power consumption",
    "solar energy calculator",
    "choose solar inverter",
    "solar panel sizing"
  ],
  "author": "MetClan Technologies",
  "robots": "index, follow",
  "og": {
    "title": "Load Size Calculator - Effortlessly Calculate Power Consumption",
    "description": "Accurately calculate the power consumption of your electrical appliances and find the right solar system setup, including solar inverter, panel, and battery sizing.",
    "url": "https://solarkoko.com/tools/load-calculator",
    "image": "https://solarkoko.com/tools/load-calculator"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Load Size Calculator - Power Consumption and Solar Sizing",
    "description": "Easily calculate the total power consumption of your home or business appliances to determine the right solar inverter, panel, and battery for your needs.",
    "image": "https://solarkoko.com/tools/load-calculator"
  }
}

const tools = [
  {
    title: "Load Size Calculator",
    description: "Estimate the size of solar system you need based on your energy consumption.",
    icon: <Calculator className="h-6 w-6 text-orange-500" />,
    link: "/tools/load-calculator",
    cta: "Size Your System"
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">Solar Power Tools</h1>
      <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
        Explore our range of powerful tools designed to help you plan, size, and optimize your solar power system. 
        Whether you&apos;re a homeowner or a professional installer, these tools will assist you in making informed decisions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                {tool.icon}
              </div>
              <CardTitle className="text-orange-600">{tool.title}</CardTitle>
              <CardDescription className="text-gray-600">{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <Link href={tool.link}>{tool.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}