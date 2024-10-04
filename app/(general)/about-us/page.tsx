import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sun, Users, Zap } from 'lucide-react'

export const metadata = {
    title: 'About SolarKoko | Solar Energy Solutions for Africa',
    description:
      'Learn about SolarKoko, a leading provider of sustainable solar energy solutions across Africa. Our mission is to empower businesses and individuals through high-quality solar products and expert support.',
    keywords: [
      'SolarKoko',
      'solar energy',
      'solar panels',
      'inverters',
      'batteries',
      'solar solutions',
      'Africa solar energy',
      'MetClan Technologies',
      'sustainable energy',
      'solar products',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://www.solarkoko.com/about-us',
      title: 'About SolarKoko | Solar Energy Solutions for Africa',
      description:
        'Discover SolarKoko\'s mission to provide accessible, clean, and reliable solar energy to communities and businesses across Africa.',
      site_name: 'SolarKoko',
      images: [
        {
          url: 'https://www.solarkoko.com/images/about-us-banner.jpg',
          width: 1200,
          height: 630,
          alt: 'SolarKoko - Empowering Africa with Solar Energy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About SolarKoko | Solar Energy Solutions for Africa',
      description:
        'Explore how SolarKoko is transforming Africa\'s energy landscape with innovative solar products and expert support.',
      image: 'https://www.solarkoko.com/images/about-us-banner.jpg',
    },
  };
  

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">About SolarKoko</h1>
          <p className="mt-6 max-w-2xl text-xl">Empowering Africa with sustainable solar energy solutions</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Mission</h2>
          <p className="mt-4 text-xl text-gray-500">At SolarKoko, we are dedicated to making clean, reliable solar energy accessible to businesses and individuals across Africa. Our mission is to empower communities, drive economic growth, and contribute to a sustainable future through innovative solar solutions.</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Why Choose SolarKoko?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-orange-500 rounded-md shadow-lg">
                      <Sun className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">High-Quality Products</h3>
                  <p className="mt-5 text-base text-gray-500">
                    We offer a curated selection of top-tier solar panels, inverters, and batteries to ensure optimal performance and longevity.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-orange-500 rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Expert Support</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our team of solar experts provides personalized guidance and support throughout your solar journey.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-orange-500 rounded-md shadow-lg">
                      <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Innovative Solutions</h3>
                  <p className="mt-5 text-base text-gray-500">
                    We leverage cutting-edge technology to provide efficient and cost-effective solar energy solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Impact</h2>
            <p className="mt-3 text-xl text-orange-100 sm:mt-4">
              Together, we&apos;re making a difference in Africas energy landscape.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-orange-100">Solar Systems Installed</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">1,000+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-orange-100">kWh Generated</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">5M+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-orange-100">CO2 Emissions Reduced</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">3,500t</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Story</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Founded by MetClan Technologies, SolarKoko was born from a vision to address Africa&apos;s energy challenges. We recognized the immense potential of solar energy to transform lives and businesses across the continent. Today, we&apos;re proud to be at the forefront of the solar revolution, connecting quality products with the people who need them most.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to start your solar journey?</span>
            <span className="block text-orange-500">Get in touch with us today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                <Link href="/contact-us">
                    Contact Us
                </Link>
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50" asChild>
                <Link href="/products">
                    See Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}