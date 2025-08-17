import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import type { NavbarNotification } from '../../types/InterfaceTypes';

interface NavbarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

// Custom hook for handling click outside
const useClickOutside = (ref: React.RefObject<HTMLElement | null>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

// Sample notifications data
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

// Sample messages data
const messages = [
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

// Memoize to prevent unnecessary re-renders
const Navbar: React.FC<NavbarProps> = memo(({ isCollapsed, toggleSidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const notificationsRef = useRef<HTMLElement | null>(null);
    const messagesRef = useRef<HTMLElement | null>(null);
    const profileMenuRef = useRef<HTMLElement | null>(null);

    // Close dropdowns when clicking outside
    useClickOutside(notificationsRef, () => setShowNotifications(false));
    useClickOutside(messagesRef, () => setShowMessages(false));
    useClickOutside(profileMenuRef, () => setShowProfileMenu(false));

    // Use useCallback to prevent function recreation
    const handleNotificationsToggle = useCallback(() => {
        setShowNotifications((prev) => !prev);
        setShowMessages(false); // Close other dropdowns
        setShowProfileMenu(false);
    }, []);

    const handleMessagesToggle = useCallback(() => {
        setShowMessages((prev) => !prev);
        setShowNotifications(false); // Close other dropdowns
        setShowProfileMenu(false);
    }, []);

    const handleProfileMenuToggle = useCallback(() => {
        setShowProfileMenu((prev) => !prev);
        setShowNotifications(false); // Close other dropdowns
        setShowMessages(false);
    }, []);

    // Calculate unread counts
    const unreadNotifications = notifications.filter((n) => !n.read).length;
    const unreadMessages = messages.filter((m) => !m.read).length;

    return (
        <header className="flex items-center justify-between h-16 px-4 bg-transparent">
            {/* Mobile menu button */}
            <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                aria-label="Toggle sidebar menu"
                onClick={toggleSidebar}
            >
                <i className="fas fa-bars text-xl" />
            </button>

            {/* Search and Sidebar Toggle */}
            <div className="flex items-center gap-4 flex-1 max-w-md mx-4 md:mx-6">
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-transparent text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
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
                        className="w-6 h-6"
                    >
                        {isCollapsed ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="7" x2="21" y2="7" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="17" x2="21" y2="17" />
                            </>
                        )}
                    </svg>
                </button>

                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i className="fas fa-search text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        className="w-full py-2 pl-10 pr-3 text-sm bg-gray-100 border-none rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search products or orders"
                    />
                </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <section ref={notificationsRef} className="relative">
                    <button
                        className="p-2 text-gray-600 hover:text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                        onClick={handleNotificationsToggle}
                        aria-label={`Notifications (${unreadNotifications} unread)`}
                        aria-haspopup="true"
                        aria-expanded={showNotifications}
                    >
                        <i className="fas fa-bell text-xl" />
                        {unreadNotifications > 0 && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        )}
                    </button>

                    {/* Notifications dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 max-h-[400px] overflow-y-auto">
                            <div className="py-2">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                                </div>
                                {notifications.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-gray-500">No new notifications</div>
                                ) : (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`px-4 py-3 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start">
                                                <div className={`flex-shrink-0 ${notification.iconColor} mt-1`}>
                                                    <i className={`${notification.icon} text-lg`} aria-hidden="true" />
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <p className="text-sm text-gray-700">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                </div>
                                                {!notification.read && (
                                                    <div className="ml-2 flex-shrink-0">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div className="px-4 py-2 border-t border-gray-200 text-center">
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                    >
                                        View all notifications
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Messages */}
                <section ref={messagesRef} className="relative">
                    <button
                        className="p-2 text-gray-600 hover:text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                        onClick={handleMessagesToggle}
                        aria-label={`Messages (${unreadMessages} unread)`}
                        aria-haspopup="true"
                        aria-expanded={showMessages}
                    >
                        <i className="fas fa-envelope text-xl" />
                        {unreadMessages > 0 && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        )}
                    </button>

                    {/* Messages dropdown */}
                    {showMessages && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 max-h-[400px] overflow-y-auto">
                            <div className="py-2">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-800">Messages</h3>
                                </div>
                                {messages.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-gray-500">No new messages</div>
                                ) : (
                                    messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`px-4 py-3 hover:bg-gray-50 transition-colors ${!message.read ? 'bg-blue-50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 text-green-500 mt-1">
                                                    <i className="fas fa-envelope text-lg" aria-hidden="true" />
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <p className="text-sm font-medium text-gray-800">{message.sender}</p>
                                                    <p className="text-sm text-gray-700 truncate">{message.content}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                                                </div>
                                                {!message.read && (
                                                    <div className="ml-2 flex-shrink-0">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div className="px-4 py-2 border-t border-gray-200 text-center">
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                    >
                                        View all messages
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
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
                        {/* <img
                            className="w-8 h-8 rounded-full border border-gray-200"
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt="User profile"
                            loading="lazy"
                        /> */}
                        <img
                                className="w-9 h-9 rounded-full object-cover"
                                src="/src/assets/images/oceans.jpg"
                                alt="User profile"
                                loading="lazy"
                            />
                    </button>

                    {/* Profile dropdown */}
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-20">
                            <div className="py-2">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-sm text-gray-600">Signed in as</p>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        john.doe@example.com
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Your Profile
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Settings
                                </a>
                                <div className="border-t border-gray-200" />
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Sign out
                                </a>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </header>
    );
});

// Add display name for better debugging
Navbar.displayName = 'Navbar';

export default Navbar;