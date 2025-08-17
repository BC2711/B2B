import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BreadCrumb from '../../../components/BreadCrumb';
import { FaFilter, FaSort } from 'react-icons/fa';

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
}

interface Category {
    id: number;
    name: string;
    description: string;
    icon: string;
    productsCount: number;
    status: 'active' | 'inactive';
}

// Memoize to prevent unnecessary re-renders
const Inventory: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'alerts'>('products');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [sortOption, setSortOption] = useState('Name (A-Z)');

    // Sample data
    const products: Product[] = [
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            description: 'High-quality audio',
            sku: 'WH-AUD-1001',
            category: 'Electronics',
            price: '$89.99',
            stock: 142,
            status: 'active',
            image: 'https://via.placeholder.com/40',
        },
        {
            id: 2,
            name: 'Organic Cotton T-Shirt',
            description: 'Sustainable apparel',
            sku: 'WH-APP-2005',
            category: 'Clothing',
            price: '$19.99',
            stock: 87,
            status: 'active',
            image: 'https://via.placeholder.com/40',
        },
        {
            id: 3,
            name: 'Stainless Steel Water Bottle',
            description: 'Eco-friendly accessory',
            sku: 'WH-ACC-3012',
            category: 'Home & Garden',
            price: '$24.95',
            stock: 23,
            status: 'low',
            image: 'https://via.placeholder.com/40',
        },
        {
            id: 4,
            name: 'Bluetooth Speaker',
            description: 'Portable audio',
            sku: 'WH-AUD-1005',
            category: 'Electronics',
            price: '$59.99',
            stock: 0,
            status: 'out',
            image: 'https://via.placeholder.com/40',
        },
    ];

    const categories: Category[] = [
        {
            id: 1,
            name: 'Electronics',
            description: 'Electronic devices and accessories',
            icon: 'fas fa-laptop',
            productsCount: 42,
            status: 'active',
        },
        {
            id: 2,
            name: 'Clothing',
            description: 'Apparel and fashion items',
            icon: 'fas fa-tshirt',
            productsCount: 28,
            status: 'active',
        },
        {
            id: 3,
            name: 'Home & Garden',
            description: 'Home improvement and decor',
            icon: 'fas fa-home',
            productsCount: 35,
            status: 'active',
        },
        {
            id: 4,
            name: 'Kitchenware',
            description: 'Kitchen tools and equipment',
            icon: 'fas fa-utensils',
            productsCount: 19,
            status: 'active',
        },
    ];

    // Filter and sort products
    const filteredProducts = categoryFilter === 'All Categories'
        ? products
        : products.filter((p) => p.category === categoryFilter);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'Name (A-Z)': return a.name.localeCompare(b.name);
            case 'Name (Z-A)': return b.name.localeCompare(a.name);
            case 'Price (Low-High)': return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
            case 'Price (High-Low)': return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
            case 'Stock (Low-High)': return a.stock - b.stock;
            default: return 0;
        }
    });

    const stockAlerts = sortedProducts.filter((p) => p.stock <= 23);

    // Use useCallback for handlers
    const handleTabChange = useCallback((tab: 'products' | 'categories' | 'alerts') => {
        setActiveTab(tab);
    }, []);

    const getStatusBadge = useCallback((status: string) => {
        switch (status) {
            case 'active':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Active
                    </span>
                );
            case 'low':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                        Low Stock
                    </span>
                );
            case 'out':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Out of Stock
                    </span>
                );
            case 'critical':
                return (
                    <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Critical
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

    // Animation variants for tab content
    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    // Animation variants for table rows
    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
        }),
    };

    return (
        <main className="flex-1 overflow-auto p-6 bg-gray-50 rounded-[20px]">
            <BreadCrumb
                breadcrumbs={[
                    { path: '/admin', label: 'Dashboard' },
                    { path: '/admin/inventory', label: 'Inventory Management' },
                ]}
            />

            {/* Page Header with fade-in animation */}
            <motion.div
                className="flex items-center justify-between mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
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
                        Add Product
                    </Link>
                </div>
            </motion.div>

            {/* Inventory Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px" aria-label="Inventory tabs">
                        {(['products', 'categories', 'alerts'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`py-4 px-6 text-sm font-medium text-center border-b-2 ${activeTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors whitespace-nowrap`}
                                aria-current={activeTab === tab ? 'page' : undefined}
                            >
                                <i
                                    className={`mr-2 ${tab === 'products'
                                            ? 'fas fa-box'
                                            : tab === 'categories'
                                                ? 'fas fa-tags'
                                                : 'fas fa-exclamation-triangle'
                                        }`}
                                />
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content with animation */}
                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'products' && (
                            <motion.div
                                key="products"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
                                    <div className="flex space-x-3">
                                        <div className="relative">
                                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={categoryFilter}
                                                onChange={(e) => setCategoryFilter(e.target.value)}
                                                className="pl-10 pr-3 py-2 text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                                aria-label="Filter by category"
                                            >
                                                <option>All Categories</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.name}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="relative">
                                            <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <select
                                                value={sortOption}
                                                onChange={(e) => setSortOption(e.target.value)}
                                                className="pl-10 pr-3 py-2 text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                                aria-label="Sort products"
                                            >
                                                {['Name (A-Z)', 'Name (Z-A)', 'Price (Low-High)', 'Price (High-Low)', 'Stock (Low-High)'].map(
                                                    (option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {[
                                                    'Product',
                                                    'SKU',
                                                    'Category',
                                                    'Price',
                                                    'Stock',
                                                    'Status',
                                                    'Actions',
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
                                            {sortedProducts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No products found
                                                    </td>
                                                </tr>
                                            ) : (
                                                sortedProducts.map((product, index) => (
                                                    <motion.tr
                                                        key={product.id}
                                                        variants={rowVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={index}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <img
                                                                    className="w-10 h-10 rounded object-cover"
                                                                    src={product.image}
                                                                    alt={`${product.name} thumbnail`}
                                                                    loading="lazy"
                                                                />
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                                    <div className="text-sm text-gray-500">{product.description}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{product.sku}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{product.category}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{product.price}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{product.stock}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(product.status)}</td>
                                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                            <Link
                                                                to={`/admin/inventory/edit-product/${product.id}`}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                                aria-label={`Edit ${product.name}`}
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                className="text-red-600 hover:text-red-900"
                                                                aria-label={`Delete ${product.name}`}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                                    <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to{' '}
                                            <span className="font-medium">{sortedProducts.length}</span> of{' '}
                                            <span className="font-medium">{sortedProducts.length}</span> results
                                        </p>
                                        <nav className="flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            <button
                                                className="px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                aria-label="Previous page"
                                            >
                                                <i className="fas fa-chevron-left" />
                                            </button>
                                            {[1, 2, 3].map((page) => (
                                                <button
                                                    key={page}
                                                    className={`px-4 py-2 text-sm font-medium ${page === 1
                                                            ? 'text-indigo-600 border-indigo-500 bg-indigo-50'
                                                            : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-50'
                                                        } border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                                    aria-current={page === 1 ? 'page' : undefined}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                className="px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                aria-label="Next page"
                                            >
                                                <i className="fas fa-chevron-right" />
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'categories' && (
                            <motion.div
                                key="categories"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Product Categories</h2>
                                    <Link
                                        to="/admin/inventory/add-category"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                        aria-label="Add new category"
                                    >
                                        <i className="fas fa-plus mr-2" />
                                        Add Category
                                    </Link>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {['Category Name', 'Description', 'Products', 'Status', 'Actions'].map(
                                                    (header) => (
                                                        <th
                                                            key={header}
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                        >
                                                            {header}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {categories.map((category, index) => (
                                                <motion.tr
                                                    key={category.id}
                                                    variants={rowVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    custom={index}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`flex items-center justify-center w-10 h-10 rounded ${category.icon.includes('laptop')
                                                                        ? 'bg-blue-100 text-blue-600'
                                                                        : category.icon.includes('tshirt')
                                                                            ? 'bg-purple-100 text-purple-600'
                                                                            : category.icon.includes('home')
                                                                                ? 'bg-green-100 text-green-600'
                                                                                : 'bg-yellow-100 text-yellow-600'
                                                                    }`}
                                                            >
                                                                <i className={`${category.icon} text-lg`} />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{category.productsCount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(category.status)}</td>
                                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                        <Link
                                                            to={`/admin/inventory/edit-category/${category.id}`}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                            aria-label={`Edit ${category.name}`}
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            className="text-red-600 hover:text-red-900"
                                                            aria-label={`Delete ${category.name}`}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'alerts' && (
                            <motion.div
                                key="alerts"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Stock Alerts</h2>
                                    <Link
                                        to="/admin/inventory/restock"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                        aria-label="Restock items"
                                    >
                                        <i className="fas fa-plus mr-2" />
                                        Restock Items
                                    </Link>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {['Product', 'SKU', 'Current Stock', 'Reorder Level', 'Status', 'Actions'].map(
                                                    (header) => (
                                                        <th
                                                            key={header}
                                                            scope="col"
                                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                        >
                                                            {header}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {stockAlerts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No stock alerts at this time
                                                    </td>
                                                </tr>
                                            ) : (
                                                stockAlerts.map((product, index) => (
                                                    <motion.tr
                                                        key={product.id}
                                                        variants={rowVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={index}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <img
                                                                    className="w-10 h-10 rounded object-cover"
                                                                    src={product.image}
                                                                    alt={`${product.name} thumbnail`}
                                                                    loading="lazy"
                                                                />
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                                    <div className="text-sm text-gray-500">{product.description}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{product.sku}</td>
                                                        <td className="px-6 py-4 text-sm font-semibold text-red-600 whitespace-nowrap">
                                                            {product.stock}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            {product.stock < 10 ? 10 : 25}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {product.stock === 0
                                                                ? getStatusBadge('out')
                                                                : product.stock < 10
                                                                    ? getStatusBadge('critical')
                                                                    : getStatusBadge('low')}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                            <Link
                                                                to={`/admin/inventory/restock/${product.id}`}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                                aria-label={`Restock ${product.name}`}
                                                            >
                                                                Restock
                                                            </Link>
                                                            <Link
                                                                to={`/admin/inventory/view/${product.id}`}
                                                                className="text-gray-600 hover:text-gray-900"
                                                                aria-label={`View ${product.name}`}
                                                            >
                                                                View
                                                            </Link>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
});

// Add display name for better debugging
Inventory.displayName = 'Inventory';

export default Inventory;