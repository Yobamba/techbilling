import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { cn } from '../../lib/utils';

const ChartContext = React.createContext(null);

function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />');
    }
    return context;
}

function ChartContainer({
    className,
    children,
    config,
    ...props
}) {
    return (
        <div
            className={cn(
                "w-full [&_.recharts-cartesian-axis-tick-value]:fill-gray-500",
                "[&_.recharts-cartesian-grid-horizontal_line]:stroke-gray-200",
                "[&_.recharts-cartesian-grid-vertical_line]:stroke-gray-200",
                className
            )}
            {...props}
        >
            <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                {children}
            </RechartsPrimitive.ResponsiveContainer>
        </div>
    );
}

const ChartTooltip = ({ 
    contentStyle,
    formatter,
    ...props 
}) => (
    <RechartsPrimitive.Tooltip
        contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            padding: '8px',
            ...contentStyle
        }}
        formatter={formatter}
        {...props}
    />
);

// Reexport commonly used Recharts components
export {
    ChartContainer,
    ChartTooltip,
    Area,
    AreaChart,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from 'recharts';

export { useChart };