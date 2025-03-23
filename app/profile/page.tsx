import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WalletConnect } from "@/components/wallet-connect"
import { ServiceCard } from "@/components/service-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Edit, MapPin, Calendar, ExternalLink } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your public profile and settings</p>
        </div>
        <WalletConnect />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">DesignMaster</h2>
                <p className="text-sm text-muted-foreground mb-2">0x1a2b...3c4d</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>4.9 (37 reviews)</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Member since Jan 2023</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">
                    portfolio.eth
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="services">
            <TabsList className="mb-6">
              <TabsTrigger value="services">My Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="services">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ServiceCard
                  title="Smart Contract Development"
                  description="Secure and optimized smart contract development for your dApp"
                  price="2.0 ETH"
                  provider="0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"
                  rating={4.9}
                  reviews={37}
                  image="/placeholder.svg?height=200&width=400"
                />
                <ServiceCard
                  title="Blockchain Consulting"
                  description="Expert advice on blockchain implementation and tokenomics"
                  price="1.5 ETH"
                  provider="0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p"
                  rating={5.0}
                  reviews={12}
                  image="/placeholder.svg?height=200&width=400"
                />
              </div>

              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Add New Service
              </Button>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Reviews Summary</CardTitle>
                  <CardDescription>Overall rating based on 37 reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold">4.9</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-16">5 stars</div>
                      <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[90%]"></div>
                      </div>
                      <div className="text-sm w-8">90%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-16">4 stars</div>
                      <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[10%]"></div>
                      </div>
                      <div className="text-sm w-8">10%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-16">3 stars</div>
                      <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[0%]"></div>
                      </div>
                      <div className="text-sm w-8">0%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-16">2 stars</div>
                      <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[0%]"></div>
                      </div>
                      <div className="text-sm w-8">0%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm w-16">1 star</div>
                      <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-yellow-400 w-[0%]"></div>
                      </div>
                      <div className="text-sm w-8">0%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">John D.</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">For: Smart Contract Development</p>
                    <p className="text-sm">
                      Excellent work! The smart contract was well-optimized and secure. Documentation was thorough and
                      the developer was very responsive throughout the process.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">March 15, 2023</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">Sarah M.</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">For: Blockchain Consulting</p>
                    <p className="text-sm">
                      Very professional and delivered great insights for our project. The tokenomics model was exactly
                      what we needed.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">February 28, 2023</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your public profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" defaultValue="DesignMaster" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website/Portfolio</Label>
                    <Input id="website" defaultValue="portfolio.eth" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      defaultValue="Experienced blockchain developer specializing in smart contract development and DeFi applications. Over 5 years of experience in the Web3 space."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="contact@designmaster.eth" />
                    <p className="text-xs text-muted-foreground">Used for notifications only, not publicly visible</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Notification Preferences</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="newOrder" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="newOrder" className="text-sm font-normal">
                        New order notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="messages" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="messages" className="text-sm font-normal">
                        Message notifications
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="reviews" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="reviews" className="text-sm font-normal">
                        Review notifications
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

