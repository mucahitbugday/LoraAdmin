'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import feather from 'feather-icons';
import { menuService } from '@/services/helperService';
import { PageDataRequest, PageDataResponse } from '@/services/models/helperModel';

export default function GlobalPageList({ pathname }: { pathname: string }) {
    const router = useRouter();
    const [pageData, setPageData] = useState<PageDataResponse | null>(null);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(12);


    const [orderBy, setOrderBy] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


    const dataload = async () => {
        const req: PageDataRequest = {
            page: currentPage,
            pathname: pathname,
            orderBy: orderBy,
            sortDirection: sortDirection,
            pageLimit: pageLimit,
            search: search,
            filterFields: Object.entries(filterData)
                .map(([name, value]) => ({ name, value }))
                .filter(f => f.value),
        };

        try {
            const data = await menuService.getPageList(req);
            setPageData(data);
            if (!Object.keys(filterData).length) {
                setFilterData(Object.fromEntries(data.filterFields.map(f => [f.name, ''])));
            }
        } catch (error) {
            console.error('Error fetching page data:', error);
        }
    }

    useEffect(() => {
        dataload()
        feather.replace();
    }, [currentPage, orderBy, sortDirection]);



    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilterData(prev => ({ ...prev, [name]: value }));
    };
    const handleApplyFilters = () => {
        setCurrentPage(1);
        dataload();
    }
    const handleClearFilters = () => {
        setFilterData(Object.fromEntries((pageData?.filterFields ?? []).map(f => [f.name, ''])));
        setCurrentPage(1);
        dataload();
    }
    const handlePageChange = (page: number) => {
        const totalPages = pageData ? Math.ceil(pageData.pageTodalCount / pageLimit) : 1;

        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const renderPagination = () => {
        if (!pageData) return null;

        const totalPages = Math.ceil(pageData.pageTodalCount / pageLimit);
        console.log('Total records:', pageData.pageTodalCount, 'Page limit:', pageLimit, 'Total pages:', totalPages);
        const maxButtons = 5;
        const pages: (number | string)[] = [];

        const showLeft = currentPage > 1;
        const showRight = currentPage < totalPages;

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxButtons - 1);

        if (end - start < maxButtons - 1) {
            start = Math.max(1, end - maxButtons + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return (
            <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${!showLeft ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                </li>
                {pages.map((p, i) => (
                    <li key={i} className={`page-item ${p === currentPage ? 'active' : ''} ${p === '...' ? 'disabled' : ''}`} >
                        {p === '...' ? (
                            <span className="page-link" style={{ zIndex: 0 }}>...</span>
                        ) : (
                            <button className="page-link" style={{ zIndex: 0 }} onClick={() => handlePageChange(Number(p))}>{p}</button>
                        )}
                    </li>
                ))}
                <li className={`page-item ${!showRight ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        );
    };
    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'true': return 'bg-success';
            case 'false': return 'bg-warning';
            default: return 'bg-secondary';
        }
    };
    const getSortIcon = (field: string) => {
        if (orderBy === field) {
            return sortDirection === 'asc' ? (
                <i className="bi bi-sort-up ms-1 text-dark"></i>
            ) : (
                <i className="bi bi-sort-down ms-1 text-dark"></i>
            );
        } else {
            return (
                <i className="bi bi-sort-down-alt ms-1 text-secondary"></i>
            );
        }
    };
    const handleSort = (field: string) => {
        if (orderBy === field) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setOrderBy(field);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };
    const handlePageAction = (action: string) => {
        switch (action) {
            case 'new':
                router.push(`${pathname}/new`);
                break;
            case 'export':
                alert('Dışa aktarma işlemi henüz uygulanmadı.');
                break;

            case 'print':
                alert('Yazdırma işlemi henüz uygulanmadı.');
                break;
            default:
                console.warn(`Bilinmeyen işlem: ${action}`);
        }
    }

    return (
        <>
            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="d-flex justify-content-between align-items-end">
                        <h5 className="card-title mb-0">{pageData?.pageTitle}</h5>
                        <form className="row g-2">
                            <div className="col-auto">
                                <button className="btn btn-primary btn-sm" type="button" onClick={() => dataload()}>
                                    <i className="bi bi-arrow-clockwise me-1"></i> Yenile
                                </button>
                            </div>

                            <div className="col-auto">
                                <input type="text" className="form-control form-control-sm bg-light border-0 rounded-2" placeholder="Ara..." style={{ width: 200 }} value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            {pageData?.filterFields && pageData?.filterFields?.length > 0 && (
                                <div className="col-auto">
                                    <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" >
                                        <i className="bi bi-funnel me-1"></i> Filtre
                                    </button>
                                </div>
                            )}
                            {pageData?.butons?.map((btn, index) => (
                                <div key={index} className="col-auto">
                                    <button className="btn btn-sm btn-primary" onClick={() => { handlePageAction(btn.action) }} type="button">
                                        <i className={`bi ${btn.icon} me-1`}></i> {btn.label}
                                    </button>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                <div className="py-2">
                    <table className="table table-striped table-hover" style={{ tableLayout: 'fixed', width: '100%' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                {pageData?.filterFields.map((f) => (
                                    <th key={f.name} style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort(f.name)} >
                                        {f.label}{getSortIcon(f.name)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pageData?.data.map((item, index) => (
                                <tr style={{ cursor: 'pointer' }} key={index} onDoubleClick={() => router.push(`/crm/customers/${item.id}`)}>
                                    <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.id ?? index + 1}
                                    </td>
                                    {pageData.filterFields.map(f => (
                                        <td key={f.name} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                                            {f.name === 'status' ? (
                                                <span className={`badge ${getStatusBadgeClass(item[f.name])}`}>{item[f.name] === 'true' ? 'Aktif' : 'Pasif'}</span>
                                            ) : (
                                                item[f.name]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-center my-2">
                        <nav>{renderPagination()}</nav>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title">{pageData?.pageTitle} Filtre </h5>
                    <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    {pageData?.filterFields.map(({ name, label }) => (
                        <div key={name} className="input-group mb-2">
                            <span className="input-group-text" style={{ width: 120 }}>{label}</span>
                            <input name={name} type="text" className="form-control" value={filterData?.[name] || ''} onChange={handleFilterChange} />
                            <button type="button" className="input-group-text" onClick={() => setFilterData((prev) => ({ ...prev, [name]: '' }))}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                    ))}

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-secondary w-100" onClick={handleApplyFilters}>
                            <i data-feather="check" className="me-1" /> Uygula
                        </button>
                        <button className="btn btn-danger w-100" onClick={handleClearFilters} >
                            <i data-feather="x" className="me-1" /> Temizle
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
