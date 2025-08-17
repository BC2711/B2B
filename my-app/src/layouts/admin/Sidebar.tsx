import React, { useState, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from 'react-icons/fa';
import { AiFillAlert } from 'react-icons/ai';

// Define types for navigation items
interface NavChildItem {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

interface NavItem {
    name: string;
    icon: React.ReactNode;
    href?: string;
    children?: NavChildItem[];
}

interface SidebarProps {
    isCollapsed: boolean;
    onToggle?: () => void; // Optional callback for toggling sidebar
}

// Animation variants for sidebar
const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 },
};

// Animation variants for submenus
const submenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
};

const Sidebar: React.FC<SidebarProps> = memo(({ isCollapsed, onToggle }) => {
    const location = useLocation();
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
        orders: false,
        inventory: false,
        customers: false,
        reports: false,
        settings: false,
    });

    // Navigation items
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
                { name: 'Pending', href: '/admin/pending' },
                { name: 'Completed', href: '/admin/completed' },
            ],
        },
        {
            name: 'Inventory',
            icon: <FaWarehouse size={18} />,
            children: [
                { name: 'Products', href: '/admin/products', icon: <FaProductHunt size={18} /> },
                { name: 'Categories', href: '/admin/categories', icon: <FaBoxes size={18} /> },
                { name: 'Stock Alerts', href: '/admin/stock-alerts', icon: <AiFillAlert size={18} /> },
            ],
        },
        {
            name: 'Customers',
            icon: <FaUsers size={18} />,
            children: [
                { name: 'Customer List', href: '/admin/customers' },
                { name: 'Groups', href: '/admin/groups' },
            ],
        },
        {
            name: 'Reports',
            icon: <FaChartBar size={18} />,
            children: [
                { name: 'Sales', href: '/admin/sales' },
                { name: 'Inventory', href: '/admin/inventory' },
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

    // Handle menu toggle
    const toggleMenu = useCallback((menuName: string) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menuName.toLowerCase()]: !prev[menuName.toLowerCase()],
        }));
    }, []);

    // Check if a route is active
    const isActive = useCallback(
        (href: string, children?: NavChildItem[]) => {
            const currentPath = location.pathname;
            if (href && currentPath === href) return true;
            if (children) {
                return children.some((child) => currentPath === child.href);
            }
            return false;
        },
        [location.pathname],
    );

    return (
        <motion.div
            className="flex flex-col h-screen bg-transparent text-white shadow-lg"
            variants={sidebarVariants}
            initial={isCollapsed ? 'collapsed' : 'expanded'}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="navigation"
            aria-label="Admin sidebar"
        >
            {/* Logo and Collapse Button */}
            <div className="flex items-center justify-between h-16 px-4 bg-transparent">
                <motion.div
                    className="flex items-center"
                    initial={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
                    animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaBoxes size={24} className="text-indigo-400" />
                    {!isCollapsed && (
                        <span className="ml-3 text-xl font-semibold text-white">WholesalePro</span>
                    )}
                </motion.div>
                {onToggle && (
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <FaChevronDown
                            size={16}
                            className={`text-white transition-transform ${isCollapsed ? 'rotate-90' : '-rotate-90'}`}
                        />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-1" aria-label="Sidebar navigation">
                {navItems.map((item) => (
                    <div key={item.name} className="space-y-1">
                        {item.children ? (
                            <>
                                <button
                                    onClick={() => toggleMenu(item.name)}
                                    className={`
                    flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg 
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${isActive(item.href || '', item.children)
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-200 hover:bg-gray-700 hover:text-white'}
                    ${isCollapsed ? 'justify-center' : 'justify-between'}
                  `}
                                    aria-expanded={expandedMenus[item.name.toLowerCase()]}
                                    aria-label={`${item.name} menu`}
                                >
                                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                                        <span
                                            className={isActive(item.href || '', item.children) ? 'text-white' : 'text-gray-300'}
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
                                            <FaChevronDown size={12} className="text-gray-300" />
                                        </motion.div>
                                    )}
                                </button>
                                {!isCollapsed && (
                                    <AnimatePresence>
                                        {expandedMenus[item.name.toLowerCase()] && (
                                            <motion.div
                                                variants={submenuVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="pl-8 space-y-1"
                                            >
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        to={child.href}
                                                        className={`
                              flex items-center px-3 py-2 text-sm rounded-lg 
                              transition-colors duration-200
                              focus:outline-none focus:ring-2 focus:ring-indigo-500
                              ${isActive(child.href)
                                                                ? 'text-white bg-indigo-500'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                            `}
                                                        aria-label={child.name}
                                                    >
                                                        {child.icon ? (
                                                            <span
                                                                className={`mr-2 ${isActive(child.href) ? 'text-white' : 'text-gray-400'}`}
                                                            >
                                                                {child.icon}
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className={`w-1.5 h-1.5 mr-2 rounded-full ${isActive(child.href) ? 'bg-white' : 'bg-gray-400'
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
                                className={`
                  flex items-center px-3 py-2.5 text-sm font-medium rounded-lg 
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${isActive(item.href || '') ? 'bg-indigo-600 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'}
                  ${isCollapsed ? 'justify-center' : 'space-x-3'}
                `}
                                aria-label={item.name}
                            >
                                <span className={isActive(item.href || '') ? 'text-white' : 'text-gray-300'}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-700 dark:border-gray-800">
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
                                    className="w-10 h-10 rounded-full object-cover"
                                    src="/src/assets/images/oceans.jpg"
                                    alt="User profile"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="text-sm font-medium text-white">John Smith</p>
                                    <p className="text-xs text-gray-300">Admin</p>
                                </div>
                            </div>
                            <Link
                                to="/logout"
                                className="p-2 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                aria-label="Sign out"
                            >
                                <FaSignOutAlt size={18} />
                            </Link>
                        </>
                    ) : (
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                className="w-10 h-10 rounded-full object-cover"
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

Sidebar.displayName = 'Sidebar';

export default Sidebar;