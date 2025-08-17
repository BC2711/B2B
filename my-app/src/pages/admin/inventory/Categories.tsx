import React from 'react';
import { motion } from 'framer-motion';
import BreadCrumb from '../../../components/BreadCrumb'
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';

interface Product {
    id: number;
    name: string;
    description: string;
    sku: string;
    category: string;
    price: string;
    stock: number;
    status: 'active' | 'low' | 'out';
    image: string;
    actions: string;
}
const Categories: React.FC = () => {
    return (
        <main className="flex-1 overflow-auto p-6 bg-gray-50 rounded-[20px]">
            <BreadCrumb breadcrumbs={[
                { path: '/admin', label: 'Dashboard' },
                { path: '/admin/#', label: 'Inventory Management' },
                { path: '/admin/categories', label: 'Categories' },
            ]} />

            <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                <div className="flex space-x-3">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        aria-label="Export inventory data"
                    >
                        <i className="fas fa-download mr-2" />
                        Export
                    </button>
                    <Link
                        to="/admin/inventory/add-product"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        aria-label="Add new product"
                    >
                        <i className="fas fa-plus mr-2" />
                        Add Category
                    </Link>
                </div>
            </motion.div>

            <Table
                columns={[
                    '#',
                    'Category Name',
                    'Description',
                    'Icon',
                    'Products Count',
                    'Status',
                    'Actions'
                ]}
                sortedColumnData={[]} />

        </main>
    )
}

export default Categories