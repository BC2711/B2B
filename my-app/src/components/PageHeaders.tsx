import React from 'react';
import { motion } from 'framer-motion';

interface PageHeadersProps {
    name?: string;
    className?: string;
    children?: React.ReactNode;
    animationConfig?: {
        initial?: Record<string, unknown>;
        animate?: Record<string, unknown>;
        transition?: Record<string, unknown>;
    };
}

const PageHeaders: React.FC<PageHeadersProps> = ({
    name = "Provide Page Name",
    className = "",
    children,
    animationConfig = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' }
    }
}) => {
    return (
        <motion.div
            className={`flex items-center justify-between mb-6 ${className}`}
            initial={animationConfig.initial}
            animate={animationConfig.animate}
            transition={animationConfig.transition}
        >
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl ml-3 font-bold text-gray-500 dark:text-gray-500">
                    {name}
                </h1>
            </div>
            {children && (
                <div className="flex items-center space-x-3">
                    {children}
                </div>
            )}
        </motion.div>
    );
};

export default PageHeaders;