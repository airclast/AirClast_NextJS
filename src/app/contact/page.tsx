"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Footer from "@/components/footer"
import { Header } from "@/components/header"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)

    // Show success message (you could use a toast here)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen weather-gradient">
      <Header />

      <div className="max-w-6xl mx-auto px-4 pt-18 pb-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold  mb-4">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions about our weather platform? Need technical support? We'd love to hear from you and help with
            your weather intelligence needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className=" backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold  mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium  mb-1">Address</h3>
                    <p className=" text-sm leading-relaxed">
                      123 Weather Ave
                      <br />
                      Seattle, WA 98101
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium  mb-1">Phone</h3>
                    <p className=" text-sm">+1 (555) 123-WEATHER</p>
                    <p className=" text-sm">+1 (555) 123-9328437</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium  mb-1">Email</h3>
                    <p className=" text-sm">support@skyweather.com</p>
                    <p className=" text-sm">info@skyweather.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium  mb-1">Business Hours</h3>
                    <p className=" text-sm">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                    <p className=" text-sm">Weekend: Emergency support only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" backdrop-blur-sm rounded-xl p-6  shadow-sm">
              <h3 className="font-semibold  mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/about" className="block hover:text-blue-400 transition-colors text-sm">
                  About SKY Guard Weather
                </Link>
                <Link href="#" className="block hover:text-blue-400 transition-colors text-sm">
                  API Documentation
                </Link>
                <Link href="#" className="block hover:text-blue-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="block hover:text-blue-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className=" backdrop-blur-sm rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold  mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className=" shadow-sm   focus:border-blue-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className=" shadow-sm  focus:border-blue-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className=" shadow-sm  text-slate-400 focus:border-blue-400"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className=" shadow-sm  text-slate-400 focus:border-blue-400 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700  font-medium py-3 weather-button"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <p className="text-slate-400 text-sm text-center">
                  We typically respond within 24 hours during business days. For urgent technical issues, please call
                  our support line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
