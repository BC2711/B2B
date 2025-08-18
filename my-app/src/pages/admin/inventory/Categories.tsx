import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BreadCrumb from '../../../components/BreadCrumb';
import PageHeaders from '../../../components/PageHeaders';
import SubmitButton from '../../../components/buttons/SubmitButton';
import { tabVariants } from '../../../types/InterfaceTypes';
import Table from '../../../components/Table';
import CategoryForm from './CategoryForm';
import FilterInput from '../../../components/FilterInput';

const Categories: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'categories' | 'add_category' | 'edit'>('categories');
    // Handle tab change
    const handleTabChange = useCallback((tab: 'categories' | 'add_category' | 'edit') => {
        setActiveTab(tab);
    }, []);
    return (
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 rounded-2xl transition-colors">
            <BreadCrumb
                breadcrumbs={[
                    { path: '/admin', label: 'Dashboard' },
                    { path: '/admin/inventory', label: 'Inventory' },
                    { path: '/admin/categories', label: 'Categories' },
                ]}
            />

            {/* Page Header with enhanced styling */}
            <PageHeaders
                name="Categories"
                // headingLevel="h1"
                className="mb-8"
            >
                <SubmitButton
                    name="Add New Category"
                    type="button"
                    method={() => handleTabChange('add_category')}
                    className="px-4 py-2"
                    ariaLabel="Navigate to add category form"
                />
            </PageHeaders>
            <div className="bg-gray-50 p-1 rounded-lg shadow-sm transition-colors">
                <nav
                    className="flex border-b border-gray-500 p-3 space-x-4"
                    aria-label="Inventory tabs"
                >
                    <FilterInput placeholder='Category Name'   />
                    <FilterInput placeholder='Status' />

                    <SubmitButton name='Search' />
                    {/* <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'categories'
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        onClick={() => handleTabChange('categories')}
                        aria-current={activeTab === 'categories' ? 'page' : undefined}
                        aria-label="View all categories"
                    >
                        All Categories
                    </button> */}
                    {/* <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'add_category'
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        onClick={() => handleTabChange('add_category')}
                        aria-current={activeTab === 'add_category' ? 'page' : undefined}
                        aria-label="Add new category"
                    >
                        Add Category
                    </button> */}
                    {/* <button
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'edit'
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        onClick={() => handleTabChange('edit')}
                        aria-current={activeTab === 'edit' ? 'page' : undefined}
                        aria-label="View stock alerts"
                    >
                        Edit
                    </button> */}
                </nav>
                {activeTab === 'categories' && (
                    <motion.div
                        key="categories"
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Table
                            columns={['#', 'Category Name', 'Description', 'Icon', 'Products Count', 'Status', 'Actions']}
                            sortedColumnData={[]}
                        />
                    </motion.div>)}
                {activeTab === 'add_category' && (
                    <motion.div
                        key="add_category"
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <CategoryForm
                            onSubmit={(values) => console.log(values)}
                            initialValues={{}}
                            isLoading={false}
                        />
                    </motion.div>)}

                {activeTab === 'edit' && (
                    <motion.div
                        key="edit"
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <CategoryForm
                            onSubmit={(values) => console.log(values)}
                            initialValues={{}}
                            isLoading={false}
                        />
                    </motion.div>)}
            </div>
        </main>
    )
}

export default Categories