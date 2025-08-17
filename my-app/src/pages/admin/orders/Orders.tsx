import React, { useState } from 'react';
import {
    FaDownload, FaPlus, FaList, FaClock, FaCheckCircle,
    FaShoppingCart, FaEdit, FaEllipsisV, FaChevronLeft,
    FaChevronRight, FaFilter, FaSyncAlt,
} from 'react-icons/fa';
import type { Order } from '../../../types/InterfaceTypes';
import BreadCrumb from '../../../components/BreadCrumb';
import Input from '../../../components/Input';


const Orders: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [status, setStatus] = useState('');

    // Sample data
    const orders: Order[] = [
        {
            id: '1',
            orderId: '#WH-10025',
            poNumber: 'PO #45678',
            customer: 'Global Suppliers Inc.',
            email: 'john.smith@globalsuppliers.com',
            date: 'Jun 12, 2023',
            dueDate: 'Jun 19, 2023',
            items: 12,
            units: 15,
            total: '$3,245.50',
            paid: '$1,500.00',
            status: 'Processing'
        },
        {
            id: '2',
            orderId: '#WH-10024',
            poNumber: 'PO #45677',
            customer: 'Bulk Buy Distributors',
            email: 'sarah@bulkbuydist.com',
            date: 'Jun 10, 2023',
            dueDate: 'Jun 17, 2023',
            items: 8,
            units: 24,
            total: '$4,780.00',
            paid: '$4,780.00',
            status: 'Shipped'
        },
        {
            id: '3',
            orderId: '#WH-10023',
            poNumber: 'PO #45676',
            customer: 'Trade Partners LLC',
            email: 'mike@tradepartners.com',
            date: 'Jun 8, 2023',
            dueDate: 'Jun 15, 2023',
            items: 5,
            units: 10,
            total: '$1,890.75',
            paid: '$0.00',
            status: 'Payment Due'
        },
        {
            id: '4',
            orderId: '#WH-10022',
            poNumber: 'PO #45675',
            customer: 'Global Suppliers Inc.',
            email: 'john.smith@globalsuppliers.com',
            date: 'Jun 5, 2023',
            dueDate: 'Jun 12, 2023',
            items: 15,
            units: 32,
            total: '$5,420.25',
            paid: '$5,420.25',
            status: 'Delivered'
        }
    ];

    // Filter orders based on active tab
    const filteredOrders = orders.filter(order => {
        if (activeTab === 'pending') {
            return order.status === 'Processing' || order.status === 'Payment Due';
        }
        if (activeTab === 'completed') {
            return order.status === 'Shipped' || order.status === 'Delivered';
        }
        return true;
    });

    // Get status color
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Processing':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
            case 'Shipped':
                return { bg: 'bg-green-100', text: 'text-green-800' };
            case 'Payment Due':
                return { bg: 'bg-red-100', text: 'text-red-800' };
            case 'Delivered':
                return { bg: 'bg-blue-100', text: 'text-blue-800' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-800' };
        }
    };

    return (
        <main className="flex-1 overflow-auto p-4 bg-gray-50 rounded-[20px]">
            <BreadCrumb breadcrumbs={[{ path: '/admin/sales', label: 'Orders' }]} />
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
                <div className="flex space-x-2">
                    <button className="flex space-x-2 gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaDownload /> Export
                    </button>
                    <button className="flex space-x-2 gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaPlus /> New Order
                    </button>
                </div>
            </div>

            {/* Filters and Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`w-1/3 flex space-x-2 gap-2 py-3 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'all'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <FaList /> All Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`w-1/3 flex space-x-2 gap-2 py-3 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'pending'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <FaClock /> Pending
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`w-1/3 flex space-x-2 gap-2 py-3 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'completed'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <FaCheckCircle /> Completed
                        </button>
                    </nav>
                </div>

                {/* Filter Row */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2">
                            {/* <span className="text-sm text-gray-600">Filter:</span> */}
                            <Input
                                labelName='Order ID'
                                id='order_id'
                                type='text'
                                name='order_id'
                                icon={FaFilter}  // Note: Pass the component itself, not JSX
                                method={(value) => console.log(value)} // Add your handler
                                value={dateFrom} // Should come from state
                                placeholder='#Order ID'
                            />

                            <Input
                                labelName='Date: From'
                                id='date_from'  // Changed to unique ID
                                type='date'    // Better type for dates
                                name='date_from'
                                icon={FaFilter}
                                method={(value) => setDateFrom(value)} // Example state handler
                                value={dateFrom}
                                placeholder='Select start date'
                            />

                            <Input
                                labelName='Date: To'
                                id='date_to'    // Changed to unique ID
                                type='date'    // Better type for dates
                                name='date_to'
                                icon={FaFilter}
                                method={(value) => setDateTo(value)} // Example state handler
                                value={dateTo}
                                placeholder='Select end date'
                            />

                            <Input
                                labelName='Status'
                                id='status'
                                type='text'
                                name='status'
                                method={(value) => setStatus(value)} // Example state handler
                                value={status}
                                placeholder='Status'
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="flex space-x-2 gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                <FaFilter /> More Filters
                            </button>
                            <button className="flex space-x-2 gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                <FaSyncAlt /> Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.map((order) => {
                                const statusColor = getStatusColor(order.status);
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <FaShoppingCart />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                                                    <div className="text-sm text-gray-500">{order.poNumber}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                                            <div className="text-sm text-gray-500">{order.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{order.date}</div>
                                            <div className="text-sm text-gray-500">Due: {order.dueDate}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{order.items} items</div>
                                            <div className="text-sm text-gray-500">{order.units} units</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.total}</div>
                                            <div className="text-sm text-gray-500">Paid: {order.paid}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor.bg} ${statusColor.text}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-primary-600 hover:text-primary-900 mr-3">
                                                <FaEdit />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                <FaEllipsisV />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Previous
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                                <span className="font-medium">124</span> orders
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Previous</span>
                                    <FaChevronLeft />
                                </button>
                                <button
                                    aria-current="page"
                                    className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    1
                                </button>
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    2
                                </button>
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    3
                                </button>
                                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                    ...
                                </span>
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                    8
                                </button>
                                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>
                                    <FaChevronRight />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Orders;