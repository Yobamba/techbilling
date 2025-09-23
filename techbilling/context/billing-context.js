import { createContext, useContext, useState, useEffect } from "react";

const BillingContext = createContext();

export function BillingProvider({ children }) {
    const [billingData, setBillingData] = useState({
        revenue: {
            monthly: [],
            yearly: 0
        },
        invoices: [],
        clients: [],
        statistics: {
            totalInvoices: 0,
            totalClients: 0,
            averageInvoiceValue: 0
        }
    });

    useEffect(() => {
        // Load mock data
        const loadMockData = async () => {
            try {
                const data = await import("../mock-data/data.json");
                setBillingData(data.default);
            } catch (error) {
                console.error("Error loading billing data: ", error);
            }
        };

        loadMockData();
    }, []);

    const value = {
        ...billingData,
        updateRevenue: (newRevenue) => {
            setBillingData(prev => ({
                ...prev,
                revenue: newRevenue
            }));
        },
        addInvoice: (invoice) => {
            setBillingData(prev => ({
                ...prev,
                invoices: [...prev.invoices, invoice]
            }));
        },
        addClient: (client) => {
            setBillingData(prev => ({
                ...prev,
                clients: [...prev.clients, client]
            }));
        }
    };

     return (
        <BillingContext.Provider value={value}>
            {children}
        </BillingContext.Provider>
    );
}

export function useBilling() {
    const context = useContext(BillingContext);
    if (context === undefined) {
        throw new Error('useBilling must be used within a BillingProvider');
    }
    return context;
}
