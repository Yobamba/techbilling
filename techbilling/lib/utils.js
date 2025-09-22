import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}

// export function formatCurrency(amount: number, currency = "USD") {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency,
//   }).format(amount)
// }

// export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
//   const dateObj = typeof date === "string" ? new Date(date) : date
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     ...options,
//   }).format(dateObj)
// }

// export function formatPercentage(value: number, decimals = 1): string {
//   return `${value.toFixed(decimals)}%`
// }

// export function generateInvoiceNumber(): string {
//   const year = new Date().getFullYear()
//   const timestamp = Date.now().toString().slice(-6)
//   return `INV-${year}-${timestamp}`
// }

// export function calculateDaysUntilDeadline(deadline: string): number {
//   const deadlineDate = new Date(deadline)
//   const today = new Date()
//   const diffTime = deadlineDate.getTime() - today.getTime()
//   return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
// }

// export function validateEmail(email: string): boolean {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   return emailRegex.test(email)
// }

// export function validateTaxId(taxId: string): boolean {
//   // Basic validation - can be enhanced based on specific requirements
//   return taxId.length >= 3 && /^[A-Z0-9-]+$/i.test(taxId)
// }

// export function truncateText(text: string, maxLength: number): string {
//   if (text.length <= maxLength) return text
//   return text.slice(0, maxLength) + "..."
// }
