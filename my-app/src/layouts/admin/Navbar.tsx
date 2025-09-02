import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaBell, FaEnvelope, FaExclamationTriangle, FaSearch, FaShoppingCart, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useApiMutation } from '../../hooks/useApiMutation';
import { toast } from 'react-toastify';

// Define types
interface NavbarNotification {
    id: number;
    message: string;
    read: boolean;
    time: string;
    icon: React.ReactNode;
    iconColor: string;
}

interface NavbarMessage {
    id: number;
    sender: string;
    content: string;
    time: string;
    read: boolean;
    avatar: string;
}

interface NavbarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    isMobile?: boolean;
}

// Custom hook for handling click outside
const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, callback]);
};

// Animation variants for dropdowns
const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15, ease: 'easeIn' } },
};

const Navbar: React.FC<NavbarProps> = memo(({ isCollapsed, toggleSidebar, isMobile = false }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    const { mutate } = useApiMutation<void, void>(
        'auth/logout',
        'POST',
        {
            onSuccess: () => {
                logout();
                if (!isAuthenticated) {
                    toast.success('Successfully logged out');
                    navigate('/');
                }

            },
            onError: (error) => {
                toast.error(error.message || 'Failed to logout');
            },
        }
    );

    const handleLogout = useCallback(() => {
        mutate();
    }, [mutate]);

    // Sample data
    const [notificationList, setNotificationList] = useState<NavbarNotification[]>([
        {
            id: 1,
            message: 'New order received from Global Suppliers',
            read: false,
            time: '5 min ago',
            icon: <FaShoppingCart />,
            iconColor: 'text-blue-500',
        },
        {
            id: 2,
            message: 'Inventory low on Bluetooth Speakers',
            read: true,
            time: '2 hours ago',
            icon: <FaExclamationTriangle />,
            iconColor: 'text-yellow-500',
        }
    ]);

    const [messageList, setMessageList] = useState<NavbarMessage[]>([
        {
            id: 1,
            sender: 'Sarah Williams',
            content: 'Can we discuss the new inventory system?',
            time: '1 hour ago',
            read: false,
            avatar: '/path/to/avatar1.jpg'
        }
    ]);

    const notificationsRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useClickOutside(notificationsRef, () => setShowNotifications(false));
    useClickOutside(messagesRef, () => setShowMessages(false));
    useClickOutside(profileMenuRef, () => setShowProfileMenu(false));

    // Toggle handlers
    const handleNotificationsToggle = useCallback(() => {
        setShowNotifications(prev => !prev);
        setShowMessages(false);
        setShowProfileMenu(false);
    }, []);

    const handleMessagesToggle = useCallback(() => {
        setShowMessages(prev => !prev);
        setShowNotifications(false);
        setShowProfileMenu(false);
    }, []);

    const handleProfileMenuToggle = useCallback(() => {
        setShowProfileMenu(prev => !prev);
        setShowNotifications(false);
        setShowMessages(false);
    }, []);

    // Mark items as read
    const markNotificationAsRead = useCallback((id: number) => {
        setNotificationList(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n)))
    }, []);

    const markMessageAsRead = useCallback((id: number) => {
        setMessageList(prev =>
            prev.map(m => (m.id === id ? { ...m, read: true } : m)))
    }, []);

    // Calculate unread counts
    const unreadNotifications = notificationList.filter(n => !n.read).length;
    const unreadMessages = messageList.filter(m => !m.read).length;

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-transparent-800 text-white">
            {/* Left side - Mobile menu and search */}
            <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                {isMobile && (
                    <button
                        className="p-2 text-gray-300 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <FaBars size={18} />
                    </button>
                )}

                {/* Desktop sidebar toggle */}
                {!isMobile && (
                    <button
                        className="p-2 text-gray-300 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={toggleSidebar}
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {isCollapsed ? <HiChevronRight size={16} /> : <HiChevronLeft size={16} />}
                    </button>
                )}

                {/* Search bar - hidden on small mobile */}
                {!isMobile && (
                    <div className="relative hidden sm:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FaSearch color="gray" />
                        </div>
                        <input
                            type="text"
                            className="w-full py-2 pl-10 pr-4 text-sm bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-gray-600 border-none transition-all"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search"
                        />
                    </div>
                )}
            </div>

            {/* Right side - Icons and dropdowns */}
            <div className="flex items-center space-x-4">
                {/* Mobile search button */}
                {isMobile && (
                    <button
                        className="p-2 text-gray-300 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Search"
                    >
                        <FaSearch size={16} />
                    </button>
                )}

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                        onClick={handleNotificationsToggle}
                        aria-label={`Notifications (${unreadNotifications} unread)`}
                        aria-expanded={showNotifications}
                    >
                        <FaBell size={16} />
                        {unreadNotifications > 0 && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                className="absolute right-0 mt-2 w-72 bg-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="p-2">
                                    <div className="px-3 py-2 border-b border-gray-600">
                                        <h3 className="text-sm font-semibold">Notifications</h3>
                                    </div>
                                    {notificationList.length > 0 ? (
                                        notificationList.map(notification => (
                                            <button
                                                key={notification.id}
                                                className={`w-full px-3 py-2 text-left hover:bg-gray-600 transition-colors ${!notification.read ? 'bg-gray-600' : ''}`}
                                                onClick={() => markNotificationAsRead(notification.id)}
                                            >
                                                <div className="flex items-start">
                                                    <div className={`flex-shrink-0 ${notification.iconColor} mt-1`}>
                                                        {notification.icon}
                                                    </div>
                                                    <div className="ml-3 flex-1">
                                                        <p className="text-sm">{notification.message}</p>
                                                        <p className="text-xs text-gray-300 mt-1">{notification.time}</p>
                                                    </div>
                                                    {!notification.read && (
                                                        <div className="ml-2 flex-shrink-0">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-3 py-4 text-center text-sm text-gray-300">
                                            No new notifications
                                        </div>
                                    )}
                                    <div className="px-3 py-2 border-t border-gray-600 text-center">
                                        <Link
                                            to="/notifications"
                                            className="text-sm text-indigo-400 hover:text-indigo-300"
                                            onClick={() => setShowNotifications(false)}
                                        >
                                            View all
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Messages */}
                <div className="relative" ref={messagesRef}>
                    <button
                        className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                        onClick={handleMessagesToggle}
                        aria-label={`Messages (${unreadMessages} unread)`}
                        aria-expanded={showMessages}
                    >
                        <FaEnvelope size={16} />
                        {unreadMessages > 0 && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showMessages && (
                            <motion.div
                                className="absolute right-0 mt-2 w-72 bg-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="p-2">
                                    <div className="px-3 py-2 border-b border-gray-600">
                                        <h3 className="text-sm font-semibold">Messages</h3>
                                    </div>
                                    {messageList.length > 0 ? (
                                        messageList.map(message => (
                                            <button
                                                key={message.id}
                                                className={`w-full px-3 py-2 text-left hover:bg-gray-600 transition-colors ${!message.read ? 'bg-gray-600' : ''}`}
                                                onClick={() => markMessageAsRead(message.id)}
                                            >
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={message.avatar}
                                                            alt={message.sender}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="ml-3 flex-1">
                                                        <p className="text-sm font-medium">{message.sender}</p>
                                                        <p className="text-sm truncate">{message.content}</p>
                                                        <p className="text-xs text-gray-300 mt-1">{message.time}</p>
                                                    </div>
                                                    {!message.read && (
                                                        <div className="ml-2 flex-shrink-0">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-3 py-4 text-center text-sm text-gray-300">
                                            No new messages
                                        </div>
                                    )}
                                    <div className="px-3 py-2 border-t border-gray-600 text-center">
                                        <Link
                                            to="/messages"
                                            className="text-sm text-indigo-400 hover:text-indigo-300"
                                            onClick={() => setShowMessages(false)}
                                        >
                                            View all
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User profile dropdown */}
                <div className="relative" ref={profileMenuRef}>
                    <button
                        className="flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                        onClick={handleProfileMenuToggle}
                        aria-label="User menu"
                        aria-expanded={showProfileMenu}
                    >
                        <img
                            src="/src/assets/images/oceans.jpg"
                            alt="User profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </button>

                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-xl z-50"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="py-1">
                                    <div className="px-4 py-2 border-b border-gray-600">
                                        <p className="text-sm">Signed in as</p>
                                        <p className="text-sm font-medium truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm hover:bg-gray-600 transition-colors"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="block px-4 py-2 text-sm hover:bg-gray-600 transition-colors"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Settings
                                    </Link>
                                    <div className="border-t border-gray-600" />
                                    <Link
                                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-600 transition-colors"
                                        onClick={() => handleLogout()}
                                    >
                                        <FaSignOutAlt />
                                        Sign out
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;