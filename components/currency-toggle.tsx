"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { CryptoIcon } from "@/components/crypto-icon"
import { type CryptoCurrency, CURRENCIES } from "@/lib/currency-utils"
import { ChevronDown } from "lucide-react"

interface CurrencyToggleProps {
  onChange?: (currency: CryptoCurrency) => void
  value?: CryptoCurrency
}

// Update the CurrencyToggle to prioritize Qubic
export function CurrencyToggle({ onChange, value = "qubic" }: CurrencyToggleProps) {
  const [currency, setCurrency] = useState<CryptoCurrency>(value)

  const handleCurrencyChange = (newCurrency: CryptoCurrency) => {
    setCurrency(newCurrency)
    onChange?.(newCurrency)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/30 backdrop-blur-sm hover:bg-green-50 dark:hover:bg-green-800/50"
        >
          <CryptoIcon currency={currency} className={CURRENCIES[currency].color} />
          <span className={`text-sm font-medium ${CURRENCIES[currency].color}`}>{CURRENCIES[currency].symbol}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Show Qubic first */}
        <DropdownMenuItem className="cursor-pointer" onClick={() => handleCurrencyChange("qubic")}>
          <div className="flex items-center gap-2">
            <CryptoIcon currency="qubic" className={CURRENCIES["qubic"].color} />
            <span className={`${CURRENCIES["qubic"].color} font-medium`}>{CURRENCIES["qubic"].symbol}</span>
            <span className="text-muted-foreground text-xs ml-1">{CURRENCIES["qubic"].name}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Then show other currencies */}
        {(Object.keys(CURRENCIES) as CryptoCurrency[])
          .filter((currencyKey) => currencyKey !== "qubic")
          .map((currencyKey) => (
            <DropdownMenuItem
              key={currencyKey}
              className="cursor-pointer"
              onClick={() => handleCurrencyChange(currencyKey)}
            >
              <div className="flex items-center gap-2">
                <CryptoIcon currency={currencyKey} className={CURRENCIES[currencyKey].color} />
                <span className={`${CURRENCIES[currencyKey].color} font-medium`}>{CURRENCIES[currencyKey].symbol}</span>
                <span className="text-muted-foreground text-xs ml-1">{CURRENCIES[currencyKey].name}</span>
              </div>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

