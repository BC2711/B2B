import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface StatCard {
    title: string;
    value: string;
    icon: string;
    iconColor: string;
    iconBg: string;
    change: string;
    changeType: 'positive' | 'negative';
    comparison: string;
}

interface Order {
    id: string;
    customer: string;
    date: string;
    amount: string;
    status: 'completed' | 'processing' | 'pending' | 'cancelled';
}

// Memoize to prevent unnecessary re-renders
const Dashboard: React.FC = memo(() => {
    const [timeRange, setTimeRange] = useState<'month' | 'year'>('year');

    // Stats data
    const statCards: StatCard[] = [
        {
            title: 'Total Revenue',
            value: '$24,780',
            icon: 'fas fa-dollar-sign',
            iconColor: 'text-indigo-600',
            iconBg: 'bg-indigo-50',
            change: '+12.5%',
            changeType: 'positive',
            comparison: 'vs last month',
        },
        {
            title: 'New Orders',
            value: '1,245',
            icon: 'fas fa-shopping-cart',
            iconColor: 'text-green-600',
            iconBg: 'bg-green-50',
            change: '+8.2%',
            changeType: 'positive',
            comparison: 'vs last month',
        },
        {
            title: 'Active Customers',
            value: '342',
            icon: 'fas fa-users',
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-50',
            change: '+3.1%',
            changeType: 'positive',
            comparison: 'vs last month',
        },
        {
            title: 'Low Stock Items',
            value: '18',
            icon: 'fas fa-box-open',
            iconColor: 'text-yellow-600',
            iconBg: 'bg-yellow-50',
            change: '+5',
            changeType: 'negative',
            comparison: 'since yesterday',
        },
    ];

    // Recent orders data
    const recentOrders: Order[] = [
        {
            id: '#WH-1001',
            customer: 'Global Suppliers Inc.',
            date: 'May 15, 2023',
            amount: '$2,450.00',
            status: 'completed',
        },
        {
            id: '#WH-1002',
            customer: 'Retail Ventures LLC',
            date: 'May 14, 2023',
            amount: '$1,890.50',
            status: 'processing',
        },
        {
            id: '#WH-1003',
            customer: 'Bulk Buy Distributors',
            date: 'May 13, 2023',
            amount: '$3,245.75',
            status: 'completed',
        },
        {
            id: '#WH-1004',
            customer: 'Tech Solutions Ltd.',
            date: 'May 12, 2023',
            amount: '$1,125.30',
            status: 'pending',
        },
        {
            id: '#WH-1005',
            customer: 'Home Goods Corp.',
            date: 'May 11, 2023',
            amount: '$890.00',
            status: 'completed',
        },
    ];

    // Use useCallback for handler
    const getStatusBadge = useCallback((status: Order['status']) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Completed
                    </span>
                );
            case 'processing':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                        Processing
                    </span>
                );
            case 'pending':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                        Pending
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Cancelled
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
                        Unknown
                    </span>
                );
        }
    }, []);

    // Animation variants for sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    // Animation variants for cards and table rows
    const cardVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
        }),
    };

    return (
        <main className="flex-1 overflow-auto p-4 bg-gray-50 rounded-[20px]">
            {/* Page Header with fade-in animation */}
            <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <div className="flex space-x-2">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        aria-label="Export dashboard data"
                    >
                        <i className="fas fa-download mr-2" />
                        Export
                    </button>
                    <Link
                        to="/admin/orders/new"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        aria-label="Create new order"
                    >
                        <i className="fas fa-plus mr-2" />
                        New Order
                    </Link>
                </div>
            </motion.div>

            {/* Stats Cards with staggered animation */}
            <motion.div
                className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                {statCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        variants={cardVariants}
                        custom={index}
                        className="p-5 bg-white rounded-lg shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 truncate">{card.title}</p>
                                <p className="mt-1 text-2xl font-semibold text-gray-900">{card.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${card.iconBg} ${card.iconColor}`}>
                                <i className={`${card.icon} text-xl`} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <span
                                className={`text-sm font-semibold ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {card.change}
                            </span>
                            <span className="text-gray-500 text-sm ml-2">{card.comparison}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div
                className="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Revenue Chart */}
                <motion.div
                    variants={cardVariants}
                    custom={0}
                    className="p-5 bg-white rounded-lg shadow"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setTimeRange('month')}
                                className={`px-3 py-1 text-xs font-medium ${timeRange === 'month'
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                                aria-label="View monthly revenue"
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setTimeRange('year')}
                                className={`px-3 py-1 text-xs font-medium ${timeRange === 'year'
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                                aria-label="View yearly revenue"
                            >
                                Year
                            </button>
                        </div>
                    </div>
                    <div className="h-64">
                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                            <p className="text-gray-500">
                                {timeRange === 'month' ? 'Monthly revenue chart' : 'Annual revenue chart'} will appear here
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Order Status */}
                <motion.div
                    variants={cardVariants}
                    custom={1}
                    className="p-5 bg-white rounded-lg shadow"
                >
                    <h2 className="mb-4 text-lg font-medium text-gray-900">Order Status</h2>
                    <div className="h-64">
                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                            <p className="text-gray-500">Order status chart will appear here</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
                className="mt-6"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="p-5 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                        <Link
                            to="/admin/orders"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            aria-label="View all orders"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        'Order ID',
                                        'Customer',
                                        'Date',
                                        'Amount',
                                        'Status',
                                        'Action',
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        custom={index}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {order.customer}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {order.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                            <Link
                                                to={`/admin/orders/${order.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                aria-label={`View order ${order.id}`}
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </main>
    );
});

// Add display name for better debugging
Dashboard.displayName = 'Dashboard';

export default Dashboard;