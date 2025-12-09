import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LabelList } from 'recharts';

// tipos
export interface ChartData {
    name: string;
    value: number;
    color?: string;
    [key: string]: string | number | undefined;
}

// -----------------------
// CustomBarChart
// -----------------------
interface CustomBarChartProps {
    data: ChartData[];
    height?: number;
    barColor?: string;
}

export const CustomBarChart: React.FC<CustomBarChartProps & { animationActive?: boolean }> = ({ data, height = 400, barColor = "#1762a8", animationActive = true }) => {
    return (
        <div style={{ width: '100%', height, minHeight: 150 }}>
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
                        formatter={(value: number) => [value, 'Valor']}
                    />
                    <Bar dataKey="value" radius={[0, 10, 10, 0]} isAnimationActive={animationActive}>
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

// -----------------------
// CustomPieChart
// -----------------------
interface CustomPieChartProps {
    data: ChartData[];
    size?: number; // tamanho máximo do gráfico
}

export const CustomPieChart: React.FC<CustomPieChartProps & { animationActive?: boolean }> = ({ data, size = 300, animationActive = true }) => {
    return (
        <div style={{ width: '100%', maxWidth: size, height: size, minWidth: 150, minHeight: 150, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" aspect={1}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius="80%"
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                        isAnimationActive={animationActive}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} stroke="white" strokeWidth={2} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

// -----------------------
// SemiCircleChart
// -----------------------
// -----------------------
// SemiCircleChart
// -----------------------

interface SemiCircleChartProps {
    percentage: number;
    label: string;
    color: string;
    size?: number;
    value?: number;
    total?: number;
    showLegend?: boolean;
}

export const SemiCircleChart: React.FC<SemiCircleChartProps & { animationActive?: boolean, compact?: boolean }> = ({
    percentage = 0,
    label,
    color,
    size = 280,
    value,
    total,
    showLegend = false,
    animationActive = true,
    compact = false
}) => {
    const data = [
        { name: 'Envolvidos', value: Number(percentage.toFixed(1)), color: color, absolute: value, total: total },
        { name: 'Não Envolvidos', value: Number((100 - percentage).toFixed(1)), color: '#E0E0E0', absolute: (total && value) ? total - value : undefined, total: total },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    fontFamily: 'Manrope'
                }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: item.color }}>{item.name}</p>
                    <p style={{ margin: '5px 0 0 0' }}>{`${item.value}%`}</p>
                    {item.absolute !== undefined && item.total !== undefined && (
                        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                            {`${item.absolute} de ${item.total} ${label.toLowerCase()}s`}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: size,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
        }}>
            {/* Chart Container */}
            <div style={{
                width: '100%',
                position: 'relative'
            }}>
                <ResponsiveContainer width="100%" aspect={2}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius="65%"
                            outerRadius="100%"
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={animationActive}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Value and Label */}
            <div style={{
                textAlign: 'center',
                marginTop: '-10px'
            }}>
                <div style={{
                    fontSize: compact ? '28px' : '32px',
                    fontWeight: '800',
                    color: '#333',
                    fontFamily: 'Manrope',
                    lineHeight: 1
                }}>
                    {(percentage || 0).toLocaleString('pt-BR')}%
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '600',
                    fontFamily: 'Manrope',
                    marginTop: '4px'
                }}>
                    {label}
                </div>
            </div>

            {/* Legend */}
            {showLegend && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '24px',
                    marginTop: '12px',
                    flexWrap: 'wrap'
                }}>
                    {data.map((item, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            fontFamily: 'Manrope',
                            color: '#555'
                        }}>
                            <span style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: item.color,
                                flexShrink: 0
                            }} />
                            <span>
                                {item.name}
                                {item.absolute !== undefined && (
                                    <strong style={{ marginLeft: '4px' }}>
                                        ({item.absolute})
                                    </strong>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Simple Value Text (if no legend) */}
            {!showLegend && value !== undefined && total !== undefined && (
                <div style={{
                    fontSize: '12px',
                    color: '#888',
                    fontFamily: 'Manrope',
                    marginTop: '4px'
                }}>
                    {value.toLocaleString('pt-BR')} de {total.toLocaleString('pt-BR')} {label.toLowerCase()}s
                </div>
            )}
        </div>
    );
};

// -----------------------
// StatCard
// -----------------------
interface StatCardProps {
    value: number | string;
    title: string;
    color?: string;
    borderColor?: string;
    textColor?: string;
    badge?: string;
    badgeType?: 'active' | 'historical';
}

export const StatCard: React.FC<StatCardProps> = ({
    value,
    title,
    color = '#155BD8',
    borderColor = '#155BD8',
    textColor = 'white',
    badge,
    badgeType = 'active'
}) => {
    const badgeStyles = {
        active: {
            backgroundColor: 'rgba(13, 61, 31, 0.95)',
            color: 'white',
            boxShadow: '0 5px 8px rgba(34, 197, 94, 0.4)',
            border: '2px solid rgba(255,255,255,0.9)'
        },
        historical: {
            backgroundColor: 'rgba(107, 114, 128, 0.9)',
            color: 'white',
            boxShadow: 'none',
            border: '1px solid rgba(255,255,255,0.5)'
        }
    };

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
            border: `5px solid white`,
            outline: `5px solid ${borderColor}`,
            boxSizing: 'border-box',
            margin: '5px',
            flex: 1,
            position: 'relative' as const
        }}>
            {badge && (
                <div style={{
                    position: 'absolute' as const,
                    top: '-12px',
                    right: '10px',
                    padding: '10px 18px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '700',
                    fontFamily: 'Manrope',
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase' as const,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    ...badgeStyles[badgeType]
                }}>
                    {badgeType === 'active' && (
                        <span style={{ fontSize: '8px' }}>●</span>
                    )}
                    {badge}
                </div>
            )}
            <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', fontFamily: 'Manrope' }}>
                {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', lineHeight: '1.3', fontFamily: 'Manrope', maxWidth: '100%' }}>{title}</div>
        </div>
    );
};

// -----------------------
// CustomDonutChart
// -----------------------
interface CustomDonutChartProps {
    data: ChartData[];
    size?: number;
}

export const CustomDonutChart: React.FC<CustomDonutChartProps & { animationActive?: boolean }> = ({ data, size = 300, animationActive = true }) => {
    return (
        <div style={{ width: '100%', maxWidth: size, height: size, minWidth: 150, minHeight: 150, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" aspect={1}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="55%"
                        outerRadius="100%"
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        isAnimationActive={animationActive}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} stroke="white" strokeWidth={2} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            fontFamily: 'Manrope'
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
