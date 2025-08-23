import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../layouts/admin/Sidebar';
import Navbar from '../layouts/admin/Navbar';
import Dashboard from '../layouts/admin/Dashboard';
import Products from '../pages/admin/inventory/Products';
import Orders from '../pages/admin/orders/Orders';
import Settings from '../pages/admin/settings/Account';
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
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsSidebarCollapsed(true);
                setShowSidebar(false);
            } else {
                setShowSidebar(true);
            }
        };

        handleResize(); // Initialize
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setShowSidebar(prev => !prev);
        } else {
            setIsSidebarCollapsed(prev => !prev);
        }
    };

    const closeMobileSidebar = () => {
        if (isMobile) {
            setShowSidebar(false);
        }
    };

    // Auth check (uncomment when ready)
    // const { authToken } = useAuth();
    // if (!authToken) {
    //     return <Navigate to="/auth/login" />;
    // }

    return (
        <div className="h-screen overflow-hidden relative bgImage">
            {/* Semi-transparent overlay for better readability */}
            {isMobile && showSidebar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMobileSidebar}
                />
            )}

            <div className="flex h-full relative z-10">
                {/* Sidebar with responsive behavior */}
                <div className={`
                    ${isMobile ? 'fixed inset-y-0 z-50' : 'relative'}
                    ${showSidebar ? 'block' : 'hidden'}
                    ${!isMobile ? 'block' : ''}
                `}>
                    <Sidebar
                        isCollapsed={isSidebarCollapsed}
                        onToggle={toggleSidebar}
                        isMobile={isMobile}
                    />
                </div>

                {/* Main content area */}
                <div className={`
                    flex flex-col flex-1 overflow-hidden
                    ${isMobile && showSidebar ? 'ml-0' : ''}
                    ${!isMobile && isSidebarCollapsed ? 'ml-0' : 'ml-0'}
                    transition-all duration-300 ease-in-out
                `}>
                    <Navbar
                        isCollapsed={isSidebarCollapsed}
                        toggleSidebar={toggleSidebar}
                        isMobile={isMobile}
                    />

                    <main
                        className="flex-1 overflow-auto p-4 bg-transparent bg-opacity-90 rounded-lg"
                        onClick={closeMobileSidebar}
                    >
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