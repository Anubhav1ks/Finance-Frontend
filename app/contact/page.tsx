"use client"

import type React from "react"

import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C59D5F10_1px,transparent_1px),linear-gradient(to_bottom,#C59D5F10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">Get in Touch</h1>
            <p className="text-base md:text-lg lg:text-xl text-primary-foreground/80 text-pretty leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-4 md:space-y-6">
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Email Us</h3>
                        <p className="text-xs md:text-sm text-muted-foreground break-all">info@financehub.com</p>
                        <p className="text-xs md:text-sm text-muted-foreground break-all">support@financehub.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Call Us</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">+44 20 1234 5678</p>
                        <p className="text-xs md:text-sm text-muted-foreground">Mon-Fri, 9am-6pm GMT</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Visit Us</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">123 Finance Street</p>
                        <p className="text-xs md:text-sm text-muted-foreground">London, EC2A 4BX</p>
                        <p className="text-xs md:text-sm text-muted-foreground">United Kingdom</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl md:text-2xl">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm md:text-base">
                            Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="text-sm md:text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm md:text-base">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="text-sm md:text-base"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm md:text-base">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          placeholder="What is this regarding?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="text-sm md:text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm md:text-base">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="resize-none text-sm md:text-base"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
                        disabled={submitted}
                      >
                        {submitted ? (
                          "Message Sent!"
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>

                      {submitted && (
                        <p className="text-sm text-green-600">
                          Thank you for your message! We'll get back to you soon.
                        </p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Find Us</h2>
            <div className="bg-background rounded-lg overflow-hidden shadow-lg h-64 md:h-96 flex items-center justify-center">
              <p className="text-muted-foreground text-sm md:text-base">
                Map placeholder - 123 Finance Street, London, EC2A 4BX
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
