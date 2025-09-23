import { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useBilling } from '../../context/billing-context';

export function InvoiceChart() {
    const { invoices, selectedPeriod } = useBilling();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!invoices || invoices.length === 0) return;

        if (selectedPeriod === 'monthly') {
            const monthlyData = invoices.reduce((acc, invoice) => {
                const month = new Date(invoice.date).toLocaleString('default', { month: 'short' });
                acc[month] = (acc[month] || 0) + 1;
                return acc;
            }, {});

            const formattedData = Object.entries(monthlyData).map(([month, count]) => ({
                name: month,
                invoices: count
            }));
            setChartData(formattedData);
        } else if (selectedPeriod === 'annual') {
            const yearlyData = invoices.reduce((acc, invoice) => {
                const year = new Date(invoice.date).getFullYear();
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {});

            const formattedData = Object.entries(yearlyData).map(([year, count]) => ({
                name: year,
                invoices: count
            }));
            setChartData(formattedData);
        }
    }, [invoices, selectedPeriod]);

    return (
        <div className="w-full bg-white rounded-lg shadow p-4">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Invoice Activity</h2>
                <p className="text-gray-600">Number of invoices issued per month</p>
            </div>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis 
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                        />
                        <Tooltip
                            formatter={(value) => [value, 'Invoices']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                padding: '8px'
                            }}
                        />
                        <Bar 
                            dataKey="invoices" 
                            fill="#8B5CF6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}