"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Dispatch a custom event for theme change
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme: newTheme } }))

    // Force the dark class on the html element
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-900/30 backdrop-blur-sm hover:bg-green-50 dark:hover:bg-green-800/50 transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400 animate-pulse-slow" />
      ) : (
        <Moon className="h-5 w-5 text-green-700" />
      )}
    </Button>
  )
}

