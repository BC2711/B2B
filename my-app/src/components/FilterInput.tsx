import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface FilterInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    onClear?: () => void;
    autoFocus?: boolean;
}

const FilterInput: React.FC<FilterInputProps> = ({
    searchQuery,
    setSearchQuery,
    placeholder = 'Search...',
    className = '',
    inputClassName = '',
    autoFocus = false,
}) => {
    

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch color="gray" aria-hidden="true" />
            </div>

            <input
                type="text"
                className={`w-full py-2 pl-10 pr-8 text-sm bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-gray-600 border-none transition-all ${inputClassName}`}
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={placeholder}
                autoFocus={autoFocus}
            />

           
        </div>
    );
};

export default React.memo(FilterInput);