"use client"; 
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { genVerificationCode, verifyCodeForSignup, signup } from '@/app/actions/auth';
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const steps = [
  { title: "Email", description: "Enter your email address" },
  { title: "Verification", description: "Verify your email" },
  { title: "Details", description: "Set up your account" },
  // { title: "Business Info", description: "Tell us about your business" },
]


export default function SignupPage() {
  const {toast} = useToast();
  const [loading, setLoading] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [email, setEmail] = useState<string>("")
  const [verificationCode, setVerificationCode] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [businessName, setBusinessName] = useState<string>("")
  const [state, setState] = useState<string>("")
  const [referralSource, setReferralSource] = useState<string>("")

  async function handleNext () {
      if(currentStep === 0 && email){
        setLoading(true)
        const verifyEmailAndGenCode = await genVerificationCode(email)
        if(verifyEmailAndGenCode.success){
          setLoading(false)
          setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          toast({title : verifyEmailAndGenCode.message, variant : "default", className : "bg-green-600"})
        }else{
          setLoading(false)
          toast({title : verifyEmailAndGenCode.message, variant : "destructive",})
        }
      }
      if(currentStep === 1 && email && verificationCode){
        setLoading(true)
        const successful = await verifyCodeForSignup(verificationCode, email)
        if(successful){
          setLoading(false)
          setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        }else{
          setLoading(false); 
          toast({
            title : "Incorrect verification code",
            variant : "destructive"
          })
        }
      }
  }

  function handleBack  () {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }
  async function handleFormSubmit  () {
    setLoading(true); 
    const signupUser = await signup(email, password, phone)
    if(!signupUser.success){
      toast({title : signupUser.message, variant : "destructive"})
      setLoading(false)
    }else{ 
      toast({title : signupUser.message, variant : "default", className : "bg-green-600"})
      setLoading(false)
    }
  }
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="verification">Verification Code</Label>
              <Input
                id="verification"
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  {/* Add more states as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="referralSource">How did you hear about us?</Label>
              <Select value={referralSource} onValueChange={setReferralSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="search">Search Engine</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="friend">Friend or Colleague</SelectItem>
                  <SelectItem value="ad">Advertisement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row">
        {/* Left column with solar illustration */}
        <div className="bg-orange-500 md:w-1/2 p-12 flex items-center justify-center">
          <svg
            className="w-full h-auto max-w-md"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="150" r="100" fill="#FCD34D" />
            <path d="M200 30V50M200 250V270M30 150H50M350 150H370M61 61L75 75M325 325L339 339M339 61L325 75M75 325L61 339" stroke="#FCD34D" strokeWidth="8" strokeLinecap="round" />
            <path d="M170 100H230V160C230 176.569 216.569 190 200 190C183.431 190 170 176.569 170 160V100Z" fill="#FBBF24" />
            <rect x="190" y="70" width="20" height="30" fill="#FBBF24" />
            <path d="M140 180H260L200 240L140 180Z" fill="#FBBF24" />
          </svg>
        </div>

        {/* Right column with multi-step form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{steps[currentStep].title}</CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renderStep()}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                onClick={currentStep === steps.length - 1 ? handleFormSubmit : handleNext}
              >
                {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin'/> : (currentStep === steps.length - 1 ? "Submit" : "Next")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}