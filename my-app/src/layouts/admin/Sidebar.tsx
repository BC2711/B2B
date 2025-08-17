import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChartBar,
    FaCog,
    FaProductHunt,
    FaShoppingCart,
    FaTachometerAlt,
    FaUsers,
    FaWarehouse,
    FaBoxes,
    FaSignOutAlt,
    FaChevronDown,
    FaCaretDown,
    FaCat,
} from 'react-icons/fa';
import { FaCableCar } from 'react-icons/fa6';
import { AiFillAlert } from 'react-icons/ai';

interface NavItem {
    name: string;
    icon: React.ReactNode;
    href?: string;
    children?: NavChildItem[];
}

interface NavChildItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

interface SidebarProps {
    isCollapsed: boolean;
}

// Memoize to prevent unnecessary re-renders
const Sidebar: React.FC<SidebarProps> = memo(({ isCollapsed }) => {
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
        orders: false,
        inventory: false,
        customers: false,
        reports: false,
        settings: false,
    });

    const navItems: NavItem[] = [
        {
            name: 'Dashboard',
            icon: <FaTachometerAlt size={18} />,
            href: '/admin',
        },
        {
            name: 'Orders',
            icon: <FaShoppingCart size={18} />,
            children: [
                { name: 'All Orders', href: '/admin/orders' },
                { name: 'Pending', href: '/admin/orders/pending' },
                { name: 'Completed', href: '/admin/orders/completed' },
            ],
        },
        {
            name: 'Inventory',
            icon: <FaWarehouse size={18} />,
            children: [
                { name: 'Products', href: '/admin/inventory', icon: <FaProductHunt size={18} /> },
                { name: 'Categories', href: '/admin/inventory/categories',icon: <FaCat size={18} /> },
                { name: 'Stock Alerts', href: '/admin/inventory/alerts',icon: <AiFillAlert size={18} /> },
            ],
        },
        {
            name: 'Customers',
            icon: <FaUsers size={18} />,
            children: [
                { name: 'Customer List', href: '/admin/customers' },
                { name: 'Groups', href: '/admin/customers/groups' },
            ],
        },
        {
            name: 'Reports',
            icon: <FaChartBar size={18} />,
            children: [
                { name: 'Sales', href: '/admin/reports/sales' },
                { name: 'Inventory', href: '/admin/reports/inventory' },
            ],
        },
        {
            name: 'Settings',
            icon: <FaCog size={18} />,
            children: [
                { name: 'Account', href: '/admin/settings/account' },
                { name: 'Preferences', href: '/admin/settings/preferences' },
            ],
        },
    ];

    // Use useCallback to prevent function recreation
    const toggleMenu = useCallback((menuName: string) => {
        setExpandedMenus((prev) => {
            const newState: Record<string, boolean> = {};
            // Close all menus
            Object.keys(prev).forEach((key) => {
                newState[key] = false;
            });
            // Toggle the clicked menu
            newState[menuName.toLowerCase()] = !prev[menuName.toLowerCase()];
            return newState;
        });
    }, []);

    // Check if current route matches href or any child href
    const isActive = useCallback((href: string, children?: NavChildItem[]) => {
        const currentPath = window.location.pathname;
        if (href && currentPath === href) return true;
        if (children) {
            return children.some((child) => currentPath === child.href);
        }
        return false;
    }, []);

    return (
        <motion.div
            className="flex flex-col h-screen bg-transparent"
            initial={{ width: isCollapsed ? 80 : 256 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="navigation"
        >
            {/* Logo and Collapse Button */}
            <div className="flex items-center justify-between h-16 px-4 bg-transparent">
                <motion.div
                    className={`flex items-center py-4 ${isCollapsed ? 'ml-[-20px]':''} `}
                    initial={{ opacity: isCollapsed ? 0 : 1 }}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaBoxes size={18} color="indigo" />
                    {!isCollapsed && (
                        <span className="text-xl ml-2 font-semibold text-white">WholesalePro</span>
                    )}
                </motion.div>
                {isCollapsed && (
                    <motion.div
                        className="flex justify-center w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FaBoxes size={18} color="indigo" />
                    </motion.div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex flex-col flex-grow px-2 py-4 overflow-y-auto">
                <nav className="flex-1 space-y-1" aria-label="Sidebar navigation">
                    {navItems.map((item) => (
                        <div key={item.name} className="space-y-1">
                            {item.children ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.name)}
                                        className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-500 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${isActive(item.href || '', item.children)
                                                ? 'text-white bg-gray-500 bg-opacity-30'
                                                : 'text-white'
                                            } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                                        aria-expanded={expandedMenus[item.name.toLowerCase()]}
                                        aria-label={`${item.name} menu`}
                                    >
                                        <div
                                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'
                                                }`}
                                        >
                                            <span
                                                className={`${isActive(item.href || '', item.children)
                                                        ? 'text-gray-600'
                                                        : 'text-white'
                                                    }`}
                                            >
                                                {item.icon}
                                            </span>
                                            {!isCollapsed && <span>{item.name}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <motion.div
                                                animate={{ rotate: expandedMenus[item.name.toLowerCase()] ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FaChevronDown color="white" size={12} />
                                            </motion.div>
                                        )}
                                    </button>
                                    {!isCollapsed && (
                                        <AnimatePresence>
                                            {expandedMenus[item.name.toLowerCase()] && (
                                                <motion.div
                                                    className="pl-11 space-y-1"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                >
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.name}
                                                            to={child.href}
                                                            className={`flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-500 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${isActive(child.href)
                                                                    ? 'text-white font-medium'
                                                                    : 'text-white'
                                                                }`}
                                                            aria-label={child.name}
                                                        >
                                                            {child.icon ? (
                                                                <span
                                                                    className={`mr-3 ${isActive(child.href)
                                                                            ? 'text-indigo-600'
                                                                            : 'text-gray-500'
                                                                        }`}
                                                                >
                                                                    {child.icon}
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className={`w-1.5 h-1.5 mr-3 rounded-full ${isActive(child.href) ? 'bg-indigo-600' : 'bg-gray-400'
                                                                        }`}
                                                                />
                                                            )}
                                                            {child.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to={item.href || '#'}
                                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-500 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${isActive(item.href || '') ? 'text-white bg-indigo-50' : 'text-white'
                                        } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
                                    aria-label={item.name}
                                >
                                    <span
                                        className={`${isActive(item.href || '') ? 'text-white bg-gray-500 bg-opacity-30' : 'text-white'
                                            }`}
                                    >
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && <span>{item.name}</span>}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* User Profile */}
            <div className="p-4 bg-transparent">
                <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: isCollapsed ? 0 : 1 }}
                    animate={{ opacity: isCollapsed ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {!isCollapsed ? (
                        <>
                            <div className="flex items-center space-x-3">
                                <img
                                    className="w-9 h-9 rounded-full object-cover"
                                    src="/src/assets/images/oceans.jpg"
                                    alt="User profile"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="text-sm font-medium text-white">John Smith</p>
                                    <p className="text-xs text-white">Admin</p>
                                </div>
                            </div>
                            <Link
                                to="/"
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                aria-label="Sign out"
                            >
                                <FaSignOutAlt size={18} />
                            </Link>
                        </>
                    ) : (
                        <motion.div
                            className="flex justify-center bg-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                className="w-9 h-9 rounded-full object-cover"
                                src="/src/assets/images/oceans.jpg"
                                alt="User profile"
                                loading="lazy"
                            />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
});

// Add display name for better debugging
Sidebar.displayName = 'Sidebar';

export default Sidebar;