"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnect } from "@/components/wallet-connect"
import { ServiceCard } from "@/components/service-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { CurrencyToggle } from "@/components/currency-toggle"
import { FilterDialog, type FilterOptions } from "@/components/filter-dialog"
import type { CryptoCurrency } from "@/lib/currency-utils"
import { Search, TrendingUp, Shield, Zap, ChevronRight } from "lucide-react"
import type { MilestonePreviewItem } from "@/components/milestone-preview"

const SERVICES = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Professional UI/UX design services for web and mobile applications",
    price: { eth: 0.5, qubic: 150 },
    provider: "0x1a2b...3c4d",
    providerName: "DesignMaster",
    providerAvatar: "/placeholder.svg?height=100&width=100&text=DM",
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=300&width=600&text=UI/UX+Design",
    deliveryTime: "5 days",
    category: "Design",
    featured: true,
    milestones: [
      {
        id: "ms-1",
        title: "Initial Wireframes",
        amount: 0.15,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
      {
        id: "ms-2",
        title: "UI Design Mockups",
        amount: 0.2,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
      {
        id: "ms-3",
        title: "Final Delivery & Assets",
        amount: 0.15,
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
    ] as MilestonePreviewItem[],
  },
  {
    id: 2,
    title: "Smart Contract Development",
    description: "Secure and optimized smart contract development for your dApp",
    price: { eth: 2.0, qubic: 600 },
    provider: "0x5e6f...7g8h",
    providerName: "CryptoDevPro",
    providerAvatar: "/placeholder.svg?height=100&width=100&text=CDP",
    rating: 4.9,
    reviews: 37,
    image: "/placeholder.svg?height=300&width=600&text=Smart+Contract+Dev",
    deliveryTime: "7 days",
    category: "Development",
    featured: true,
    milestones: [
      {
        id: "ms-1",
        title: "Requirements & Architecture",
        amount: 0.4,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
      {
        id: "ms-2",
        title: "Smart Contract Implementation",
        amount: 1.0,
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
      {
        id: "ms-3",
        title: "Testing & Audit",
        amount: 0.6,
        dueDate: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
    ] as MilestonePreviewItem[],
  },
  {
    id: 3,
    title: "Content Writing",
    description: "Engaging content for your web3 project, including whitepapers and documentation",
    price: { eth: 0.3, qubic: 90 },
    provider: "0x9i0j...1k2l",
    providerName: "CryptoWriter",
    providerAvatar: "/placeholder.svg?height=100&width=100&text=CW",
    rating: 4.7,
    reviews: 18,
    image: "/placeholder.svg?height=300&width=600&text=Content+Writing",
    deliveryTime: "3 days",
    category: "Writing",
    milestones: [
      {
        id: "ms-1",
        title: "Research & Outline",
        amount: 0.05,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
      {
        id: "ms-2",
        title: "First Draft",
        amount: 0.15,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
      {
        id: "ms-3",
        title: "Final Version & Revisions",
        amount: 0.1,
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending",
      },
    ] as MilestonePreviewItem[],
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeCurrency, setActiveCurrency] = useState<CryptoCurrency>("eth")
  const [filters, setFilters] = useState<FilterOptions>({
    currencies: ["eth", "qubic", "sol", "matic", "avax", "usdc"],
    priceRange: [0, 5],
    categories: ["Design", "Development", "Marketing", "Writing", "Consulting", "Other"],
    rating: 0,
  })
  const [filteredServices, setFilteredServices] = useState(SERVICES)
  const [featuredServices, setFeaturedServices] = useState(SERVICES.filter((service) => service.featured))

  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let result = SERVICES

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (service) => service.title.toLowerCase().includes(query) || service.description.toLowerCase().includes(query),
      )
    }

    if (activeCategory !== "all") {
      result = result.filter((service) => service.category?.toLowerCase() === activeCategory.toLowerCase())
    }

    result = result.filter(
      (service) => service.price.eth >= filters.priceRange[0] && service.price.eth <= filters.priceRange[1],
    )

    if (filters.rating > 0) {
      result = result.filter((service) => service.rating >= filters.rating)
    }

    if (!filters.currencies.includes(activeCurrency)) {
      setActiveCurrency(filters.currencies[0] || "eth")
    }

    setFilteredServices(result)
  }, [searchQuery, activeCategory, filters, activeCurrency])

  const handleCurrencyChange = (currency: CryptoCurrency) => {
    setActiveCurrency(currency)
  }

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo />
          <div className="flex items-center gap-4">
            <CurrencyToggle onChange={handleCurrencyChange} value={activeCurrency} />
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Decentralized Marketplace for Professional Services
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Connect with skilled professionals and service providers in the web3 ecosystem
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="text-lg px-8 py-6 h-auto" onClick={scrollToServices}>
                  <span>Explore Services</span>
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6 h-auto">
                  Publish Service
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-green-50/50 dark:bg-gray-900/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-muted-foreground">
                    All transactions are secured by blockchain technology, ensuring trust and transparency.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Multi-Currency Support</h3>
                  <p className="text-muted-foreground">
                    Pay with Ethereum, Solana, Polygon, Avalanche or USDC for maximum flexibility.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
                  <p className="text-muted-foreground">
                    All service providers are verified and rated by the community for quality assurance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4" ref={servicesRef}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold mb-4 md:mb-0">Explore Services</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <form onSubmit={handleSearch} className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for services..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <FilterDialog onFilterChange={handleFilterChange} initialFilters={filters} />
              </div>
            </div>

            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
              <TabsList className="w-full max-w-3xl mx-auto flex justify-between">
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="writing">Writing</TabsTrigger>
                <TabsTrigger value="consulting">Consulting</TabsTrigger>
              </TabsList>

              <TabsContent value={activeCategory} className="mt-8">
                {filteredServices.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                        provider={service.provider}
                        providerName={service.providerName}
                        providerAvatar={service.providerAvatar}
                        rating={service.rating}
                        reviews={service.reviews}
                        image={service.image}
                        deliveryTime={service.deliveryTime}
                        category={service.category}
                        activeCurrency={activeCurrency}
                        milestones={service.milestones}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No services found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveCategory("all")
                        setFilters({
                          currencies: ["eth", "qubic", "sol", "matic", "avax", "usdc"],
                          priceRange: [0, 5],
                          categories: ["Design", "Development", "Marketing", "Writing", "Consulting", "Other"],
                          rating: 0,
                        })
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2023 SkillChain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

