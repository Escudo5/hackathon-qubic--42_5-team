"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock } from "lucide-react"
import { CryptoIcon } from "@/components/crypto-icon"
import { type CryptoCurrency, CURRENCIES, convertPrice, formatPrice } from "@/lib/currency-utils"
import { MilestonePreview, type MilestonePreviewItem } from "@/components/milestone-preview"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ServiceCardProps {
  title: string
  description: string
  price: {
    eth: number
    qubic?: number
    currency?: CryptoCurrency
  }
  provider: string
  providerName?: string
  providerAvatar?: string
  rating: number
  reviews: number
  image: string
  deliveryTime?: string
  category?: string
  color?: "green" | "teal" | "emerald" | "lime"
  activeCurrency: CryptoCurrency
  milestones?: MilestonePreviewItem[]
}

export function ServiceCard({
  title,
  description,
  price,
  provider,
  providerName,
  providerAvatar,
  rating,
  reviews,
  image,
  deliveryTime,
  category,
  color = "green",
  activeCurrency,
  milestones = [],
}: ServiceCardProps) {
  const formatProvider = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  let convertedPrice: number

  if (activeCurrency === "qubic" && price.qubic) {
    convertedPrice = price.qubic
  } else {
    convertedPrice = convertPrice(price.eth, "eth", activeCurrency)
  }

  const formattedPrice = formatPrice(convertedPrice, activeCurrency)

  return (
    <Card className="overflow-hidden border border-green-100 dark:border-green-800 group h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={300}
          className="object-cover w-full h-full"
        />
        {category && <Badge className="absolute top-3 left-3">{category}</Badge>}
      </div>
      <CardContent className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="flex items-center gap-1">
            <CryptoIcon currency={activeCurrency} className={CURRENCIES[activeCurrency].color} />
            <Badge variant="outline">{formattedPrice}</Badge>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
            <span>
              {rating} ({reviews})
            </span>
          </span>
          {deliveryTime && (
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {deliveryTime}
            </span>
          )}
        </div>

        {milestones && milestones.length > 0 && (
          <MilestonePreview milestones={milestones} activeCurrency={activeCurrency} />
        )}
      </CardContent>
      <CardFooter className="p-5 pt-0 flex flex-col gap-3 mt-auto">
        <div className="w-full h-px bg-green-100 dark:bg-green-800"></div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={providerAvatar} alt={providerName || provider} />
              <AvatarFallback className="bg-green-100 dark:bg-green-800 text-xs font-medium text-green-700 dark:text-green-300">
                {(providerName || provider).substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{providerName || formatProvider(provider)}</span>
              {providerName && <span className="text-xs text-muted-foreground">{formatProvider(provider)}</span>}
            </div>
          </div>
          <Link href={`/service/${encodeURIComponent(title)}`} className="w-auto">
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

