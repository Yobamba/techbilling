"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
import { BarChart3, FileCheck, FileText, Home, Building2 } from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Compliance", href: "/compliance", icon: FileCheck },
  { name: "Invoice Simulator", href: "/invoice", icon: FileText },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 p-6 border-b border-sidebar-border">
          <Building2 className="h-8 w-8 text-sidebar-primary" />
          <div>
            <h1 className="font-playfair font-bold text-xl text-sidebar-foreground">TechBilling</h1>
            <p className="text-sm text-sidebar-foreground/60">Professional Dashboard</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ` +
    (isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")
  }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 text-center">© 2025 TechBilling</p>
        </div>
    </nav>
  )
}
