import React, { useCallback, useState } from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import PageHeaders from '../../../components/PageHeaders';
import SubmitButton from '../../../components/buttons/SubmitButton';
import FilterInput from '../../../components/FilterInput';
import { motion, AnimatePresence } from 'framer-motion';
import { tabVariants } from '../../../types/InterfaceTypes';
import Table from '../../../components/Table';
import CustomerForm from './CustomerForm';

const Customer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'customer_list' | 'create' | 'edit'>('customer_list');
    const handleTabChange = useCallback((tab: 'customer_list' | 'create' | 'edit') => {
        setActiveTab(tab);
    }, []);


    return (
        <main className="flex-1 overflow-auto p-4 bg-gray-50 rounded-[20px]">
            <BreadCrumb
                breadcrumbs={[
                    { path: '/admin', label: 'Dashboard' },
                    { path: '/admin/#', label: 'Cutomers' },
                ]}
            />

            <PageHeaders name="Customers" className="mb-8">
                <SubmitButton
                    name="Add New Group"
                    type="button"
                    method={() => handleTabChange('create')}
                    className="px-4 py-2"
                    ariaLabel="Navigate to add product form"
                />
            </PageHeaders>
            <div className="bg-gray-50 rounded-lg shadow-sm transition-colors">
                <nav
                    className="flex border-b border-gray-200 dark:border-gray-700 p-3 space-x-4"
                    aria-label="Orders tabs"
                >
                    <FilterInput placeholder='Order ID' />
                    <FilterInput placeholder='Customer' />
                    <SubmitButton name='Search' />

                </nav>
                <div className="p-4 sm:p-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'customer_list' && (
                            <motion.div
                                key="customer_list"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <Table
                                    columns={['#', 'name', 'email', 'avatar', 'company', 'group', 'orders', 'totalSpend', 'lastOrder']}
                                    sortedColumnData={[]}
                                />
                            </motion.div>
                        )}

                        {activeTab === 'create' && (
                            <motion.div
                                key="create"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <CustomerForm />
                            </motion.div>
                        )}


                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
};

export default Customer;