"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CryptoIcon } from "@/components/crypto-icon"

export function QubicConnect() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Connect to Qubic wallet
  const connectWallet = async () => {
    setIsLoading(true)

    // Simulate connection to Qubic wallet
    setTimeout(() => {
      const mockAddress =
        "qbc_" + Math.random().toString(36).substring(2, 10) + "..." + Math.random().toString(36).substring(2, 10)
      const mockBalance = (Math.random() * 1000).toFixed(2)

      setAddress(mockAddress)
      setBalance(`${mockBalance} QBC`)
      setConnected(true)
      setIsLoading(false)

      toast({
        title: "Qubic Wallet Connected",
        description: "Your Qubic wallet has been successfully connected.",
      })
    }, 1500)
  }

  const disconnectWallet = () => {
    setConnected(false)
    setAddress("")
    setBalance("")

    toast({
      title: "Wallet disconnected",
      description: "Your Qubic wallet has been disconnected.",
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address copied",
      description: "Qubic wallet address copied to clipboard.",
    })
  }

  const formatAddress = (addr: string) => {
    if (addr.includes("...")) return addr
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  return (
    <>
      {!connected ? (
        <Button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-qubic hover:bg-qubic-dark text-white rounded-full transition-all duration-300 relative overflow-hidden group"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Connecting...</span>
            </div>
          ) : (
            <>
              <CryptoIcon currency="qubic" className="h-4 w-4 mr-2 text-white relative z-10" />
              <span className="relative z-10">Connect Qubic</span>
              <div className="absolute inset-0 bg-gradient-to-r from-qubic-dark to-qubic opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          )}
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-qubic/30 dark:border-qubic/20 bg-white/80 dark:bg-qubic/10 backdrop-blur-sm text-qubic dark:text-qubic-light hover:bg-qubic/10 dark:hover:bg-qubic/20 rounded-full transition-all duration-300 group"
            >
              <CryptoIcon
                currency="qubic"
                className="h-4 w-4 mr-2 text-qubic dark:text-qubic-light group-hover:text-qubic-dark dark:group-hover:text-qubic-light"
              />
              {formatAddress(address)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Qubic Wallet</DropdownMenuLabel>
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
              onClick={() => window.open(`https://qubic.li/explorer/address/${address}`, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>View on Explorer</span>
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

