import React, { useCallback } from 'react'
import BreadCrumb from '../../../components/BreadCrumb';
import PageHeaders from '../../../components/PageHeaders';
import SubmitButton from '../../../components/buttons/SubmitButton';
import FilterInput from '../../../components/FilterInput';
import { motion, AnimatePresence } from 'framer-motion';
import { tabVariants } from '../../../types/InterfaceTypes';
import Table from '../../../components/Table';

const Pending: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'pending_orders'>('pending_orders');
    const handleTabChange = useCallback((tab: 'pending_orders') => {
        setActiveTab(tab);
    }, []);
    return (
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50 rounded-2xl transition-colors">
            <BreadCrumb
                breadcrumbs={[
                    { path: '/admin', label: 'Dashboard' },
                    { path: '/admin/#', label: 'Orders' },
                    { path: '/admin/pending', label: 'Pending Orders' },
                ]}
            />

            {/* Page Header with enhanced styling */}
            <PageHeaders name="Pending Orders" className="mb-8">
                <SubmitButton
                    name="Export"
                    type="button"
                    method={() => handleTabChange('pending_orders')}
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
                        {activeTab === 'pending_orders' && (
                            <motion.div
                                key="pending_orders"
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <Table
                                    columns={['Order ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'Actions']}
                                    sortedColumnData={[]}
                                />
                            </motion.div>
                        )}


                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}

export default Pending