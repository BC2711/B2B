import React, { useState } from 'react';
import type { LowStockItem, StatCard, TopCustomer, TopProduct } from '../../../types/InterfaceTypes';

const Reports: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'customers'>('sales');
    const [timeRange, setTimeRange] = useState<'monthly' | 'quarterly'>('quarterly');

    // Stats data
    const statCards: StatCard[] = [
        {
            title: 'Total Revenue',
            value: '$124,780',
            icon: 'fas fa-dollar-sign',
            iconColor: 'text-green-600',
            iconBg: 'bg-green-50',
            change: '+12.5%',
            changeType: 'positive',
            comparison: 'vs last period'
        },
        {
            title: 'Orders Completed',
            value: '1,245',
            icon: 'fas fa-check-circle',
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-50',
            change: '+8.2%',
            changeType: 'positive',
            comparison: 'vs last period'
        },
        {
            title: 'Avg. Order Value',
            value: '$1,245',
            icon: 'fas fa-shopping-basket',
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-50',
            change: '+5.8%',
            changeType: 'positive',
            comparison: 'vs last period'
        },
        {
            title: 'Top Customer',
            value: 'Global Suppliers',
            icon: 'fas fa-trophy',
            iconColor: 'text-yellow-600',
            iconBg: 'bg-yellow-50',
            change: '$24,780 revenue',
            changeType: 'positive',
            comparison: ''
        }
    ];

    // Top products data
    const topProducts: TopProduct[] = [
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: '$89.99',
            image: 'https://via.placeholder.com/40',
            sold: 142,
            change: 12
        },
        {
            id: 2,
            name: 'Organic Cotton T-Shirt',
            price: '$19.99',
            image: 'https://via.placeholder.com/40',
            sold: 87,
            change: 8
        },
        {
            id: 3,
            name: 'Bluetooth Speaker',
            price: '$59.99',
            image: 'https://via.placeholder.com/40',
            sold: 65,
            change: -5
        },
        {
            id: 4,
            name: 'Stainless Steel Water Bottle',
            price: '$24.95',
            image: 'https://via.placeholder.com/40',
            sold: 58,
            change: 15
        }
    ];

    // Low stock items data
    const lowStockItems: LowStockItem[] = [
        {
            id: 1,
            name: 'Stainless Steel Water Bottle',
            sku: 'WH-ACC-3012',
            image: 'https://via.placeholder.com/40',
            currentStock: 5,
            reorderLevel: 25,
            daysOfStock: 7
        },
        {
            id: 2,
            name: 'Bluetooth Speaker',
            sku: 'WH-AUD-1005',
            image: 'https://via.placeholder.com/40',
            currentStock: 0,
            reorderLevel: 10,
            daysOfStock: 0
        },
        {
            id: 3,
            name: 'Organic Cotton T-Shirt',
            sku: 'WH-APP-2005',
            image: 'https://via.placeholder.com/40',
            currentStock: 12,
            reorderLevel: 25,
            daysOfStock: 14
        }
    ];

    // Top customers data
    const topCustomers: TopCustomer[] = [
        {
            id: 1,
            name: 'Michael Johnson',
            company: 'Global Suppliers Inc.',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            orders: 24,
            totalSpend: '$24,780',
            avgOrder: '$1,032'
        },
        {
            id: 2,
            name: 'Sarah Williams',
            company: 'Retail Ventures LLC',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            orders: 18,
            totalSpend: '$18,450',
            avgOrder: '$1,025'
        },
        {
            id: 3,
            name: 'David Brown',
            company: 'Bulk Buy Distributors',
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            orders: 12,
            totalSpend: '$9,870',
            avgOrder: '$822'
        }
    ];

    return (
        <main className="flex-1 overflow-auto p-4 bg-gray-50 rounded-[20px]">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <i className="fas fa-download mr-2"></i> Export
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                        <i className="fas fa-cog mr-2"></i> Configure
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card, index) => (
                    <div key={index} className="p-5 bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 truncate">{card.title}</p>
                                <p className="mt-1 text-2xl font-semibold text-gray-900">{card.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${card.iconBg} ${card.iconColor}`}>
                                <i className={`${card.icon} text-xl`}></i>
                            </div>
                        </div>
                        {card.comparison && (
                            <div className="mt-4">
                                <span className={`${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'} text-sm font-semibold`}>
                                    {card.change}
                                </span>
                                <span className="text-gray-500 text-sm ml-2">{card.comparison}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Reports Tabs */}
            <div className="mt-6 bg-white rounded-lg shadow">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('sales')}
                            className={`py-4 px-6 text-sm font-medium text-center border-b-2 ${activeTab === 'sales' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap`}
                        >
                            <i className="fas fa-chart-line mr-2"></i> Sales
                        </button>
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`py-4 px-6 text-sm font-medium text-center border-b-2 ${activeTab === 'inventory' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap`}
                        >
                            <i className="fas fa-warehouse mr-2"></i> Inventory
                        </button>
                        <button
                            onClick={() => setActiveTab('customers')}
                            className={`py-4 px-6 text-sm font-medium text-center border-b-2 ${activeTab === 'customers' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap`}
                        >
                            <i className="fas fa-users mr-2"></i> Customers
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-5">
                    {/* Sales Tab Content */}
                    {activeTab === 'sales' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                {/* Revenue Chart */}
                                <div className="p-5 bg-white rounded-lg shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">Revenue Trends</h3>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setTimeRange('monthly')}
                                                className={`px-3 py-1 text-xs font-medium ${timeRange === 'monthly' ? 'text-white bg-primary-600' : 'text-gray-700 bg-gray-100'} rounded-md hover:bg-gray-200`}
                                            >
                                                Monthly
                                            </button>
                                            <button
                                                onClick={() => setTimeRange('quarterly')}
                                                className={`px-3 py-1 text-xs font-medium ${timeRange === 'quarterly' ? 'text-white bg-primary-600' : 'text-gray-700 bg-gray-100'} rounded-md hover:bg-gray-200`}
                                            >
                                                Quarterly
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-80">
                                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                            <p className="text-gray-500">{timeRange === 'monthly' ? 'Monthly revenue chart' : 'Quarterly revenue chart'} will appear here</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Top Products */}
                                <div className="p-5 bg-white rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
                                    <div className="space-y-4">
                                        {topProducts.map((product) => (
                                            <div key={product.id} className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-10 h-10 rounded" src={product.image} alt="Product" />
                                                </div>
                                                <div className="flex-1 min-w-0 ml-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                                    <p className="text-sm text-gray-500">{product.price}</p>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-semibold text-gray-900">{product.sold} sold</p>
                                                    <p className={`text-xs ${product.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {product.change > 0 ? '+' : ''}{product.change}% from last period
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sales by Category */}
                            <div className="mt-5 p-5 bg-white rounded-lg shadow">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
                                <div className="h-80">
                                    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                        <p className="text-gray-500">Category sales chart will appear here</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Inventory Tab Content */}
                    {activeTab === 'inventory' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                {/* Inventory Turnover */}
                                <div className="p-5 bg-white rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Turnover</h3>
                                    <div className="h-80">
                                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                            <p className="text-gray-500">Inventory turnover chart will appear here</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stock Levels */}
                                <div className="p-5 bg-white rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Levels by Category</h3>
                                    <div className="h-80">
                                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                            <p className="text-gray-500">Stock levels chart will appear here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Low Stock Items */}
                            <div className="mt-5 p-5 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Low Stock Items</h3>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</a>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Product</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Current Stock</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Reorder Level</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Days of Stock</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {lowStockItems.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                <img className="w-10 h-10 rounded" src={item.image} alt="Product" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                                <div className="text-sm text-gray-500">{item.sku}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 text-sm font-semibold ${item.currentStock === 0 ? 'text-red-600' : 'text-yellow-600'} whitespace-nowrap`}>
                                                        {item.currentStock}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.reorderLevel}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.daysOfStock}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <a href="#" className="text-primary-600 hover:text-primary-900">Reorder</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Customers Tab Content */}
                    {activeTab === 'customers' && (
                        <>
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                {/* Customer Acquisition */}
                                <div className="p-5 bg-white rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Acquisition</h3>
                                    <div className="h-80">
                                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                            <p className="text-gray-500">Customer acquisition chart will appear here</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Retention */}
                                <div className="p-5 bg-white rounded-lg shadow">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Retention</h3>
                                    <div className="h-80">
                                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                                            <p className="text-gray-500">Customer retention chart will appear here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Customers */}
                            <div className="mt-5 p-5 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Top Customers by Revenue</h3>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</a>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Customer</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Orders</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Total Spend</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Avg. Order</th>
                                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {topCustomers.map((customer) => (
                                                <tr key={customer.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                <img className="w-10 h-10 rounded-full" src={customer.image} alt="Customer" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                                <div className="text-sm text-gray-500">{customer.company}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{customer.orders}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{customer.totalSpend}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{customer.avgOrder}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <a href="#" className="text-primary-600 hover:text-primary-900">View</a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Reports;