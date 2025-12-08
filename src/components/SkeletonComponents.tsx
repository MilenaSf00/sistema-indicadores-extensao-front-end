import React from 'react';

// Skeleton base styles
const skeletonBaseStyle: React.CSSProperties = {
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    animation: 'pulse 1.5s ease-in-out infinite',
};

// Keyframes need to be added via CSS, but we'll use inline animation
const pulseAnimation = `
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
`;

// Inject keyframes into document head
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = pulseAnimation;
    document.head.appendChild(styleSheet);
}

// -----------------------
// SkeletonText
// -----------------------
interface SkeletonTextProps {
    width?: string;
    height?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ width = '100%', height = '20px' }) => {
    return (
        <div
            style={{
                ...skeletonBaseStyle,
                width,
                height,
            }}
        />
    );
};

// -----------------------
// SkeletonCard
// -----------------------
interface SkeletonCardProps {
    minHeight?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ minHeight = '140px' }) => {
    return (
        <div
            style={{
                ...skeletonBaseStyle,
                borderRadius: '30px',
                minWidth: '140px',
                minHeight,
                flex: 1,
                margin: '5px',
            }}
        />
    );
};

// -----------------------
// SkeletonBarChart
// -----------------------
export const SkeletonBarChart: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
            <SkeletonText width="60%" height="24px" />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <SkeletonText width="120px" height="20px" />
                    <div
                        style={{
                            ...skeletonBaseStyle,
                            height: '20px',
                            borderRadius: '0 10px 10px 0',
                            width: `${Math.random() * 50 + 30}%`,
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

// -----------------------
// SkeletonCircleChart
// -----------------------
interface SkeletonCircleChartProps {
    size?: number;
    isDonut?: boolean;
}

export const SkeletonCircleChart: React.FC<SkeletonCircleChartProps> = ({ size = 200, isDonut = false }) => {
    return (
        <div
            style={{
                ...skeletonBaseStyle,
                width: size,
                height: size,
                borderRadius: '50%',
                position: 'relative',
            }}
        >
            {isDonut && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: size * 0.55,
                        height: size * 0.55,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                    }}
                />
            )}
        </div>
    );
};

// -----------------------
// SkeletonSemiCircle
// -----------------------
interface SkeletonSemiCircleProps {
    size?: number;
}

export const SkeletonSemiCircle: React.FC<SkeletonSemiCircleProps> = ({ size = 200 }) => {
    return (
        <div
            style={{
                width: size,
                height: size / 2,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    ...skeletonBaseStyle,
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '35%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    width: size * 0.7,
                    height: size * 0.7,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                }}
            />
        </div>
    );
};
