import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../layouts/admin/Sidebar';
import Navbar from '../layouts/admin/Navbar';
import Dashboard from '../layouts/admin/Dashboard';
import Products from '../pages/admin/inventory/Products';
import Orders from '../pages/admin/orders/Orders';
import Settings from '../pages/admin/settings/Settings';
import Customer from '../pages/admin/customer/Customer';
import Categories from '../pages/admin/inventory/Categories';
import StockAlert from '../pages/admin/inventory/StockAlert';
import Pending from '../pages/admin/orders/Pending';
import Completed from '../pages/admin/orders/Completed';
import Group from '../pages/admin/customer/Group';
import Sales from '../pages/admin/reports/Sales';
import InventoryReport from '../pages/admin/reports/InventoryReport';

const Admin: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prev => !prev);
    };

    // Auth check (uncomment when ready)
    // const { authToken } = useAuth();
    // if (!authToken) {
    //     return <Navigate to="/auth/login" />;
    // }

    return (
        <div className="h-screen overflow-hidden relative bgImage">
            {/* Semi-transparent overlay for better readability */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-30" /> */}

            <div className="flex h-full relative z-10">
                <Sidebar isCollapsed={isSidebarCollapsed} />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Navbar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
                    <main className="flex-1 overflow-auto p-4 bg-transparent bg-opacity-90 rounded-lg">
                        <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="products" element={<Products />} />
                            <Route path='categories' element={<Categories />} />
                            <Route path='stock-alerts' element={<StockAlert />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="pending" element={<Pending />} />
                            <Route path="completed" element={<Completed />} />
                            <Route path="customers" element={<Customer />} />
                            <Route path="groups" element={<Group />} />
                            <Route path="sales" element={<Sales />} />
                            <Route path="sales" element={<Sales />} />
                            <Route path="inventory" element={<InventoryReport />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Admin;