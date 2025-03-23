export type CryptoCurrency = "eth" | "qubic" | "sol" | "matic" | "avax" | "usdc"

export interface CurrencyInfo {
  name: string
  symbol: string
  icon: string
  color: string
  darkColor: string
}

// Update the CURRENCIES object to highlight Qubic
export const CURRENCIES: Record<CryptoCurrency, CurrencyInfo> = {
  eth: {
    name: "Ethereum",
    symbol: "ETH",
    icon: "ethereum",
    color: "text-blue-600 dark:text-blue-400",
    darkColor: "text-blue-400",
  },
  qubic: {
    name: "Qubic",
    symbol: "QBC",
    icon: "qubic",
    color: "text-qubic dark:text-qubic-light",
    darkColor: "text-qubic-light",
  },
  sol: {
    name: "Solana",
    symbol: "SOL",
    icon: "solana",
    color: "text-purple-600 dark:text-purple-400",
    darkColor: "text-purple-400",
  },
  matic: {
    name: "Polygon",
    symbol: "MATIC",
    icon: "polygon",
    color: "text-indigo-600 dark:text-indigo-400",
    darkColor: "text-indigo-400",
  },
  avax: {
    name: "Avalanche",
    symbol: "AVAX",
    icon: "avalanche",
    color: "text-red-600 dark:text-red-400",
    darkColor: "text-red-400",
  },
  usdc: {
    name: "USD Coin",
    symbol: "USDC",
    icon: "usdc",
    color: "text-blue-500 dark:text-blue-300",
    darkColor: "text-blue-300",
  },
}

// Update the exchange rates to prioritize Qubic
export const EXCHANGE_RATES: Record<CryptoCurrency, number> = {
  eth: 1,
  qubic: 300, // 1 ETH = 300 QBC
  sol: 15, // 1 ETH = 15 SOL
  matic: 600, // 1 ETH = 600 MATIC
  avax: 30, // 1 ETH = 30 AVAX
  usdc: 3000, // 1 ETH = 3000 USDC
}

export function convertPrice(amount: number, fromCurrency: CryptoCurrency, toCurrency: CryptoCurrency): number {
  if (fromCurrency === toCurrency) return amount

  // Convert to ETH first (as base currency)
  const amountInEth = fromCurrency === "eth" ? amount : amount / EXCHANGE_RATES[fromCurrency]

  // Convert from ETH to target currency
  return toCurrency === "eth" ? amountInEth : amountInEth * EXCHANGE_RATES[toCurrency]
}

export function formatPrice(amount: number, currency: CryptoCurrency): string {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: currency === "eth" ? 4 : 2,
  })

  return `${formatter.format(amount)} ${CURRENCIES[currency].symbol}`
}

export function parsePrice(priceString: string): { amount: number; currency: CryptoCurrency } {
  const parts = priceString.trim().split(" ")
  if (parts.length !== 2) {
    throw new Error(`Invalid price format: ${priceString}`)
  }

  const amount = Number.parseFloat(parts[0].replace(/,/g, ""))
  const currencySymbol = parts[1].toUpperCase()

  let currency: CryptoCurrency | undefined

  for (const [key, info] of Object.entries(CURRENCIES)) {
    if (info.symbol.toUpperCase() === currencySymbol) {
      currency = key as CryptoCurrency
      break
    }
  }

  if (!currency) {
    throw new Error(`Unknown currency symbol: ${currencySymbol}`)
  }

  return { amount, currency }
}

// Add a function to directly convert between ETH and Qubic
export function ethToQubic(ethAmount: number): number {
  return ethAmount * EXCHANGE_RATES.qubic
}

export function qubicToEth(qubicAmount: number): number {
  return qubicAmount / EXCHANGE_RATES.qubic
}

