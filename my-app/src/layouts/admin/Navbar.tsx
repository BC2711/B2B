import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Define types
interface NavbarNotification {
    id: number;
    message: string;
    read: boolean;
    time: string;
    icon: string;
    iconColor: string;
}

interface NavbarMessage {
    id: number;
    sender: string;
    content: string;
    time: string;
    read: boolean;
}

interface NavbarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
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

// Sample data (replace with API in production)
const notifications: NavbarNotification[] = [
    {
        id: 1,
        message: 'New order received from Global Suppliers',
        read: false,
        time: '5 min ago',
        icon: 'fas fa-shopping-cart',
        iconColor: 'text-blue-500',
    },
    {
        id: 2,
        message: 'Inventory low on Bluetooth Speakers',
        read: true,
        time: '2 hours ago',
        icon: 'fas fa-exclamation-triangle',
        iconColor: 'text-yellow-500',
    },
    {
        id: 3,
        message: 'New message from Sarah Williams',
        read: false,
        time: '1 day ago',
        icon: 'fas fa-envelope',
        iconColor: 'text-green-500',
    },
];

const messages: NavbarMessage[] = [
    {
        id: 1,
        sender: 'Sarah Williams',
        content: 'Can we discuss the new inventory system?',
        time: '1 hour ago',
        read: false,
    },
    {
        id: 2,
        sender: 'John Smith',
        content: 'Please review the latest order details.',
        time: '3 hours ago',
        read: true,
    },
];

const Navbar: React.FC<NavbarProps> = memo(({ isCollapsed, toggleSidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [notificationList, setNotificationList] = useState(notifications);
    const [messageList, setMessageList] = useState(messages);

    const notificationsRef = useRef<HTMLElement>(null);
    const messagesRef = useRef<HTMLElement>(null);
    const profileMenuRef = useRef<HTMLElement>(null);

    // Close dropdowns when clicking outside
    useClickOutside(notificationsRef, () => setShowNotifications(false));
    useClickOutside(messagesRef, () => setShowMessages(false));
    useClickOutside(profileMenuRef, () => setShowProfileMenu(false));

    // Toggle handlers
    const handleNotificationsToggle = useCallback(() => {
        setShowNotifications((prev) => !prev);
        setShowMessages(false);
        setShowProfileMenu(false);
    }, []);

    const handleMessagesToggle = useCallback(() => {
        setShowMessages((prev) => !prev);
        setShowNotifications(false);
        setShowProfileMenu(false);
    }, []);

    const handleProfileMenuToggle = useCallback(() => {
        setShowProfileMenu((prev) => !prev);
        setShowNotifications(false);
        setShowMessages(false);
    }, []);

    // Mark notification as read
    const markNotificationAsRead = useCallback((id: number) => {
        setNotificationList((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
        );
    }, []);

    // Mark message as read
    const markMessageAsRead = useCallback((id: number) => {
        setMessageList((prev) =>
            prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
        );
    }, []);

    // Handle search (placeholder for real search logic)
    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            // Add search logic here (e.g., API call)
            console.log('Searching for:', e.target.value);
        },
        [],
    );

    // Calculate unread counts
    const unreadNotifications = notificationList.filter((n) => !n.read).length;
    const unreadMessages = messageList.filter((m) => !m.read).length;

    return (
        <header
            className="flex items-center justify-between h-16 px-4 bg-transparent text-white shadow-md"
            role="banner"
            aria-label="Admin navigation"
        >
            {/* Mobile menu button */}
            <button
                className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                aria-label="Toggle sidebar menu"
                onClick={toggleSidebar}
            >
                <i className="fas fa-bars text-xl" aria-hidden="true" />
            </button>

            {/* Search and Sidebar Toggle */}
            <div className="flex items-center gap-4 flex-1 max-w-md mx-4 md:mx-6">
                <button
                    onClick={toggleSidebar}
                    className="hidden md:block p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-6 h-6 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                    >
                        <line x1="3" y1="7" x2="21" y2="7" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="17" x2="21" y2="17" />
                    </svg>
                </button>

                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fas fa-search text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        className="w-full py-2 pl-10 pr-3 text-sm bg-gray-700 dark:bg-gray-800 text-white border-none rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-gray-600 transition-all"
                        placeholder="Search products or orders..."
                        value={searchQuery}
                        onChange={handleSearch}
                        aria-label="Search products or orders"
                    />
                </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <section ref={notificationsRef} className="relative">
                    <button
                        className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                        onClick={handleNotificationsToggle}
                        aria-label={`Notifications (${unreadNotifications} unread)`}
                        aria-haspopup="true"
                        aria-expanded={showNotifications}
                    >
                        <i className="fas fa-bell text-xl" aria-hidden="true" />
                        {unreadNotifications > 0 && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-gray-800" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 max-h-[400px] overflow-y-auto"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="py-2">
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                            Notifications
                                        </h3>
                                    </div>
                                    {notificationList.length === 0 ? (
                                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                            No new notifications
                                        </div>
                                    ) : (
                                        notificationList.map((notification) => (
                                            <button
                                                key={notification.id}
                                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900' : ''
                                                    }`}
                                                onClick={() => markNotificationAsRead(notification.id)}
                                                aria-label={`Notification: ${notification.message}`}
                                            >
                                                <div className="flex items-start">
                                                    <div className={`flex-shrink-0 ${notification.iconColor} mt-1`}>
                                                        <i className={`${notification.icon} text-lg`} aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-3 flex-1">
                                                        <p className="text-sm text-gray-700 dark:text-gray-200">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                    {!notification.read && (
                                                        <div className="ml-2 flex-shrink-0">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
                                        <Link
                                            to="/admin/notifications"
                                            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                                            onClick={() => setShowNotifications(false)}
                                        >
                                            View all notifications
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Messages */}
                <section ref={messagesRef} className="relative">
                    <button
                        className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                        onClick={handleMessagesToggle}
                        aria-label={`Messages (${unreadMessages} unread)`}
                        aria-haspopup="true"
                        aria-expanded={showMessages}
                    >
                        <i className="fas fa-envelope text-xl" aria-hidden="true" />
                        {unreadMessages > 0 && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-gray-800" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showMessages && (
                            <motion.div
                                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 max-h-[400px] overflow-y-auto"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="py-2">
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Messages</h3>
                                    </div>
                                    {messageList.length === 0 ? (
                                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                            No new messages
                                        </div>
                                    ) : (
                                        messageList.map((message) => (
                                            <button
                                                key={message.id}
                                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${!message.read ? 'bg-blue-50 dark:bg-blue-900' : ''
                                                    }`}
                                                onClick={() => markMessageAsRead(message.id)}
                                                aria-label={`Message from ${message.sender}: ${message.content}`}
                                            >
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0 text-green-500 mt-1">
                                                        <i className="fas fa-envelope text-lg" aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-3 flex-1">
                                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                            {message.sender}
                                                        </p>
                                                        <p className="text-sm text-gray-700 dark:text-gray-200 truncate">
                                                            {message.content}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {message.time}
                                                        </p>
                                                    </div>
                                                    {!message.read && (
                                                        <div className="ml-2 flex-shrink-0">
                                                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
                                        <Link
                                            to="/admin/messages"
                                            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                                            onClick={() => setShowMessages(false)}
                                        >
                                            View all messages
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* User dropdown */}
                <section ref={profileMenuRef} className="relative">
                    <button
                        className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={handleProfileMenuToggle}
                        aria-label="User menu"
                        aria-haspopup="true"
                        aria-expanded={showProfileMenu}
                    >
                        <img
                            className="w-9 h-9 rounded-full object-cover"
                            src="/src/assets/images/oceans.jpg"
                            alt="User profile"
                            loading="lazy"
                        />
                    </button>

                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20"
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="py-2">
                                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Signed in as</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                                            john.doe@example.com
                                        </p>
                                    </div>
                                    <Link
                                        to="/admin/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to="/admin/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Settings
                                    </Link>
                                    <div className="border-t border-gray-200 dark:border-gray-700" />
                                    <Link
                                        to="/logout"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </header>
    );
});

Navbar.displayName = 'Navbar';

export default Navbar;