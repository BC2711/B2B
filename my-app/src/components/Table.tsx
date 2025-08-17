import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface TableProps {
    columns: string[];
    sortedColumnData: [];
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

const Table: React.FC<TableProps> = memo(({ columns = [], sortedColumnData = [] }) => {
    // Validate props
    if (!Array.isArray(columns) || !Array.isArray(sortedColumnData)) {
        console.warn('Table component: Invalid props received');
        return null;
    }

    return (
        <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white" role="grid">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                role="columnheader"
                                aria-sort="none"
                            >
                                {header}
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
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        sortedColumnData.map((rowData, rowIndex) => (
                            <motion.tr
                                key={rowIndex}
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                custom={rowIndex}
                                className="hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                tabIndex={0}
                                role="row"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${rowIndex}-${column}`}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                        role="gridcell"
                                    >
                                        {rowData[column.toLowerCase()] ?? '--'}
                                    </td>
                                ))}
                            </motion.tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
});

Table.displayName = 'Table';

export default Table;