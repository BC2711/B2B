import React from 'react';

interface PaginationProps {
    data: any[];
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    data,
    itemsPerPage,
    currentPage,
    onPageChange,
    className = ''
}) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Calculate visible page range (max 5 pages shown)
    const getPageRange = () => {
        const range = [];
        const maxVisiblePages = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, data.length);

    return (
        <div className={`flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 ${className}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startItem}</span> to{' '}
                    <span className="font-medium">{endItem}</span> of{' '}
                    <span className="font-medium">{data.length}</span> results
                </p>

                <nav className="flex items-center -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-2 py-2 text-sm font-medium border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${currentPage === 1
                                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                : 'text-gray-500 bg-white hover:bg-gray-50'
                            }`}
                        aria-label="Previous page"
                    >
                        <i className="fas fa-chevron-left" />
                    </button>

                    {getPageRange().map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${page === currentPage
                                    ? 'text-indigo-600 border-indigo-500 bg-indigo-50'
                                    : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-50'
                                }`}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-2 text-sm font-medium border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${currentPage === totalPages
                                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                : 'text-gray-500 bg-white hover:bg-gray-50'
                            }`}
                        aria-label="Next page"
                    >
                        <i className="fas fa-chevron-right" />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;