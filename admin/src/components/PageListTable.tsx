'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { menuService } from '@/services/helperService';

export interface FilterOption {
    field: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'number';
    options?: { label: string; value: any }[];
}

export interface SortOption {
    field: string;
    direction: 'asc' | 'desc';
}

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    render?: (value: any, row: any) => React.ReactNode;
    type?: 'text' | 'image' | 'boolean' | 'date';
    url?: string;
}

export interface PaginationInfo {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface FilterState {
    [key: string]: any;
}

export default function OrgPage({ pathname, pageTitle }: { pathname: string, pageTitle: string }) {
    // const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({ currentPage: 1, pageSize: 15, totalCount: 1, totalPages: 1 });
    const [columns, setColumns] = useState<TableColumn[]>([]);
    const [filters, setFilters] = useState<FilterState>({});
    const [tempFilters, setTempFilters] = useState<FilterState>({});
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
    const [sort, setSort] = useState<SortOption | null>(null);
    const [formattedData, setFormattedData] = useState<any[]>([]);
    const [debouncedParams, setDebouncedParams] = useState({ filters, sort, page: pagination.currentPage, });




    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await menuService.getMenuFilterList({
                    MenuPath: pathname,
                    Filters: Object.entries(debouncedParams.filters).map(([key, value]) => ({ key, value })),
                    orderBy: debouncedParams.sort ? `${debouncedParams.sort.field} ${debouncedParams.sort.direction}` : '1 DESC',
                    pageNumber: debouncedParams.page,
                    pageLimit: pagination.pageSize
                });
                const pageFiltersResponse = await menuService.getMenuPageFilters({ MenuPath: pathname });
                setFilterOptions(pageFiltersResponse);
                setData(response.pageData);

                // Auto-detect column types
                const detectedColumns = Object.keys(response?.pageData[0] || {}).map(key => {
                    const value = response.pageData[0]?.[key];
                    let type: TableColumn['type'] = 'text';
                    
                    if (typeof value === 'boolean') {
                        type = 'boolean';
                    } else if (typeof value === 'string') {
                        if (moment(value, ['YYYY-MM-DD HH:mm:ss.SSS', moment.ISO_8601], true).isValid()) {
                            type = 'date';
                        } else if (value.startsWith('http') || value.startsWith('/')) {
                            type = 'image';
                        }
                    }
                    
                    return { 
                        field: key, 
                        header: key, 
                        sortable: true,
                        type
                    };
                });
                
                setColumns(detectedColumns);
                setPagination(prev => ({ ...prev, currentPage: debouncedParams.page, totalCount: response.totalCount, totalPages: Math.ceil(response.totalCount / pagination.pageSize) }));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [debouncedParams, pathname, pagination.pageSize, setLoading]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedParams({
                filters,
                sort,
                page: pagination.currentPage,
            });
        }, 400);
        return () => clearTimeout(timer);
    }, [filters, sort, pagination.currentPage]);


    const onPageChange = (page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const onFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page on filter change
    };

    const onSortChange = (newSort: SortOption) => {
        setSort(newSort);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange(filters);
        }, 300);

        return () => clearTimeout(timer);
    }, [filters]);

    useEffect(() => { if (sort) { onSortChange(sort); } }, [sort]);

    useEffect(() => {
        const formattedData = data.map((row: any) => {
            const formattedRow: any = {};
            Object.entries(row).forEach(([key, value]) => {
                const column = columns.find(col => col.field === key);
                if (column?.type === 'image' && value) {
                    formattedRow[key] = value;
                }
                else if (typeof value === 'string' && moment(value, ['YYYY-MM-DD HH:mm:ss.SSS', moment.ISO_8601], true).isValid()) {
                    formattedRow[key] = moment(value).format('DD/MM/YYYY HH:mm');
                }
                else if (typeof value === 'boolean') {
                    formattedRow[key] = value ? '✅ Aktif' : '❌ Pasif';
                }
                else {
                    formattedRow[key] = value;
                }
            });
            return formattedRow;
        });
        setFormattedData(formattedData);
    }, [data, columns]);

    const handleFilterChange = (field: string, value: any) => {
        setTempFilters(prev => ({ ...prev, [field]: value || undefined }));
    };

    const handleApplyFilters = () => {
        setFilters(tempFilters);
        setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page on filter change
    };

    const handleClearFilters = () => {
        setTempFilters({});
        setFilters({});
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    useEffect(() => {
        setTempFilters(filters);
    }, [filters]);

    const handleRemoveFilter = (field: string) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[field];
            return newFilters;
        });
    };

    const handleSort = (field: string) => {
        if (!sort || sort.field !== field) {
            setSort({ field, direction: 'asc' });
        } else {
            setSort(sort.direction === 'asc' ? { field, direction: 'desc' } : null);
        }
    };

    const renderFilterInput = (filter: FilterOption) => {
        const commonProps = {
            value: tempFilters[filter.field] || '',
            onChange: (e: any) => handleFilterChange(filter.field, e.target.value),
            placeholder: `Search ${filter.label}...`
        };

        switch (filter.type) {
            case 'select':
                return (
                    <select className="form-select form-select-sm" {...commonProps}>
                        <option value="">All</option>
                        {filter.options?.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'date':
                return <input type="date" className="form-control form-control-sm" {...commonProps} />;
            case 'number':
                return <input type="number" className="form-control form-control-sm" {...commonProps} />;
            default:
                return <input type="text" className="form-control form-control-sm" {...commonProps} />;
        }
    };

    const renderSortIcon = (field: string) => {
        if (!sort || sort.field !== field) {
            return <i className="align-middle ms-2" data-feather="chevron-down"></i>;
        }
        return sort.direction === 'asc' ? (
            <i className="align-middle ms-2" data-feather="chevron-up"></i>
        ) : (
            <i className="align-middle ms-2" data-feather="chevron-down"></i>
        );
    };


    const renderPagination = () => {
        const { currentPage, totalPages } = pagination;
        const maxVisiblePages = 5;

        // Sayfa aralığını hesapla
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <nav>
                <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(1)} disabled={currentPage === 1}   >
                            <i className="align-middle" data-feather="chevrons-left"></i>
                        </button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}   >
                            <i className="align-middle" data-feather="chevron-left"></i>
                        </button>
                    </li>
                    {pages.map((page) => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(page)}   >
                                {page}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}   >
                            <i className="align-middle" data-feather="chevron-right"></i>
                        </button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}   >
                            <i className="align-middle" data-feather="chevrons-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    const renderSelectedFilters = () => {
        const activeFilters = Object.entries(tempFilters).filter(([_, value]) => value !== undefined && value !== '');
        if (activeFilters.length === 0) return null;

        return (
            <div className="d-flex flex-wrap gap-2">
                {activeFilters.map(([field, value]) => {
                    const filterOption = filterOptions?.find(f => f.field === field);
                    const label = filterOption?.label || field;
                    const displayValue = filterOption?.type === 'select' ? filterOption.options?.find(o => o.value === value)?.label || value : value;
                    return (
                        <span key={field} className="badge bg-primary bg-opacity-10 text-primary p-2 d-flex align-items-center">
                            {label}: {displayValue}
                            <button
                                type="button"
                                className="btn-close btn-close-sm ms-2"
                                onClick={() => handleRemoveFilter(field)}
                                style={{ fontSize: '0.5rem' }}
                            ></button>
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            {/* {loading && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )} */}


            <div className="card m-0">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">{pageTitle}</h5>
                        <div className="float-end">
                            <form className="row g-2">
                                <div className="col-auto">
                                    {renderSelectedFilters()}
                                </div>
                                <div className="col-auto">
                                    <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 200 }} placeholder="Search.." />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtre</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="card-body p-0 d-flex flex-column flex-grow-1">
                    {formattedData.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <h5 className="text-muted">Veri bulunamadı</h5>
                        </div>
                    ) : (
                        <>
                            <div className="table-responsive flex-grow-1" style={{ overflowY: 'auto' }}>
                                <table className="table table-striped table-hover m-0" style={{ width: '100%', cursor: 'pointer' }}>
                                    <thead className="table-light sticky-top" style={{ zIndex: 1 }}>
                                        <tr>
                                            {columns.map((column, index) => (
                                                <th key={index}
                                                    onClick={() => column.sortable && handleSort(column.field)}
                                                    style={{ cursor: column.sortable ? 'pointer' : 'default', whiteSpace: 'nowrap' }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        {column.header}
                                                        {column.sortable && renderSortIcon(column.field)}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formattedData.map((row: any, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {columns.map((column, colIndex) => (
                                                    <td 
                                                        key={colIndex} 
                                                        onClick={() => {
                                                            if (row['_url']) {
                                                                router.push(`/${row['_url']}/${row['ID']}`);
                                                            }
                                                        }} 
                                                        style={{ 
                                                            fontSize: '0.875rem', 
                                                            whiteSpace: 'nowrap',
                                                            cursor: row['_url'] ? 'pointer' : 'default'
                                                        }}
                                                    >
                                                        {column.type === 'image' && row[column.field] ? (
                                                            <img 
                                                                src={row[column.field]} 
                                                                width="32" 
                                                                height="32" 
                                                                className="rounded-circle my-n1" 
                                                                alt={column.header}
                                                                onError={(e) => {
                                                                    e.currentTarget.src = '/placeholder.png';
                                                                }}
                                                            />
                                                        ) : column.render ? (
                                                            column.render(row[column.field], row)
                                                        ) : (
                                                            row[column.field]
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer bg-transparent border-0 d-flex flex-column-reverse flex-md-row justify-content-between align-items-center py-3 gap-2">
                                <small className="text-muted text-center text-md-start w-100 w-md-auto">
                                    {pagination.totalCount > 0
                                        ? `${(pagination.currentPage - 1) * pagination.pageSize + 1} - ${Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} of ${pagination.totalCount} records`
                                        : 'No records found'}
                                </small>
                                <div className="d-flex justify-content-center justify-content-md-end w-100 w-md-auto mb-2 mb-md-0">
                                    {renderPagination()}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header border-bottom  ">
                    <span className="card-title mb-0">{pageTitle}</span>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        {filterOptions?.map((filter, index) => (
                            <div key={index} className="input-group mb-2">
                                <span className="input-group-text" style={{ width: '100px' }}>{filter.label}</span>
                                {renderFilterInput(filter)}
                                <button type="button" className="input-group-text"   >
                                    <i className="align-middle" data-feather="x"></i>
                                </button>
                            </div>
                        ))}

                        <div className='gap-2 d-flex'>
                            <button className="btn btn-secondary flex-grow-1" onClick={handleApplyFilters}>
                                <i className="fas fa-check"></i> Uygula
                            </button>
                            <button className="btn btn-danger flex-grow-1" onClick={handleClearFilters}>
                                <i className="fas fa-times"></i> Temizle
                            </button>
                        </div>


                    </div>
                </div>

            </div>
        </>
    );
} 