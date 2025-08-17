import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
    path: string;
    label: string;
    icon?: React.ReactNode;
}

interface BreadCrumbProps {
    breadcrumbs?: BreadcrumbItem[];
    homePath?: string;
    separator?: React.ReactNode;
    className?: string; // Added for custom styling
}

// Memoize to prevent unnecessary re-renders
const BreadCrumb: React.FC<BreadCrumbProps> = memo(
    ({
        breadcrumbs = [],
        homePath = '/admin',
        separator = <FaChevronRight color='gray' size={14} />,
        className = '',
    }) => {
        return (
            <nav
                className={`flex mb-6 px-4 py-2 border-b border-gray-200 bg-white shadow-sm rounded-md ${className}`}
                aria-label="Breadcrumb"
            >
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                    {/* Home Link */}
                    <li className="flex items-center">
                        <Link
                            to={homePath}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1 transition-colors"
                            aria-label="Home"
                        >
                            <FaHome size={18} aria-hidden="true" />
                        </Link>
                    </li>

                    {/* Breadcrumb Items */}
                    {breadcrumbs.map((crumb, index) => (
                        <li key={crumb.path} className="flex items-center space-x-2">
                            {separator}
                            {index === breadcrumbs.length - 1 ? (
                                <span
                                    className="text-gray-800 font-medium flex items-center"
                                    aria-current="page"
                                >
                                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link
                                    to={crumb.path}
                                    className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1 transition-colors flex items-center"
                                    aria-label={crumb.label}
                                >
                                    {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                                    {crumb.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        );
    }
);

// Add display name for better debugging
BreadCrumb.displayName = 'BreadCrumb';

export default BreadCrumb;