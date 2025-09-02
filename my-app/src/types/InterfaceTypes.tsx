export interface ApiResponse<T> {
    data?: T; 
    status: number;
    message?: string;
    detail?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    validateToken: () => Promise<boolean>;
    refreshToken: () => Promise<boolean>;
}

export interface NavItem {
    name: string;
    icon: any;
    href?: string;
    children?: NavItem[];
}

// navbar
export interface NavbarNotification {
    id: number;
    message: string;
    read: boolean;
    time: string;
    icon: string;
    iconColor: string;
}
// end navbar

// reports
export interface StatCard {
    title: string;
    value: string;
    icon: string;
    iconColor: string;
    iconBg: string;
    change: string;
    changeType: 'positive' | 'negative';
    comparison: string;
}

export interface TopProduct {
    id: number;
    name: string;
    price: string;
    image: string;
    sold: number;
    change: number;
}

export interface LowStockItem {
    id: number;
    name: string;
    sku: string;
    image: string;
    currentStock: number;
    reorderLevel: number;
    daysOfStock: number;
}

export interface TopCustomer {
    id: number;
    name: string;
    company: string;
    image: string;
    orders: number;
    totalSpend: string;
    avgOrder: string;
}
// end reports

// order
export interface Order {
    id: string;
    orderId: string;
    poNumber: string;
    customer: string;
    email: string;
    date: string;
    dueDate: string;
    items: number;
    units: number;
    total: string;
    paid: string;
    status: 'Processing' | 'Shipped' | 'Payment Due' | 'Delivered';
}
// end order

// customer
export interface Customer {
    id: string;
    name: string;
    email: string;
    avatar: string;
    company: string;
    group: string;
    orders: number;
    totalSpend: string;
    lastOrder: string;
}

export interface CustomerGroup {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    customers: number;
    avgOrderValue: string;
    discountLevel: string;
    color: string;
}
// end customer

// setting
export interface Tab {
    id: string;
    name: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    lastActive: string;
    avatar: string;
}

export interface Integration {
    id: string;
    name: string;
    type: string;
    connectedSince: string;
    logo: string;
}
// end settings

// COMPONENTS
export interface InputProps {
    labelName: string;
    icon: React.ComponentType<{ color?: string }>;
    id: string;
    name: string;
    type: React.HTMLInputTypeAttribute;
    value: string;
    placeholder?: string;
    method: (value: string) => void;
    errors?: {
        [key: string]: string | undefined;
    };
}

export interface SubmitButtonProps {
    name?: string;
    type?: 'submit' | 'button' | 'reset';
    isSubmitting?: boolean;
    className?: string;
    disabled?: boolean;
    method?: () => void;
    loadingIcon?: React.ReactNode; // Allow custom loading icon
    ariaLabel?: string; // Improve accessibility
}
// Animation variants for tab content
export const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};