import React from 'react';

interface InputProps {
    labelName?: string;
    icon?: React.ComponentType<{ color?: string }>;
    id?: string;
    name: string;
    type?: React.HTMLInputTypeAttribute;
    value?: string;
    placeholder?: string;
    method?: (value: string) => void;
    errors?: Record<string, string>;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    labelName = 'label name',
    icon: Icon,
    id = '1',
    name,
    type = 'text',
    value = '',
    placeholder = 'place holder',
    method = () => { },
    errors = {},
    className = '',
}) => {
    const hasError = errors && errors[name];

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {labelName}
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
                    className={`py-2 ${Icon ? 'pl-10' : 'pl-3'} block w-full border ${hasError ? 'border-red-300' : 'border-gray-300'
                        } rounded-md focus:ring-primary-500 focus:border-primary-500`}
                    aria-invalid={hasError ? 'true' : 'false'}
                    aria-describedby={hasError ? `${id}-error` : undefined}
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