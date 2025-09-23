import { createContext, useContext, useState, useEffect } from "react";

const BillingContext = createContext();

// Helper to calculate percentage change
const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
};

export function BillingProvider({ children }) {
    const [billingData, setBillingData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState("monthly");
    const [dashboardStats, setDashboardStats] = useState({
        revenue: 0,
        revenueGrowth: 0,
        invoices: 0,
        invoiceGrowth: 0,
        customers: 0,
        customerGrowth: 0,
        avgInvoiceValue: 0,
    });

    useEffect(() => {
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

    useEffect(() => {
        if (!billingData) return;

        const { revenueData, invoices } = billingData;
        let stats = {};

        if (selectedPeriod === "monthly") {
            const monthlyRevenue = revenueData.monthly;
            const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
            const prevMonth = monthlyRevenue[monthlyRevenue.length - 2];

            stats.revenue = currentMonth.value;
            stats.revenueGrowth = calculatePercentageChange(currentMonth.value, prevMonth.value);
            stats.customers = currentMonth.customers;
            stats.customerGrowth = calculatePercentageChange(currentMonth.customers, prevMonth.customers);

            const latestInvoiceDate = new Date(Math.max(...invoices.map(e => new Date(e.date))));
            const currentMonthInvoices = invoices.filter(i => new Date(i.date).getMonth() === latestInvoiceDate.getMonth() && new Date(i.date).getFullYear() === latestInvoiceDate.getFullYear()).length;
            const prevMonthDate = new Date(latestInvoiceDate);
            prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
            const prevMonthInvoices = invoices.filter(i => new Date(i.date).getMonth() === prevMonthDate.getMonth() && new Date(i.date).getFullYear() === prevMonthDate.getFullYear()).length;
            
            stats.invoices = currentMonthInvoices;
            stats.invoiceGrowth = calculatePercentageChange(currentMonthInvoices, prevMonthInvoices);
            stats.avgInvoiceValue = stats.revenue / (stats.invoices || 1);

        } else if (selectedPeriod === "annual") {
            const yearlyRevenue = revenueData.yearly;
            const currentYear = yearlyRevenue[yearlyRevenue.length - 1];
            const prevYear = yearlyRevenue[yearlyRevenue.length - 2];

            stats.revenue = currentYear.value;
            stats.revenueGrowth = calculatePercentageChange(currentYear.value, prevYear.value);

            const latestInvoiceDate = new Date(Math.max(...invoices.map(e => new Date(e.date))));
            const currentYearInvoices = invoices.filter(i => new Date(i.date).getFullYear() === latestInvoiceDate.getFullYear()).length;
            const prevYearInvoices = invoices.filter(i => new Date(i.date).getFullYear() === latestInvoiceDate.getFullYear() - 1).length;

            stats.invoices = currentYearInvoices;
            stats.invoiceGrowth = calculatePercentageChange(currentYearInvoices, prevYearInvoices);
            
            // Customer data is only available monthly in the mock data
            const monthlyCustomers = revenueData.monthly;
            stats.customers = monthlyCustomers[monthlyCustomers.length - 1].customers;
            stats.customerGrowth = 0; // No annual data to compare

            stats.avgInvoiceValue = stats.revenue / (stats.invoices || 1);
        }

        setDashboardStats(stats);

    }, [billingData, selectedPeriod]);

    const value = {
        billingData,
        dashboardStats,
        revenueData: billingData?.revenueData,
        invoices: billingData?.invoices || [],
        selectedPeriod,
        setSelectedPeriod,
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
