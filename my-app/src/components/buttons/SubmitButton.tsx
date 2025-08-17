import React, { memo } from 'react';
import type { SubmitButtonProps } from '../../types/InterfaceTypes';

// Default loading icon as a separate component for reusability
const DefaultLoadingIcon: React.FC = () => (
    <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

const SubmitButton: React.FC<SubmitButtonProps> = memo(
    ({
        name = 'Button',
        type = 'submit',
        isSubmitting = false,
        className = '',
        disabled = false,
        method = () => { },
        loadingIcon,
        ariaLabel = name,
    }) => {
        // Validate props
        if (!name && !ariaLabel) {
            console.warn('SubmitButton: "name" or "ariaLabel" should be provided for accessibility');
        }

        return (
            <div className={`inline-flex ${className}`}>
                <button
                    type={type}
                    onClick={method}
                    disabled={isSubmitting || disabled}
                    className={`
            relative w-full flex justify-center items-center py-2 px-4 
            border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white 
            bg-gray-600 hover:bg-gray-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
            disabled:opacity-50 disabled:cursor-not-allowed 
            transition-all duration-200 ease-in-out
            dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-600
          `}
                    aria-label={ariaLabel}
                    aria-busy={isSubmitting}
                    role="button"
                >
                    {isSubmitting && (loadingIcon || <DefaultLoadingIcon />)}
                    <span className={isSubmitting ? 'ml-1' : ''}>{name}</span>
                </button>
            </div>
        );
    },
);

// Add display name for better debugging
SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;