"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CryptoIcon } from "@/components/crypto-icon"
import { type CryptoCurrency, CURRENCIES } from "@/lib/currency-utils"
import { Sliders, Star } from "lucide-react"

interface FilterDialogProps {
  onFilterChange: (filters: FilterOptions) => void
  initialFilters?: FilterOptions
}

export interface FilterOptions {
  currencies: CryptoCurrency[]
  priceRange: [number, number]
  categories: string[]
  rating: number
}

const CATEGORIES = ["Design", "Development", "Marketing", "Writing", "Consulting", "Other"]

export function FilterDialog({ onFilterChange, initialFilters }: FilterDialogProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>(
    initialFilters || {
      currencies: ["eth", "qubic", "sol", "matic", "avax", "usdc"],
      priceRange: [0, 5],
      categories: [...CATEGORIES],
      rating: 0,
    },
  )

  const handleCurrencyToggle = (currency: CryptoCurrency) => {
    setFilters((prev) => {
      if (prev.currencies.includes(currency)) {
        return {
          ...prev,
          currencies: prev.currencies.filter((c) => c !== currency),
        }
      } else {
        return {
          ...prev,
          currencies: [...prev.currencies, currency],
        }
      }
    })
  }

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        }
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        }
      }
    })
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]],
    }))
  }

  const handleRatingChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      rating: value[0],
    }))
  }

  const handleApplyFilters = () => {
    onFilterChange(filters)
    setOpen(false)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      currencies: ["eth", "qubic", "sol", "matic", "avax", "usdc"],
      priceRange: [0, 5],
      categories: [...CATEGORIES],
      rating: 0,
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="btn-secondary flex gap-2 relative">
          <Sliders className="h-4 w-4" />
          Filters
          {(filters.currencies.length < 6 ||
            filters.categories.length < CATEGORIES.length ||
            filters.rating > 0 ||
            filters.priceRange[0] > 0 ||
            filters.priceRange[1] < 5) && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Filter Services</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h4 className="font-medium mb-3">Payment Currencies</h4>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(CURRENCIES) as CryptoCurrency[]).map((currency) => (
                <div key={currency} className="flex items-center space-x-2">
                  <Checkbox
                    id={`currency-${currency}`}
                    checked={filters.currencies.includes(currency)}
                    onCheckedChange={() => handleCurrencyToggle(currency)}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <Label htmlFor={`currency-${currency}`} className="flex items-center gap-1.5 cursor-pointer">
                    <CryptoIcon currency={currency} className={CURRENCIES[currency].color} />
                    <span>{CURRENCIES[currency].symbol}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Price Range (ETH)</h4>
            <div className="px-2">
              <Slider
                defaultValue={filters.priceRange}
                min={0}
                max={5}
                step={0.1}
                onValueChange={handlePriceChange}
                className="[&>span]:bg-green-500"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.priceRange[0]} ETH</span>
                <span>{filters.priceRange[1]} ETH</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Minimum Rating</h4>
            <div className="px-2">
              <Slider
                defaultValue={[filters.rating]}
                min={0}
                max={5}
                step={0.5}
                onValueChange={handleRatingChange}
                className="[&>span]:bg-green-500"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Any</span>
                <div className="flex items-center">
                  <span>{filters.rating}</span>
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <Label htmlFor={`category-${category}`} className="cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={handleApplyFilters} className="w-full bg-green-500 hover:bg-green-600 text-white">
          Apply Filters
        </Button>
      </DialogContent>
    </Dialog>
  )
}

