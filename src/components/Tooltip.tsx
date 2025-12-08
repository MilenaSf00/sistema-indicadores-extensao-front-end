import React, { useState } from 'react';
import type { ReactNode } from 'react';

import '../css/Sobre.css'; // Utilizing styles from Sobre.css as per plan

interface TooltipProps {
    text: string;
    children: ReactNode;
    position?: 'top' | 'bottom';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`tooltip-text tooltip-${position}`}>
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
