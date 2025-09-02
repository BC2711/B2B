import React, { memo } from 'react';
import { motion } from 'framer-motion';

// Define a stricter type for row data
interface RowData {
    [key: string]: string | number | null | undefined;
}

interface TableProps {
    columns: string[];
    sortedColumnData: RowData[];
    sortColumn?: string; // Optional: Track sorted column
    sortDirection?: 'ascending' | 'descending' | 'none'; // Optional: Track sort direction
}

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            type: 'spring',
            stiffness: 100,
        },
    }),
};

const Table: React.FC<TableProps> = memo(
    ({ columns = [], sortedColumnData = [], sortColumn, sortDirection = 'none' }) => {
        // Validate props
        if (!Array.isArray(columns) || !Array.isArray(sortedColumnData)) {
            console.warn('Table component: Invalid props received');
            return null;
        }

        // Normalize header names (generic function)
        const normalizeHeader = (header: string) => header.replace(' ', '_');

        // Handle keyboard interactions for accessibility
        const handleRowKeyDown = (
            event: React.KeyboardEvent<HTMLTableRowElement>,
            rowIndex: number
        ) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                console.log(`Row ${rowIndex + 1} activated`);
                // Add custom row activation logic here (e.g., navigate, open modal)
            }
        };

        return (
            <div className="overflow-x-auto rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 bg-white" role="grid">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((header) => (
                                <th
                                    key={header} // Use header as key for uniqueness
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    role="columnheader"
                                    aria-sort={sortColumn === header ? sortDirection : 'none'}
                                >
                                    {normalizeHeader(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedColumnData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                    role="gridcell"
                                    aria-live="polite"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            sortedColumnData.map((rowData, rowIndex) => (
                                <motion.tr
                                    key={rowData.id || rowIndex} 
                                    variants={rowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={rowIndex}
                                    className="hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    tabIndex={0}
                                    role="row"
                                    onKeyDown={(e: React.KeyboardEvent<HTMLTableRowElement>) => handleRowKeyDown(e, rowIndex)}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={`${rowIndex}-${normalizeHeader(column)}`} // Normalize key
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            role="gridcell"
                                        >
                                            {column === '#' ? rowIndex + 1 : rowData[normalizeHeader(column)] ?? '-'}
                                        </td>
                                    ))}
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
);

Table.displayName = 'Table';

export default Table;