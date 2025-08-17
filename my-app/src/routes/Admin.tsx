import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../layouts/admin/Sidebar';
import Navbar from '../layouts/admin/Navbar';
import Dashboard from '../layouts/admin/Dashboard';
import Inventory from '../pages/admin/inventory/Inventory';
import Orders from '../pages/admin/orders/Orders';
import Reports from '../pages/admin/reports/Reports';
import Settings from '../pages/admin/settings/Settings';
import Customer from '../pages/admin/customer/Customer';
import oceans from '../assets/images/oceans.jpg';

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
                    <Navbar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar}/>                    
                    <main className="flex-1 overflow-auto p-4 bg-transparent bg-opacity-90 rounded-lg">
                        <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="inventory" element={<Inventory />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="customers" element={<Customer />} />
                            <Route path="reports" element={<Reports />} />
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