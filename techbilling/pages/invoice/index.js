"use client"

import { Navigation } from "../../components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { InvoiceForm } from "../../components/invoice/invoice-form"
import { InvoicePreview } from "@/components/invoice/invoice-preview"
import { useState } from "react"


export default function InvoicePage() {
  const [invoiceData, setInvoiceData] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleFormSubmit = (data) => {
    setInvoiceData(data)
    setShowPreview(true)
  }

  const handleBackToForm = () => {
    setShowPreview(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="sticky top-0 h-screen w-64 flex-shrink-0">
        <Navigation />
      </div>

      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-playfair font-bold text-3xl text-foreground mb-2">Invoice Simulator</h1>
            <p className="text-muted-foreground">
              Create and preview professional invoices with our easy-to-use form builder
            </p>
          </div>

          {!showPreview ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-playfair text-xl">Invoice Details</CardTitle>
                    <CardDescription>Fill in the information to generate your invoice preview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InvoiceForm onSubmit={handleFormSubmit} />
                  </CardContent>
                </Card>
              </div>

              {/* Instructions */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="font-playfair text-xl">How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Customer Information</h4>
                        <p className="text-sm text-muted-foreground">
                          Enter your client&#39;s details including name, company, and billing address
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Add Line Items</h4>
                        <p className="text-sm text-muted-foreground">
                          Add services or products with descriptions, quantities, and unit prices
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Set Dates & Notes</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure issue date, due date, and add any additional notes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Generate Preview</h4>
                        <p className="text-sm text-muted-foreground">
                          Click &quot;Generate Preview&quot; to see your professional invoice
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-playfair text-xl">Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Professional invoice layout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Automatic tax calculations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Multiple line items support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Customizable dates and notes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Print-ready format</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <InvoicePreview invoiceData={invoiceData} onBack={handleBackToForm} />
          )}
        </div>
      </main>
    </div>
  )
}
