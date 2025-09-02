import React from 'react';

interface InputProps {
    labelName: string;
    icon?: React.ComponentType<{ color?: string }>;
    id: string; // Made required for accessibility
    name: string;
    type?: React.HTMLInputTypeAttribute;
    value: string;
    placeholder?: string;
    method: (value: string) => void; // Made required
    errors?: Record<string, string | undefined>;
    className?: string;
    required?: boolean; // Added for accessibility
}

const Input: React.FC<InputProps> = ({
    labelName,
    icon: Icon,
    id,
    name,
    type = 'text',
    value,
    placeholder = '',
    method,
    errors = {},
    className = '',
    required = false,
}) => {
    const hasError = !!errors[name];

    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {labelName}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon color={hasError ? 'red' : 'gray'} />
                    </div>
                )}
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => method(e.target.value)}
                    className={`py-2 ${Icon ? 'pl-10' : 'pl-3'} block w-full border ${hasError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                        } rounded-md transition-colors`}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    required={required}
                />
            </div>
            {hasError && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                    {errors[name]}
                </p>
            )}
        </div>
    );
};

export default Input;