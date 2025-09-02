import React, { useCallback, useState, useMemo } from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import PageHeaders from '../../../components/PageHeaders';
import SubmitButton from '../../../components/buttons/SubmitButton';
import FilterInput from '../../../components/FilterInput';
import { motion, AnimatePresence } from 'framer-motion';
import { tabVariants } from '../../../types/InterfaceTypes';
import Table from '../../../components/Table';
import CustomerForm from './CustomerForm';
import { useApiQuery } from '../../../hooks/useApiQuery';

// Define the customer interface
interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  role?: string;
  status?: string;
  totalSpend?: number;
  lastOrder?: string;
}

const Customer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customer_list' | 'create' | 'edit'>('customer_list');
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');

  const handleTabChange = useCallback((tab: 'customer_list' | 'create' | 'edit') => {
    setActiveTab(tab);
  }, []);

  const { data: response, isLoading, error } = useApiQuery<Customer[]>(
    ['customers'],
    '/users',
    'GET'
  );

  // Define fixed columns to avoid dynamic key issues
  const columns = [
    '#',
    'first_name',
    'last_name',
    'email',
    'phone_number',
    'role',
    'status',
  ];

  // Extract and filter customer data
  const customers = useMemo(() => {
    const data = response?.data || [];
    if (!orderIdFilter && !customerFilter) return data;
    return data.filter((customer) => {
      const matchesOrderId = orderIdFilter
        ? customer.id.toString().includes(orderIdFilter)
        : true;
      const matchesCustomer = customerFilter
        ? `${customer.first_name} ${customer.last_name}`
            .toLowerCase()
            .includes(customerFilter.toLowerCase())
        : true;
      return matchesOrderId && matchesCustomer;
    });
  }, [response, orderIdFilter, customerFilter]);

  // Handle search submission
  const handleSearch = useCallback(() => {
    // Trigger filtering (already handled by useMemo)
    console.log('Searching with:', { orderIdFilter, customerFilter });
  }, [orderIdFilter, customerFilter]);

  return (
    <main className="flex-1 overflow-auto p-4 bg-gray-50 rounded-[20px]">
      <BreadCrumb
        breadcrumbs={[
          { path: '/admin', label: 'Dashboard' },
          { path: '/admin/customers', label: 'Customers' },
        ]}
      />

      <PageHeaders name="Customers" className="mb-8">
        <SubmitButton
          name="Add New Customer"
          type="button"
          method={() => handleTabChange('create')}
          className="px-4 py-2"
          ariaLabel="Navigate to add customer form"
        />
      </PageHeaders>

      <div className="bg-gray-50 rounded-lg shadow-sm transition-colors">
        <nav
          className="flex border-b border-gray-200 dark:border-gray-700 p-3 space-x-4"
          aria-label="Customer tabs"
        >
          <FilterInput
            placeholder="Order ID"
            value={orderIdFilter}
            onChange={(e) => setOrderIdFilter(e.target.value)}
            ariaLabel="Filter by order ID"
          />
          <FilterInput
            placeholder="Customer"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            ariaLabel="Filter by customer name"
          />
          <SubmitButton
            name="Search"
            type="button"
            method={handleSearch}
            ariaLabel="Search customers"
          />
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
                {isLoading && (
                  <p className="text-center text-sm text-gray-500" aria-live="polite">
                    Loading customers...
                  </p>
                )}
                {error && (
                  <p
                    className="text-center text-sm text-red-500"
                    aria-live="assertive"
                    role="alert"
                  >
                    Error fetching customers: {error.message}
                  </p>
                )}
                {!isLoading && !error && (
                  <Table columns={columns} sortedColumnData={customers} />
                )}
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
                <CustomerForm onSuccess={() => handleTabChange('customer_list')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Customer;