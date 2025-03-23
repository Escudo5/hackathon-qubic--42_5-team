import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnect } from "@/components/wallet-connect"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Clock, CreditCard, FileText, MessageSquare, Plus, Settings, Star, User } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your services and transactions</p>
        </div>
        <WalletConnect />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.35 ETH</div>
            <p className="text-xs text-muted-foreground">+0.5 ETH from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 pending completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9/5.0</div>
            <p className="text-xs text-muted-foreground">Based on 27 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="mb-8">
        <TabsList>
          <TabsTrigger value="services">My Services</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Listed Services</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Service
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Contract Development</CardTitle>
                <CardDescription>Secure and optimized smart contract development for your dApp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <Badge>2.0 ETH</Badge>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>4.9 (37)</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Created: March 15, 2023</p>
                  <p>Orders: 37 completed</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Pause
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blockchain Consulting</CardTitle>
                <CardDescription>Expert advice on blockchain implementation and tokenomics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <Badge>1.5 ETH</Badge>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>5.0 (12)</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Created: April 2, 2023</p>
                  <p>Orders: 12 completed</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Pause
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Active Orders</h2>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium mb-1">UI/UX Design</h3>
                    <p className="text-sm text-muted-foreground mb-2">From: 0x1a2b...3c4d</p>
                    <Badge variant="outline" className="mb-2">
                      In Progress
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Due in 3 days</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <div className="font-medium">0.5 ETH</div>
                      <div className="text-sm text-muted-foreground">Ordered: Mar 18, 2023</div>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button size="sm">Deliver</Button>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Content Writing</h3>
                    <p className="text-sm text-muted-foreground mb-2">From: 0x5e6f...7g8h</p>
                    <Badge variant="outline" className="mb-2">
                      Revision Requested
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Due in 1 day</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div>
                      v className="text-right">
                      <div className="font-medium">0.3 ETH</div>
                      <div className="text-sm text-muted-foreground">Ordered: Mar 20, 2023</div>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button size="sm">Submit Revision</Button>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Transaction</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">
                        <div className="font-medium">Payment Received</div>
                        <div className="text-sm text-muted-foreground">From: 0x9i0j...1k2l</div>
                      </td>
                      <td className="p-4">0.5 ETH</td>
                      <td className="p-4">Mar 21, 2023</td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Confirmed
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">
                        <div className="font-medium">Payment Sent</div>
                        <div className="text-sm text-muted-foreground">To: 0x3m4n...5o6p</div>
                      </td>
                      <td className="p-4">0.8 ETH</td>
                      <td className="p-4">Mar 18, 2023</td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Confirmed
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">
                        <div className="font-medium">Payment Received</div>
                        <div className="text-sm text-muted-foreground">From: 0x7q8r...9s0t</div>
                      </td>
                      <td className="p-4">1.2 ETH</td>
                      <td className="p-4">Mar 15, 2023</td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Confirmed
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        <div className="font-medium">Escrow Release</div>
                        <div className="text-sm text-muted-foreground">From: Contract</div>
                      </td>
                      <td className="p-4">2.0 ETH</td>
                      <td className="p-4">Mar 10, 2023</td>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Confirmed
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription>Your marketplace activity for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center border-b">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">New Orders</span>
                  <span className="text-2xl font-bold">5</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Earnings</span>
                  <span className="text-2xl font-bold">2.5 ETH</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Avg. Rating</span>
                  <span className="text-2xl font-bold">4.9</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

