import React, { useState } from 'react';
import {
    FaDownload, FaPlus, FaUsers, FaUserPlus, FaUserCheck,
    FaMoneyBillWave, FaTags, FaChartLine, FaChevronLeft,
    FaChevronRight, FaBoxes, FaStore, FaCrown
} from 'react-icons/fa';
import type { Customer, CustomerGroup } from '../../../types/InterfaceTypes';

const Customer: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedGroup, setSelectedGroup] = useState('All Groups');
    const [sortBy, setSortBy] = useState('Name (A-Z)');

    // Sample data
    const customers: Customer[] = [
        {
            id: '1',
            name: 'Michael Johnson',
            email: 'michael@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            company: 'Global Suppliers Inc.',
            group: 'Wholesale',
            orders: 24,
            totalSpend: '$24,780',
            lastOrder: 'May 15, 2023'
        },
        {
            id: '2',
            name: 'Sarah Williams',
            email: 'sarah@example.com',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            company: 'Retail Ventures LLC',
            group: 'VIP',
            orders: 18,
            totalSpend: '$18,450',
            lastOrder: 'May 12, 2023'
        },
        {
            id: '3',
            name: 'David Brown',
            email: 'david@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
            company: 'Bulk Buy Distributors',
            group: 'Wholesale',
            orders: 12,
            totalSpend: '$9,870',
            lastOrder: 'May 10, 2023'
        },
        {
            id: '4',
            name: 'Jennifer Lee',
            email: 'jennifer@example.com',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            company: 'Urban Retail Group',
            group: 'Retail',
            orders: 8,
            totalSpend: '$5,430',
            lastOrder: 'May 8, 2023'
        }
    ];

    const groups: CustomerGroup[] = [
        {
            id: '1',
            name: 'Wholesale',
            description: 'Bulk purchasers with discounts',
            icon: <FaBoxes className="text-xl" />,
            customers: 342,
            avgOrderValue: '$2,450',
            discountLevel: '15-30%',
            color: 'blue'
        },
        {
            id: '2',
            name: 'Retail',
            description: 'Smaller quantity purchasers',
            icon: <FaStore className="text-xl" />,
            customers: 567,
            avgOrderValue: '$450',
            discountLevel: '5-10%',
            color: 'green'
        },
        {
            id: '3',
            name: 'VIP',
            description: 'High-value preferred customers',
            icon: <FaCrown className="text-xl" />,
            customers: 89,
            avgOrderValue: '$5,780',
            discountLevel: '25-40%',
            color: 'purple'
        }
    ];

    // Stats cards data
    const stats = [
        {
            name: 'Total Customers',
            value: '1,245',
            change: '+8.2%',
            icon: <FaUsers className="text-xl" />,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            name: 'New This Month',
            value: '42',
            change: '+12.5%',
            icon: <FaUserPlus className="text-xl" />,
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            name: 'Active Customers',
            value: '876',
            change: '+3.1%',
            icon: <FaUserCheck className="text-xl" />,
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        {
            name: 'Avg. Order Value',
            value: '$1,245',
            change: '+5.8%',
            icon: <FaMoneyBillWave className="text-xl" />,
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600'
        }
    ];

    // Tab components
    const AllCustomersTab = () => (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Customer Directory</h2>
                <div className="flex space-x-2">
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        className="block w-full py-2 pl-3 pr-10 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                        <option>All Groups</option>
                        <option>Wholesale</option>
                        <option>Retail</option>
                        <option>VIP</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="block w-full py-2 pl-3 pr-10 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                        <option>Name (A-Z)</option>
                        <option>Name (Z-A)</option>
                        <option>Recent Activity</option>
                        <option>Total Spending</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Customer</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Company</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Group</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Orders</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Total Spend</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Last Order</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            <img className="w-10 h-10 rounded-full" src={customer.avatar} alt={customer.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                            <div className="text-sm text-gray-500">{customer.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{customer.company}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${customer.group === 'Wholesale' ? 'text-blue-800 bg-blue-100' :
                                        customer.group === 'Retail' ? 'text-green-800 bg-green-100' :
                                            'text-purple-800 bg-purple-100'
                                        }`}>
                                        {customer.group}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{customer.orders}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{customer.totalSpend}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{customer.lastOrder}</td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <button className="text-primary-600 hover:text-primary-900 mr-3">View</button>
                                    <button className="text-gray-600 hover:text-gray-900">Message</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">1,245</span> customers
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                                <span className="sr-only">Previous</span>
                                <FaChevronLeft />
                            </button>
                            <button aria-current="page" className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 border border-primary-500 bg-primary-50">1</button>
                            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">2</button>
                            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">3</button>
                            <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                                <span className="sr-only">Next</span>
                                <FaChevronRight />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );

    const GroupsTab = () => (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Customer Groups</h2>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                    <FaPlus /> New Group
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {groups.map((group) => (
                    <div key={group.id} className="overflow-hidden bg-white rounded-lg shadow">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 p-3 rounded-full ${group.bgColor} ${group.textColor}`}>
                                    {group.icon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                                    <p className="text-sm text-gray-500">{group.description}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Customers</span>
                                    <span className="text-sm font-medium text-gray-900">{group.customers}</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm text-gray-500">Avg. Order Value</span>
                                    <span className="text-sm font-medium text-gray-900">{group.avgOrderValue}</span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm text-gray-500">Discount Level</span>
                                    <span className="text-sm font-medium text-gray-900">{group.discountLevel}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-${group.color}-700 bg-${group.color}-600`}>
                                    Manage Group
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="overflow-hidden bg-white rounded-lg shadow border-2 border-dashed border-gray-300 hover:border-primary-500">
                    <div className="flex flex-col items-center justify-center p-10 text-center">
                        <div className="p-3 rounded-full bg-gray-100 text-gray-400">
                            <FaPlus />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Create New Group</h3>
                        <p className="mt-1 text-sm text-gray-500">Set up a new customer group with custom pricing</p>
                        <button className="mt-4 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100">
                            Add Group
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    const ActivityTab = () => (
        <>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Customer Activity</h2>
                <div className="flex space-x-2">
                    <select className="block w-full py-2 pl-3 pr-10 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Last Year</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="p-5 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Engagement</h3>
                    <div className="h-64">
                        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                            <p className="text-gray-500">Engagement chart will appear here</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {customers.slice(0, 3).map((customer) => (
                            <div key={customer.id} className="flex">
                                <div className="flex-shrink-0">
                                    <img className="w-10 h-10 rounded-full" src={customer.avatar} alt={customer.name} />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {customer.name} <span className="text-gray-500">
                                            {customer.id === '1' ? 'placed a new order' :
                                                customer.id === '2' ? 'requested a quote' : 'made a payment'}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {customer.id === '1' ? `Order #WH-1024 for ${customer.totalSpend}` :
                                            customer.id === '2' ? 'For 50 units of WH-AUD-1005' :
                                                `Payment of ${customer.totalSpend} received`}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {customer.id === '1' ? '2 hours ago' :
                                            customer.id === '2' ? '5 hours ago' : '1 day ago'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    const tabs = [
        { id: 'all', name: 'All Customers', icon: <FaUsers />, component: <AllCustomersTab /> },
        { id: 'groups', name: 'Groups', icon: <FaTags />, component: <GroupsTab /> },
        { id: 'activity', name: 'Activity', icon: <FaChartLine />, component: <ActivityTab /> }
    ];

    return (
        <main className="flex-1 overflow-auto p-4 bg-gray-50 rounded-[20px]">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaDownload  /> Export
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                        <FaPlus  /> New Customer
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="p-5 bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                            <span className="text-gray-500 text-sm ml-2">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Customers Tabs */}
            <div className="mt-6 bg-white rounded-lg shadow">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-6 text-sm font-medium text-center border-b-2 whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-5">
                    {tabs.find(tab => tab.id === activeTab)?.component}
                </div>
            </div>
        </main>
    );
};

export default Customer;