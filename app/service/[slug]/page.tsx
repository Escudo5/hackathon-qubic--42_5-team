"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnect } from "@/components/wallet-connect"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { CurrencyToggle } from "@/components/currency-toggle"
import { CryptoIcon } from "@/components/crypto-icon"
import { MilestoneTimeline, type Milestone } from "@/components/milestone-timeline"
import { type CryptoCurrency, CURRENCIES, convertPrice, formatPrice } from "@/lib/currency-utils"
import { Star, ArrowLeft, Clock, MessageSquare, CheckCircle, Share2, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [currency, setCurrency] = useState<CryptoCurrency>("eth")
  const { toast } = useToast()

  const service = {
    title: decodeURIComponent(params.slug),
    description:
      "Professional UI/UX design services for web and mobile applications. I specialize in creating intuitive, user-friendly interfaces that enhance user experience and drive engagement. With over 5 years of experience in the field, I've worked with startups and established companies alike to deliver exceptional design solutions.",
    price: {
      eth: 0.5,
      qubic: 150,
    },
    provider: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    providerName: "DesignMaster",
    providerAvatar: "/placeholder.svg?height=100&width=100&text=DM",
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=300&width=600&text=UI/UX+Design",
    deliveryTime: "5 days",
    revisions: "Unlimited",
    completedProjects: 87,
    category: "Design",
    milestones: [
      {
        id: "ms-1",
        title: "Initial Wireframes",
        description: "Delivery of initial wireframes and user flow diagrams",
        amount: 0.15,
        qubicAmount: 45,
        currency: "eth",
        status: "pending",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
      {
        id: "ms-2",
        title: "UI Design Mockups",
        description: "High-fidelity mockups of all screens and components",
        amount: 0.2,
        qubicAmount: 60,
        currency: "eth",
        status: "pending",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
      {
        id: "ms-3",
        title: "Final Delivery & Assets",
        description: "Final design files, assets, and design system components",
        amount: 0.15,
        qubicAmount: 45,
        currency: "eth",
        status: "pending",
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    ] as Milestone[],
  }

  const handleCurrencyChange = (newCurrency: CryptoCurrency) => {
    setCurrency(newCurrency)
  }

  const convertedPrice = convertPrice(service.price.eth, "eth", currency)
  const formattedPrice = formatPrice(convertedPrice, currency)

  const serviceFee = service.price.eth * 0.1
  const convertedServiceFee = convertPrice(serviceFee, "eth", currency)
  const formattedServiceFee = formatPrice(convertedServiceFee, currency)

  const total = service.price.eth + serviceFee
  const convertedTotal = convertPrice(total, "eth", currency)
  const formattedTotal = formatPrice(convertedTotal, currency)

  const handleMilestoneAction = async (milestoneId: string, action: "start" | "complete" | "verify") => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast({
          title: "Smart Contract Interaction",
          description: `This would trigger a blockchain transaction to ${action} milestone ${milestoneId}`,
        })
        resolve()
      }, 1000)
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-black">
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo />
          <div className="flex items-center gap-4">
            <CurrencyToggle onChange={handleCurrencyChange} value={currency} />
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-green-100 dark:hover:bg-green-800/50 hover:text-green-700 dark:hover:text-green-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{service.title}</h1>
              <Badge className="badge-primary">{service.category}</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              <span>
                {service.rating} ({service.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden mb-6 border-green-100 dark:border-gray-800">
              <div className="relative aspect-video">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              </div>
            </Card>

            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="bg-white/50 dark:bg-black/30 p-1 rounded-full w-full max-w-md border border-green-100 dark:border-gray-800">
                <TabsTrigger
                  value="description"
                  className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="milestones"
                  className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Milestones
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Reviews ({service.reviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <h2 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300">About This Service</h2>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <h3 className="text-lg font-medium mb-3 text-green-700 dark:text-green-300">What's Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="border-green-100 dark:border-gray-800 bg-white/50 dark:bg-black/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Custom UI Design</h4>
                          <p className="text-sm text-muted-foreground">
                            Tailored interfaces for web or mobile applications
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-100 dark:border-gray-800 bg-white/50 dark:bg-black/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">UX Optimization</h4>
                          <p className="text-sm text-muted-foreground">Enhance user experience and engagement</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-100 dark:border-gray-800 bg-white/50 dark:bg-black/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Interactive Prototypes</h4>
                          <p className="text-sm text-muted-foreground">
                            Functional prototypes for testing and feedback
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-100 dark:border-gray-800 bg-white/50 dark:bg-black/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Design System</h4>
                          <p className="text-sm text-muted-foreground">Comprehensive design system for consistency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" className="btn-secondary flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Service
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="milestones" className="mt-6">
                <Card className="border-green-100 dark:border-gray-800 mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-green-700 dark:text-green-300">Project Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                        Milestone-Based Payment
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        This service uses milestone-based payments secured by smart contracts. Funds are held in escrow
                        and released only when each milestone is completed and verified. This ensures both parties are
                        protected throughout the project.
                      </p>
                    </div>

                    <MilestoneTimeline
                      milestones={service.milestones}
                      projectId="preview"
                      isProvider={false}
                      onMilestoneAction={handleMilestoneAction}
                      activeCurrency={currency}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(service.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{service.rating}</span>
                  <span className="text-muted-foreground ml-1">({service.reviews} reviews)</span>
                </div>

                <div className="space-y-4">
                  <Card className="border-green-100 dark:border-gray-800 bg-white/50 dark:bg-black/30">
                    <CardContent className="p-5">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/placeholder.svg?height=100&width=100&text=JD" alt="John D." />
                            <AvatarFallback className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-green-700 dark:text-green-300">John D.</div>
                            <div className="text-xs text-muted-foreground">March 15, 2023</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Excellent work! The designs were exactly what I was looking for and the communication was great
                        throughout the process.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-green-100 dark:border-gray-800 bg-white/50 dark:bg-black/30">
                    <CardContent className="p-5">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/placeholder.svg?height=100&width=100&text=SM" alt="Sarah M." />
                            <AvatarFallback className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
                              SM
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-green-700 dark:text-green-300">Sarah M.</div>
                            <div className="text-xs text-muted-foreground">March 10, 2023</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Very professional and delivered on time. Would definitely work with again.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-24 border-green-100 dark:border-gray-800 shadow-lg bg-white/80 dark:bg-black/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <CryptoIcon currency={currency} className={CURRENCIES[currency].color} />
                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">{formattedPrice}</h2>
                  </div>
                  <Badge variant="outline" className={currency === "eth" ? "badge-primary" : "badge-secondary"}>
                    Fixed Price
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    <span className="text-sm">Delivery in {service.deliveryTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    <span className="text-sm">{service.revisions} revisions</span>
                  </div>

                  <div className="w-full h-px bg-green-100 dark:bg-gray-800"></div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Service Fee:</span>
                    <span className="text-sm">{formattedServiceFee}</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span>Total:</span>
                    <span>{formattedTotal}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Select Payment Currency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(CURRENCIES) as CryptoCurrency[]).map((currencyKey) => (
                      <Button
                        key={currencyKey}
                        variant="outline"
                        size="sm"
                        className={`flex items-center justify-center gap-1 ${
                          currency === currencyKey
                            ? "bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700"
                            : "border-green-100 dark:border-gray-800"
                        }`}
                        onClick={() => handleCurrencyChange(currencyKey)}
                      >
                        <CryptoIcon currency={currencyKey} size="sm" className={CURRENCIES[currencyKey].color} />
                        <span className="text-xs">{CURRENCIES[currencyKey].symbol}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full mb-3 bg-green-500 hover:bg-green-600 text-white rounded-full">
                  Hire Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50 rounded-full"
                >
                  Contact Provider
                </Button>

                <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-center text-muted-foreground">
                  <p>Payment is secured by smart contract escrow</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 bg-white/80 dark:bg-black/80 backdrop-blur-md mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <p>© 2023 SkillChain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

