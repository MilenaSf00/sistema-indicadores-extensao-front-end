import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie, Tooltip, LabelList } from 'recharts';

// tipos
export interface ChartData {
    name: string;
    value: number;
    color?: string;
    [key: string]: string | number | undefined;
}

// grafico de barros
interface CustomBarChartProps {
    data: ChartData[];
    height?: number;
    barColor?: string;
}

export const CustomBarChart: React.FC<CustomBarChartProps> = ({ data, height = 400, barColor = "#1762a8" }) => {
    return (
        <div style={{ width: '100%', height: height }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={150}
                        tick={{ fontSize: 13, fontWeight: 600, fill: '#333', fontFamily: 'Manrope' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || barColor} />
                        ))}
                        <LabelList dataKey="value" position="right" style={{ fontSize: '14px', fontWeight: '800', fill: '#333', fontFamily: 'Manrope' }} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// grafico de pizza
interface CustomPieChartProps {
    data: ChartData[];
    size?: number;
}

export const CustomPieChart: React.FC<CustomPieChartProps> = ({ data, size = 300 }) => {
    return (
        <div style={{ width: size, height: size, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={size / 2 - 10}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// grafico semi circurlo
interface SemiCircleChartProps {
    percentage: number;
    label: string;
    color: string;
    size?: number;
}

export const SemiCircleChart: React.FC<SemiCircleChartProps> = ({ percentage, label, color, size = 200 }) => {
    const data = [
        { name: 'Value', value: percentage, color: color },
        { name: 'Remaining', value: 100 - percentage, color: '#E0E0E0' },
    ];

    return (
        <div style={{ position: 'relative', width: size, height: size / 2 + 20, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width={size} height={size}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={size / 2 - 20}
                        outerRadius={size / 2}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: 0,
                right: 0,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#333', fontFamily: 'Manrope' }}>
                    {percentage.toLocaleString('pt-BR')}%
                </div>
                <div style={{ fontSize: '12px', color: '#888', fontWeight: '600', fontFamily: 'Manrope' }}>{label}</div>
            </div>
        </div>
    );
};

// cards
interface StatCardProps {
    value: number | string;
    title: string;
    color?: string;
    borderColor?: string;
    textColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ value, title, color = '#155BD8', borderColor = '#155BD8', textColor = 'white' }) => {
    return (
        <div style={{
            backgroundColor: color,
            borderRadius: '30px',
            padding: '20px',
            color: textColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minWidth: '140px',
            minHeight: '140px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
            border: '5px solid white',
            outline: `5px solid ${borderColor}`,
            boxSizing: 'border-box',
            margin: '5px',
            flex: 1
        }}>
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', fontFamily: 'Manrope' }}>{value}</div>
            <div style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.3', fontFamily: 'Manrope', maxWidth: '100%' }}>{title}</div>
        </div>
    );
};
