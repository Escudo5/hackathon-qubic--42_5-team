"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force a re-render on the client to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Apply dark class to html element when theme changes
  React.useEffect(() => {
    const handleThemeChange = (event: any) => {
      const isDark = event.detail.theme === "dark"
      if (isDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    // Listen for theme change events
    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("themeChange", handleThemeChange)
    }
  }, [])

  return <NextThemesProvider {...props}>{mounted && children}</NextThemesProvider>
}

