"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoIcon } from "@/components/crypto-icon"
import { type CryptoCurrency, CURRENCIES } from "@/lib/currency-utils"
import { PlusCircle, Upload, Check, ArrowRight, ArrowLeft } from "lucide-react"
import { MilestoneEditor, type MilestoneInput } from "@/components/milestone-editor"
import { v4 as uuidv4 } from "uuid"

interface PublishServiceDialogProps {
  trigger?: React.ReactNode
}

export function PublishServiceDialog({ trigger }: PublishServiceDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "eth" as CryptoCurrency,
    deliveryTime: "",
    image: null as File | null,
    milestones: [] as MilestoneInput[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleMilestonesChange = (milestones: MilestoneInput[]) => {
    setFormData((prev) => ({ ...prev, milestones }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        setOpen(false)
        setActiveTab("details")
        setFormData({
          title: "",
          description: "",
          category: "",
          price: "",
          currency: "eth",
          deliveryTime: "",
          image: null,
          milestones: [],
        })
      }, 2000)
    }, 1500)
  }

  const initializeMilestones = () => {
    if (formData.milestones.length === 0 && formData.price) {
      const price = Number.parseFloat(formData.price)
      if (!isNaN(price)) {
        // Create a default milestone with the full price
        const defaultMilestone: MilestoneInput = {
          id: uuidv4(),
          title: "Complete Project Delivery",
          description: "Final delivery of all project requirements",
          amount: price,
        }
        setFormData((prev) => ({ ...prev, milestones: [defaultMilestone] }))
      }
    }
    setActiveTab("milestones")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="btn-primary flex gap-2">
            <PlusCircle className="h-4 w-4" />
            Publish Service
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isSuccess ? "Service Published Successfully!" : "Publish a New Service"}</DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your service has been published!</h3>
            <p className="text-muted-foreground text-center mb-6">
              Your service is now live and available for clients to discover.
            </p>
            <Button onClick={() => setOpen(false)} className="bg-green-500 hover:bg-green-600 text-white">
              Done
            </Button>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="details">Service Details</TabsTrigger>
              <TabsTrigger value="milestones" disabled={!formData.price}>
                Milestones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <form className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Professional UI/UX Design"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="glass-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your service in detail..."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="glass-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger id="category" className="glass-input">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Writing">Writing</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryTime">Delivery Time</Label>
                    <Select
                      value={formData.deliveryTime}
                      onValueChange={(value) => handleSelectChange("deliveryTime", value)}
                      required
                    >
                      <SelectTrigger id="deliveryTime" className="glass-input">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 day">1 day</SelectItem>
                        <SelectItem value="3 days">3 days</SelectItem>
                        <SelectItem value="5 days">5 days</SelectItem>
                        <SelectItem value="7 days">7 days</SelectItem>
                        <SelectItem value="14 days">14 days</SelectItem>
                        <SelectItem value="30 days">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="e.g., 0.5"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="glass-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => handleSelectChange("currency", value as CryptoCurrency)}
                      required
                    >
                      <SelectTrigger id="currency" className="glass-input">
                        <SelectValue placeholder="Select currency">
                          <div className="flex items-center gap-2">
                            <CryptoIcon currency={formData.currency} className={CURRENCIES[formData.currency].color} />
                            <span>{CURRENCIES[formData.currency].symbol}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(CURRENCIES) as CryptoCurrency[]).map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            <div className="flex items-center gap-2">
                              <CryptoIcon currency={currency} className={CURRENCIES[currency].color} />
                              <span>{CURRENCIES[currency].symbol}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Service Image</Label>
                  <div className="border border-dashed rounded-lg p-6 text-center glass-input">
                    {formData.image ? (
                      <div className="flex flex-col items-center">
                        <div className="w-full h-40 relative mb-2">
                          <img
                            src={URL.createObjectURL(formData.image) || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">{formData.image.name}</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                        >
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 2MB)</p>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={initializeMilestones}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                    disabled={!formData.price}
                  >
                    Continue to Milestones
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="milestones">
              <div className="space-y-6 py-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Set Project Milestones</h3>
                  <p className="text-sm text-muted-foreground">
                    Break down your service into milestones. Each milestone will release a portion of the payment when
                    completed and verified by the client.
                  </p>
                </div>

                <MilestoneEditor
                  milestones={formData.milestones}
                  onChange={handleMilestonesChange}
                  currency={formData.currency}
                  totalBudget={Number.parseFloat(formData.price) || 0}
                />

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("details")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Details
                  </Button>

                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white"
                    disabled={isSubmitting || formData.milestones.length === 0}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Publishing...</span>
                      </div>
                    ) : (
                      "Publish Service"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}

