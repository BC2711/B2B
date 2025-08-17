import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BreadCrumb from '../../../components/BreadCrumb';
import Table from '../../../components/Table';
import PageHeaders from '../../../components/PageHeaders';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/buttons/SubmitButton';

// Define types for form data and table data
interface ProductFormData {
    product_name: string;
    sku: string;
}

interface ProductTableData {
    id: string;
    product: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: string;
    actions: React.ReactNode;
}

// Animation variants for tab content
const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

const Products: React.FC = memo(() => {
    const [activeTab, setActiveTab] = useState<'products' | 'add_product' | 'edit'>('products');
    const [formData, setFormData] = useState<ProductFormData>({ product_name: '', sku: '' });
    const [errors, setErrors] = useState<Partial<ProductFormData>>({});

    // Mock data for the table (replace with real data from API)
    const mockTableData: ProductTableData[] = [
        {
            id: '1',
            product: 'Laptop Pro',
            sku: 'LP123',
            category: 'Electronics',
            price: 999.99,
            stock: 50,
            status: 'In Stock',
            actions: (
                <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleTabChange('edit')}
                    aria-label={`Edit ${'Laptop Pro'}`}
                >
                    Edit
                </button>
            ),
        },
        {
            id: '2',
            product: 'Wireless Mouse',
            sku: 'WM456',
            category: 'Accessories',
            price: 29.99,
            stock: 10,
            status: 'Low Stock',
            actions: (
                <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleTabChange('edit')}
                    aria-label={`Edit ${'Wireless Mouse'}`}
                >
                    Edit
                </button>
            ),
        },
    ];

    // Handle tab change
    const handleTabChange = useCallback((tab: 'products' | 'add_product' | 'edit') => {
        setActiveTab(tab);
        if (tab !== 'add_product') {
            setFormData({ product_name: '', sku: '' });
            setErrors({});
        }
    }, []);

    // Handle form input changes
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }, []);

    // Validate form
    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<ProductFormData> = {};
        if (!formData.product_name.trim()) {
            newErrors.product_name = 'Product name is required';
        }
        if (!formData.sku.trim()) {
            newErrors.sku = 'SKU is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle form submission
    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (validateForm()) {
                console.log('Form submitted:', formData);
                // Add API call or logic to save product here
                handleTabChange('products');
            }
        },
        [formData, validateForm, handleTabChange],
    );

    return (
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-500 dark:bg-gray-900 rounded-2xl transition-colors">
            <BreadCrumb
                breadcrumbs={[
                    { path: '/admin', label: 'Dashboard' },
                    { path: '/admin/inventory', label: 'Inventory' },
                    { path: '/admin/products', label: 'Products' },
                ]}
            />

            {/* Page Header with enhanced styling */}
            <PageHeaders
                name="Products"
                // headingLevel="h1"
                className="mb-8"
            >
                <SubmitButton
                    name="Add New Product"
                    type="button"
                    method={() => handleTabChange('add_product')}
                    className="px-4 py-2"
                    ariaLabel="Navigate to add product form"
                />
            </PageHeaders>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors">
                {/* Tab Navigation */}
                <nav
                    className="flex border-b border-gray-200 dark:border-gray-700 p-3 space-x-4"
                    aria-label="Inventory tabs"
                >
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'products'
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        onClick={() => handleTabChange('products')}
                        aria-current={activeTab === 'products' ? 'page' : undefined}
                        aria-label="View all products"
                    >
                        All Products
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'add_product'
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        onClick={() => handleTabChange('add_product')}
                        aria-current={activeTab === 'add_product' ? 'page' : undefined}
                        aria-label="Add new product"
                    >
                        Add Product
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'edit'
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        onClick={() => handleTabChange('edit')}
                        aria-current={activeTab === 'edit' ? 'page' : undefined}
                        aria-label="View stock alerts"
                    >
                        Stock Alerts
                    </button>
                </nav>

                {/* Tab Content */}
                <div className="p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'products' && (
                            <motion.div
                                key="products"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-6">
                                    All Products
                                </h2>
                                <Table
                                    columns={['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions']}
                                    sortedColumnData={mockTableData}
                                />
                            </motion.div>
                        )}

                        {activeTab === 'add_product' && (
                            <motion.div
                                key="add_product"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-6">
                                    Add Product
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                                    <div>
                                        <Input
                                            labelName="Product Name"
                                            name="product_name"
                                            placeholder="Enter product name"
                                            value={formData.product_name}
                                            onChange={handleInputChange}
                                            error={errors.product_name}
                                            aria-required="true"
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            labelName="SKU"
                                            name="sku"
                                            placeholder="Enter product SKU"
                                            value={formData.sku}
                                            onChange={handleInputChange}
                                            error={errors.sku}
                                            aria-required="true"
                                        />
                                    </div>
                                    <div className="flex space-x-3">
                                        <SubmitButton
                                            name="Save Product"
                                            isSubmitting={false}
                                            method={handleSubmit}
                                            ariaLabel="Submit product form"
                                        />
                                        <SubmitButton
                                            name="Cancel"
                                            type="button"
                                            method={() => handleTabChange('products')}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                                            ariaLabel="Cancel and return to products"
                                        />
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'edit' && (
                            <motion.div
                                key="edit"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                                        Stock Alerts
                                    </h2>
                                    <Link
                                        to="/admin/inventory/restock"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                                        aria-label="Restock items"
                                    >
                                        <i className="fas fa-plus mr-2" aria-hidden="true" />
                                        Restock Items
                                    </Link>
                                </div>
                                <Table
                                    columns={['Product', 'SKU', 'Current Stock', 'Reorder Level', 'Status', 'Actions']}
                                    sortedColumnData={mockTableData.map((item) => ({
                                        ...item,
                                        currentStock: item.stock,
                                        reorderLevel: 20,
                                        actions: (
                                            <Link
                                                to={`/admin/inventory/restock/${item.id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                                aria-label={`Restock ${item.product}`}
                                            >
                                                Restock
                                            </Link>
                                        ),
                                    }))}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
});

Products.displayName = 'Products';

export default Products;