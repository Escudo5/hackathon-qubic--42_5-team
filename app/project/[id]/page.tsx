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
import { type CryptoCurrency, CURRENCIES, formatPrice } from "@/lib/currency-utils"
import { ArrowLeft, MessageSquare, FileText, Calendar, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const PROJECT_DATA = {
  id: "proj-123456",
  title: "UI/UX Design for DeFi Dashboard",
  description:
    "Complete redesign of the DeFi dashboard interface with focus on user experience and modern design principles. The project includes wireframing, prototyping, and final design deliverables.",
  status: "in-progress",
  startDate: "2023-03-15",
  dueDate: "2023-04-15",
  price: 0.8,
  qubicPrice: 240,
  currency: "eth" as CryptoCurrency,
  provider: {
    id: "prov-789012",
    name: "DesignMaster",
    address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    avatar: "/placeholder.svg?height=100&width=100&text=DM",
  },
  client: {
    id: "client-345678",
    name: "CryptoVentures",
    address: "0x7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
    avatar: "/placeholder.svg?height=100&width=100&text=CV",
  },
  milestones: [
    {
      id: "ms-1",
      title: "Wireframes & User Flow",
      description: "Initial wireframes and user flow diagrams for the dashboard",
      amount: 0.2,
      qubicAmount: 60,
      currency: "eth",
      status: "verified",
      dueDate: "2023-03-25",
      completedDate: "2023-03-23",
      transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    {
      id: "ms-2",
      title: "Interactive Prototype",
      description: "Interactive prototype with main user journeys and interactions",
      amount: 0.3,
      qubicAmount: 90,
      currency: "eth",
      status: "in-progress",
      dueDate: "2023-04-05",
    },
    {
      id: "ms-3",
      title: "Final Design Delivery",
      description: "Final design files, assets, and design system components",
      amount: 0.3,
      qubicAmount: 90,
      currency: "eth",
      status: "pending",
      dueDate: "2023-04-15",
    },
  ] as Milestone[],
  messages: 12,
  files: 8,
  image: "/placeholder.svg?height=300&width=600&text=DeFi+Dashboard",
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState(PROJECT_DATA)
  const [isProvider, setIsProvider] = useState(true)
  const [activeCurrency, setActiveCurrency] = useState<CryptoCurrency>("eth")
  const { toast } = useToast()

  const handleCurrencyChange = (currency: CryptoCurrency) => {
    setActiveCurrency(currency)
  }

  const handleMilestoneAction = async (milestoneId: string, action: "start" | "complete" | "verify") => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedMilestones = project.milestones.map((milestone) => {
            if (milestone.id === milestoneId) {
              let updatedStatus: Milestone["status"] = milestone.status
              let completedDate: string | undefined = milestone.completedDate
              let transactionHash: string | undefined = milestone.transactionHash

              if (action === "start" && milestone.status === "pending") {
                updatedStatus = "in-progress"
              } else if (action === "complete" && milestone.status === "in-progress") {
                updatedStatus = "completed"
                completedDate = new Date().toISOString().split("T")[0]
              } else if (action === "verify" && milestone.status === "completed") {
                updatedStatus = "verified"
                transactionHash = `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`
              }

              return {
                ...milestone,
                status: updatedStatus,
                completedDate,
                transactionHash,
              }
            }
            return milestone
          })

          setProject((prev) => ({
            ...prev,
            milestones: updatedMilestones,
          }))

          resolve()
        } catch (error) {
          reject(error)
        }
      }, 1000)
    })
  }

  const completedMilestones = project.milestones.filter((m) => m.status === "verified").length
  const totalMilestones = project.milestones.length
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100) || 0

  const calculateDaysRemaining = () => {
    const today = new Date()
    const dueDate = new Date(project.dueDate)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = calculateDaysRemaining()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-black">
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo />
          <div className="flex items-center gap-4">
            <CurrencyToggle onChange={handleCurrencyChange} value={activeCurrency} />
            <ThemeToggle />
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard">
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
              <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
              <Badge
                className={`${project.status === "completed" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : project.status === "in-progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"}`}
              >
                {project.status === "completed"
                  ? "Completed"
                  : project.status === "in-progress"
                    ? "In Progress"
                    : "Pending"}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>
                Started: {project.startDate} • Due: {project.dueDate}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden mb-6 border-green-100 dark:border-gray-800">
              <div className="relative aspect-video">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
            </Card>

            <Tabs defaultValue="milestones" className="mb-8">
              <TabsList className="bg-white/50 dark:bg-black/30 p-1 rounded-full w-full max-w-md border border-green-100 dark:border-gray-800">
                <TabsTrigger
                  value="overview"
                  className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="milestones"
                  className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Milestones
                </TabsTrigger>
                <TabsTrigger
                  value="files"
                  className="rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Files
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-green-100 dark:border-gray-800 mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-green-700 dark:text-green-300">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{project.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{project.startDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Due Date</p>
                        <p className="font-medium">{project.dueDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <div className="font-medium flex items-center gap-1">
                          <CryptoIcon currency={activeCurrency} className={CURRENCIES[activeCurrency].color} />
                          <span>{formatPrice(project.price, activeCurrency)}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="font-medium">{progressPercentage}% Complete</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-100 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-green-700 dark:text-green-300">Provider</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={project.provider.avatar} alt={project.provider.name} />
                          <AvatarFallback className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
                            {project.provider.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{project.provider.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.provider.address.substring(0, 6)}...
                            {project.provider.address.substring(project.provider.address.length - 4)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-100 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-green-700 dark:text-green-300">Client</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={project.client.avatar} alt={project.client.name} />
                          <AvatarFallback className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
                            {project.client.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{project.client.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.client.address.substring(0, 6)}...
                            {project.client.address.substring(project.client.address.length - 4)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="milestones" className="mt-6">
                <MilestoneTimeline
                  milestones={project.milestones}
                  projectId={project.id}
                  isProvider={isProvider}
                  onMilestoneAction={handleMilestoneAction}
                  activeCurrency={activeCurrency}
                />
              </TabsContent>

              <TabsContent value="files" className="mt-6">
                <Card className="border-green-100 dark:border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-green-700 dark:text-green-300">Project Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">wireframes.pdf</h4>
                            <p className="text-xs text-muted-foreground">Uploaded on Mar 23, 2023</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">prototype-v1.fig</h4>
                            <p className="text-xs text-muted-foreground">Uploaded on Apr 2, 2023</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          Download
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full border-dashed">
                        Upload New File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-24 border-green-100 dark:border-gray-800 shadow-lg bg-white/80 dark:bg-black/30 backdrop-blur-sm mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">Project Status</h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {completedMilestones} of {totalMilestones} milestones
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Due in {daysRemaining} days</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-green-100 dark:bg-gray-800 my-2"></div>

                  <div className="space-y-3">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </Button>

                    {isProvider ? (
                      <Button
                        variant="outline"
                        className="w-full border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50"
                      >
                        Upload Deliverable
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50"
                      >
                        Review Deliverable
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-100 dark:border-gray-800 bg-white/80 dark:bg-black/30 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-700 dark:text-green-300">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Milestone completed:</span> Wireframes & User Flow
                      </p>
                      <p className="text-xs text-muted-foreground">Mar 23, 2023</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">File uploaded:</span> wireframes.pdf
                      </p>
                      <p className="text-xs text-muted-foreground">Mar 23, 2023</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">New message</span> from CryptoVentures
                      </p>
                      <p className="text-xs text-muted-foreground">Mar 22, 2023</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Milestone started:</span> Interactive Prototype
                      </p>
                      <p className="text-xs text-muted-foreground">Mar 20, 2023</p>
                    </div>
                  </div>
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

