import React, { useCallback } from 'react';

import BreadCrumb from '../../../components/BreadCrumb';
import PageHeaders from '../../../components/PageHeaders';
import SubmitButton from '../../../components/buttons/SubmitButton';
import FilterInput from '../../../components/FilterInput';
import { motion, AnimatePresence } from 'framer-motion';
import { tabVariants, type Order } from '../../../types/InterfaceTypes';
import Table from '../../../components/Table';
import { useApiQuery } from '../../../hooks/useApiQuery';



const Orders: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'orders'>('orders');
    const handleTabChange = useCallback((tab: 'orders') => {
        setActiveTab(tab);
    }, []);

    const { data: response, isLoading, error } = useApiQuery<Order[]>(
        ['orders'],
        '/orders/orders',
        'GET'
    );

    const ordersData = response?.data || [];
    const columns =  Object.keys(ordersData);

    return (
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 rounded-2xl transition-colors">
            <BreadCrumb
                breadcrumbs={[
                    { path: '/admin', label: 'Dashboard' },
                    { path: '/admin/#', label: 'Orders' },
                    { path: '/admin/orders', label: 'ALL Orders' },
                ]}
            />

            {/* Page Header with enhanced styling */}
            <PageHeaders name="All Orders" className="mb-8">
                <SubmitButton
                    name="Export"
                    type="button"
                    method={() => handleTabChange('orders')}
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
                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <Table
                                    columns={columns}
                                    sortedColumnData={ordersData}
                                />
                            </motion.div>
                        )}


                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
};

export default Orders;