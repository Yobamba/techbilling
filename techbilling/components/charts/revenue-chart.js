import { useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useBilling } from '../../context/billing-context';

export function RevenueChart() {
    const { revenueData, selectedPeriod } = useBilling();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (selectedPeriod === 'monthly' && revenueData?.monthly) {
            const formattedData = revenueData.monthly.map(item => ({
                name: item.month,
                revenue: item.value
            }));
            setChartData(formattedData);
        } else if (selectedPeriod === 'annual' && revenueData?.yearly) {
            const formattedData = revenueData.yearly.map(item => ({
                name: item.year.toString(),
                revenue: item.value
            }));
            setChartData(formattedData);
        }
    }, [revenueData, selectedPeriod]);

    return (
        <div className="w-full bg-white rounded-lg shadow p-4">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Revenue Trends</h2>
                <p className="text-gray-600">Monthly revenue performance</p>
            </div>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
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
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                padding: '8px'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4F46E5"
                            strokeWidth={2}
                            fill="url(#revenueGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}