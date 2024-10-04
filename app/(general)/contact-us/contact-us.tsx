"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageCircle, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Get in Touch</h1>
          <p className="mt-6 max-w-2xl text-xl">We&apos;re here to help you with any questions or concerns.</p>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <Mail className="mr-2 h-5 w-5 text-orange-500" />
                <span>support@solarkoko.com</span>
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="mr-2 h-5 w-5 text-orange-500" />
                <span>+2348166211248</span>
              </p>
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Chat</h3>
                <p className="text-gray-600 mb-4">For faster responses, chat with us on WhatsApp:</p>
                <a
                  href="https://wa.me/+2348166211248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900">What products do you offer?</h3>
              <p className="mt-2 text-base text-gray-500">We offer a wide range of solar products including panels, inverters, batteries, and accessories.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Do you provide installation services?</h3>
              <p className="mt-2 text-base text-gray-500">Yes, we offer professional installation services for all our solar products.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">What is your return policy?</h3>
              <p className="mt-2 text-base text-gray-500">We offer a 30-day return policy for unopened products in their original packaging.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">How long does shipping take?</h3>
              <p className="mt-2 text-base text-gray-500">Shipping times vary depending on your location, but typically range from 3-7 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}