import React from 'react';

interface TableCardProps {
    title?: string;
    subtitle?: string;
    variant: 'basic' | 'striped' | 'condensed' | 'hoverable' | 'bordered' | 'contextual' | 'responsive';
    data: {
        headers: string[];
        rows: (string | number | React.JSX.Element)[][];
    };
}

const TableCard: React.FC<TableCardProps> = ({ title, subtitle, variant, data }) => {
    const getTableClasses = () => {
        const baseClass = 'table';
        switch (variant) {
            case 'striped':
                return `${baseClass} table-striped`;
            case 'condensed':
                return `${baseClass} table-striped table-sm`;
            case 'hoverable':
                return `${baseClass} table-striped table-hover`;
            case 'bordered':
                return `${baseClass} table-bordered`;
            case 'contextual':
                return baseClass;
            case 'responsive':
                return baseClass;
            default:
                return baseClass;
        }
    };

    const TableContent = () => (
        <table className={getTableClasses()}>
            <thead>
                <tr>
                    {data.headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div >
            {variant === 'responsive' ? (
                <div className="table-responsive">
                    <TableContent />
                </div>
            ) : (
                <TableContent />
            )}
        </div>
    );
};

export default TableCard; 