"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasMetaMask, setHasMetaMask] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined") {
      setHasMetaMask(!!window.ethereum && !!window.ethereum.isMetaMask)
    }
  }, [])

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!hasMetaMask) {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      })
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    setIsLoading(true)
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        setAddress(accounts[0])

        // Get ETH balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })

        // Convert from wei to ETH
        const ethBalance = Number.parseInt(balance, 16) / 1e18
        setBalance(`${ethBalance.toFixed(4)} ETH`)
        setConnected(true)

        toast({
          title: "Wallet connected",
          description: "Your MetaMask wallet has been successfully connected.",
        })
      }
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setConnected(false)
    setAddress("")
    setBalance("")

    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard.",
    })
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  // Listen for account changes
  useEffect(() => {
    if (hasMetaMask && connected) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet()
        } else if (accounts[0] !== address) {
          // User switched accounts
          setAddress(accounts[0])
          toast({
            title: "Account changed",
            description: `Switched to account ${formatAddress(accounts[0])}`,
          })
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      // Cleanup
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [hasMetaMask, connected, address])

  return (
    <>
      {!connected ? (
        <Button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 relative overflow-hidden group"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Connecting...</span>
            </div>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Connect MetaMask</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          )}
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/30 backdrop-blur-sm text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-800/50 rounded-full transition-all duration-300 group"
            >
              <Wallet className="h-4 w-4 mr-2 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" />
              {formatAddress(address)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="flex justify-between">
              <span>Balance:</span>
              <span>{balance}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy Address</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>View on Etherscan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

