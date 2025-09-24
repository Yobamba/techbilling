"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Printer as Print } from "lucide-react"

export function InvoicePreview({ invoiceData, onBack }) {
  const { customer, items, issueDate, dueDate, notes } = invoiceData

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const taxRate = 0.1 // 10% tax
  const tax = subtotal * taxRate
  const total = subtotal + tax

  const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Form
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Print className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Invoice Preview */}
      <Card className="border-border print:shadow-none print:border-none">
        <CardContent className="p-8 print:p-6">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="font-playfair font-bold text-3xl text-primary mb-2">TechBilling</h1>
              <p className="text-muted-foreground">Professional Billing Solutions</p>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>123 Business Avenue</p>
                <p>Suite 500, Tech City, TC 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: billing@techbilling.com</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="font-playfair font-bold text-2xl text-foreground mb-2">INVOICE</h2>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Invoice #:</span> {invoiceNumber}
                </p>
                <p>
                  <span className="font-medium">Issue Date:</span> {new Date(issueDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span> {new Date(dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-3 text-primary">Bill To:</h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold text-lg">{customer.name}</p>
              <p className="font-medium">{customer.company}</p>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
              {customer.address && (
                <div className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{customer.address}</div>
              )}
              {customer.taxId && <p className="text-sm text-muted-foreground mt-1">Tax ID: {customer.taxId}</p>}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-8">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-primary/10 px-4 py-3 border-b border-border">
                <div className="grid grid-cols-12 gap-4 font-semibold text-sm">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {items.map((item, index) => (
                  <div key={index} className="px-4 py-3">
                    <div className="grid grid-cols-12 gap-4 text-sm">
                      <div className="col-span-6">{item.description}</div>
                      <div className="col-span-2 text-center">{item.quantity}</div>
                      <div className="col-span-2 text-right">${item.unitPrice.toFixed(2)}</div>
                      <div className="col-span-2 text-right font-medium">${item.total.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {notes && (
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3 text-primary">Notes:</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm whitespace-pre-line">{notes}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>Thank you for your business!</p>
            <p className="mt-2">
              Payment is due within 30 days. Please include invoice number {invoiceNumber} with your payment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
