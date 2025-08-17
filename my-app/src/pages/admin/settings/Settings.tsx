import React, { useState } from 'react';
import {
    FaHistory, FaCog, FaBell, FaShieldAlt, FaPlug, FaUsers,
    FaPlus, FaEdit, FaTrash, FaChevronDown
} from 'react-icons/fa';
import type { Integration, Tab, TeamMember } from '../../../types/InterfaceTypes';


// Component
const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        emailNotifications: true,
        inAppNotifications: true,
    });

    // Sample data
    const teamMembers: TeamMember[] = [
        {
            id: '1',
            name: 'John Smith',
            email: 'john@example.com',
            role: 'Owner',
            lastActive: 'Today, 10:45 AM',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            role: 'Admin',
            lastActive: 'Yesterday, 3:12 PM',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            id: '3',
            name: 'Michael Brown',
            email: 'michael@example.com',
            role: 'Editor',
            lastActive: '2 days ago',
            avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
        }
    ];

    const connectedIntegrations: Integration[] = [
        {
            id: '1',
            name: 'Google Workspace',
            type: 'Productivity',
            connectedSince: '2 months ago',
            logo: 'https://via.placeholder.com/40'
        },
        {
            id: '2',
            name: 'Slack',
            type: 'Communication',
            connectedSince: '1 week ago',
            logo: 'https://via.placeholder.com/40'
        },
        {
            id: '3',
            name: 'Stripe',
            type: 'Payments',
            connectedSince: '5 months ago',
            logo: 'https://via.placeholder.com/40'
        }
    ];

    const availableIntegrations = [
        {
            id: '4',
            name: 'Mailchimp',
            type: 'Email marketing',
            logo: 'https://via.placeholder.com/40'
        },
        {
            id: '5',
            name: 'Zapier',
            type: 'Automation',
            logo: 'https://via.placeholder.com/40'
        },
        {
            id: '6',
            name: 'QuickBooks',
            type: 'Accounting',
            logo: 'https://via.placeholder.com/40'
        }
    ];

    // Helper functions
    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Tab components
    const GeneralSettings = () => (
        <div className="space-y-6">
            <div className="p-5 bg-white">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Application Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Theme</label>
                            <p className="text-xs text-gray-500 mt-1">Choose between light and dark mode</p>
                        </div>
                        <select className="mt-1 block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                            <option>Light</option>
                            <option>Dark</option>
                            <option>System Default</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Timezone</label>
                            <p className="text-xs text-gray-500 mt-1">Set your local timezone</p>
                        </div>
                        <select className="mt-1 block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                            <option>(UTC-12:00) International Date Line West</option>
                            <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                            <option selected>(UTC+00:00) Greenwich Mean Time</option>
                            <option>(UTC+01:00) Central European Time</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Language</label>
                            <p className="text-xs text-gray-500 mt-1">Interface language</p>
                        </div>
                        <select className="mt-1 block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                            <option>English</option>
                            <option>Español</option>
                            <option>Français</option>
                            <option>Deutsch</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Preferences</h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="data-analytics" name="data-analytics" type="checkbox" checked
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="data-analytics" className="font-medium text-gray-700">Share anonymous usage data</label>
                            <p className="text-gray-500">Help us improve by sharing anonymous usage statistics</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="auto-backup" name="auto-backup" type="checkbox" checked
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="auto-backup" className="font-medium text-gray-700">Automatic backups</label>
                            <p className="text-gray-500">Daily automatic backups of your data</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="export-reports" name="export-reports" type="checkbox"
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="export-reports" className="font-medium text-gray-700">Email weekly reports</label>
                            <p className="text-gray-500">Receive a summary report every Monday</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                    Save Changes
                </button>
            </div>
        </div>
    );

    const NotificationSettings = () => (
        <div className="space-y-6">
            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>

                <div className="space-y-6">
                    <div>
                        <button
                            onClick={() => toggleSection('emailNotifications')}
                            className="flex items-center justify-between w-full mb-3"
                        >
                            <h4 className="text-md font-medium text-gray-800">Email Notifications</h4>
                            <FaChevronDown className={`transition-transform ${expandedSections.emailNotifications ? 'transform rotate-180' : ''}`} />
                        </button>

                        {expandedSections.emailNotifications && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">New orders</label>
                                        <p className="text-xs text-gray-500 mt-1">Receive email when new orders are placed</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input type="radio" id="new-orders-email-immediate" name="new-orders-email" checked
                                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" />
                                            <label htmlFor="new-orders-email-immediate" className="ml-2 block text-sm text-gray-700">Immediate</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" id="new-orders-email-daily" name="new-orders-email"
                                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" />
                                            <label htmlFor="new-orders-email-daily" className="ml-2 block text-sm text-gray-700">Daily digest</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" id="new-orders-email-none" name="new-orders-email"
                                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" />
                                            <label htmlFor="new-orders-email-none" className="ml-2 block text-sm text-gray-700">None</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Low stock alerts</label>
                                        <p className="text-xs text-gray-500 mt-1">Get notified when inventory is low</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input type="radio" id="low-stock-email-immediate" name="low-stock-email" checked
                                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" />
                                            <label htmlFor="low-stock-email-immediate" className="ml-2 block text-sm text-gray-700">Immediate</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="radio" id="low-stock-email-none" name="low-stock-email"
                                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300" />
                                            <label htmlFor="low-stock-email-none" className="ml-2 block text-sm text-gray-700">None</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            onClick={() => toggleSection('inAppNotifications')}
                            className="flex items-center justify-between w-full mb-3"
                        >
                            <h4 className="text-md font-medium text-gray-800">In-App Notifications</h4>
                            <FaChevronDown className={`transition-transform ${expandedSections.inAppNotifications ? 'transform rotate-180' : ''}`} />
                        </button>

                        {expandedSections.inAppNotifications && (
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="app-new-orders" name="app-new-orders" type="checkbox" checked
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="app-new-orders" className="font-medium text-gray-700">New orders</label>
                                        <p className="text-gray-500">Show notifications for new orders</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="app-payments" name="app-payments" type="checkbox" checked
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="app-payments" className="font-medium text-gray-700">Payment received</label>
                                        <p className="text-gray-500">Show notifications when payments are received</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="app-shipments" name="app-shipments" type="checkbox"
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="app-shipments" className="font-medium text-gray-700">Shipment updates</label>
                                        <p className="text-gray-500">Show notifications for shipment status changes</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Sounds</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New order sound</label>
                            <p className="text-xs text-gray-500 mt-1">Sound played when new orders arrive</p>
                        </div>
                        <select className="mt-1 block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                            <option>Default chime</option>
                            <option>Soft bell</option>
                            <option>Alert tone</option>
                            <option>None</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Alert volume</label>
                            <p className="text-xs text-gray-500 mt-1">Volume for notification sounds</p>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="70"
                            className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                    Save Changes
                </button>
            </div>
        </div>
    );

    const SecuritySettings = () => (
        <div className="space-y-6">
            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <p className="text-xs text-gray-500 mt-1">Last changed 3 months ago</p>
                        </div>
                        <button className="px-3 py-1 text-sm font-medium text-primary-600 bg-white border border-primary-600 rounded-md hover:bg-primary-50">
                            Change Password
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Two-factor authentication</label>
                            <p className="text-xs text-gray-500 mt-1">Add an extra layer of security</p>
                        </div>
                        <button className="px-3 py-1 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
                            Enable 2FA
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Active sessions</label>
                            <p className="text-xs text-gray-500 mt-1">3 active sessions</p>
                        </div>
                        <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            View Sessions
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Security Alerts</h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="unusual-activity" name="unusual-activity" type="checkbox" checked
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="unusual-activity" className="font-medium text-gray-700">Unusual activity</label>
                            <p className="text-gray-500">Get alerted about suspicious login attempts</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="new-device" name="new-device" type="checkbox" checked
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="new-device" className="font-medium text-gray-700">New device login</label>
                            <p className="text-gray-500">Notify when your account is accessed from a new device</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="password-change" name="password-change" type="checkbox"
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="password-change" className="font-medium text-gray-700">Password changes</label>
                            <p className="text-gray-500">Receive confirmation when your password is changed</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Export & Deletion</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Export account data</label>
                            <p className="text-xs text-gray-500 mt-1">Download a copy of your personal data</p>
                        </div>
                        <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            Request Export
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Delete account</label>
                            <p className="text-xs text-gray-500 mt-1">Permanently delete your account and all data</p>
                        </div>
                        <button className="px-3 py-1 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const IntegrationsSettings = () => (
        <div className="space-y-6">
            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Apps</h3>
                <div className="space-y-4">
                    {connectedIntegrations.map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <img src={integration.logo} alt={integration.name} className="h-8 w-8 rounded" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                                    <p className="text-xs text-gray-500">Connected {integration.connectedSince}</p>
                                </div>
                            </div>
                            <button className="px-3 py-1 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50">
                                Disconnect
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Available Integrations</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {availableIntegrations.map((integration) => (
                        <div key={integration.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center">
                                <img src={integration.logo} alt={integration.name} className="h-8 w-8 rounded" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                                    <p className="text-xs text-gray-500">{integration.type}</p>
                                </div>
                            </div>
                            <button className="mt-3 w-full px-3 py-1 text-sm font-medium text-primary-600 bg-white border border-primary-600 rounded-md hover:bg-primary-50">
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const TeamSettings = () => (
        <div className="space-y-6">
            <div className="p-5 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                    <button className="px-3 py-1 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
                        <FaPlus /> Add Member
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Last Active</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teamMembers.map((member) => (
                                <tr key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                                <img className="w-10 h-10 rounded-full" src={member.avatar} alt={member.name} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                <div className="text-sm text-gray-500">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.role === 'Owner' ? 'bg-green-100 text-green-800' :
                                            member.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                                                'bg-purple-100 text-purple-800'
                                            }`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{member.lastActive}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                                            <FaEdit />
                                        </button>
                                        {member.role !== 'Owner' && (
                                            <button className="text-red-600 hover:text-red-900">
                                                <FaTrash />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-5 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Team Roles & Permissions</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Members</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Permissions</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">Owner</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Full access to all features and settings</td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <button className="text-primary-600 hover:text-primary-900">
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">Admin</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Full access except account settings</td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <button className="text-primary-600 hover:text-primary-900">
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">Editor</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">1</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Can create and edit content</td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <button className="text-primary-600 hover:text-primary-900">
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">Viewer</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">0</td>
                                <td className="px-6 py-4 text-sm text-gray-500">Read-only access</td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <button className="text-primary-600 hover:text-primary-900">
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // Tab configuration
    const tabs: Tab[] = [
        {
            id: 'general',
            name: 'General',
            icon: <FaCog />,
            content: <GeneralSettings />
        },
        {
            id: 'notifications',
            name: 'Notifications',
            icon: <FaBell />,
            content: <NotificationSettings />
        },
        {
            id: 'security',
            name: 'Security',
            icon: <FaShieldAlt />,
            content: <SecuritySettings />
        },
        {
            id: 'integrations',
            name: 'Integrations',
            icon: <FaPlug />,
            content: <IntegrationsSettings />
        },
        {
            id: 'team',
            name: 'Team',
            icon: <FaUsers />,
            content: <TeamSettings />
        }
    ];

    return (
        <main className="flex-1 overflow-auto p-4 bg-gray-50 rounded-[20px]">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaHistory /> View Change Log
                    </button>
                </div>
            </div>

            {/* Settings Tabs */}
            <div className="mt-6 bg-white rounded-lg shadow">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex inline justify-between nowrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-6 text-sm font-medium text-center border-b-2 whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-5">
                    {tabs.find(tab => tab.id === activeTab)?.content}
                </div>
            </div>
        </main>
    );
};

export default Settings;