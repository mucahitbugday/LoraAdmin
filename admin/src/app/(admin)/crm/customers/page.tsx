'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import feather from 'feather-icons';

interface FilterField {
    name: string;
    label: string;
}

interface PageData<T = any> {
    page: number;
    pageCount: number;
    pageTodalCount: number;
    pageTitle: string;
    orderBy?: string;
    data: T[];
    filterFields: FilterField[];
}

function generateSampleData() {
    const names = ['John Deep', 'Alice Stone', 'Michael Ray', 'Sara Connor', 'Tom Hardy'];
    const emails = ['john.doe@example.com', 'alice@example.com', 'mike@example.com', 'sara@example.com', 'tom@example.com'];
    const stores = ['Piazza AVM', 'Forum İstanbul', 'Cevahir', 'Optimum', 'Kanyon'];
    const sources = ['e-ticaret', 'mağaza', 'mobil', 'call center'];
    const statuses = ['true', 'false'];

    const result = [];

    for (let i = 1; i <= 15; i++) {
        const nameIndex = Math.floor(Math.random() * names.length);
        const emailIndex = Math.floor(Math.random() * emails.length);
        const storeIndex = Math.floor(Math.random() * stores.length);
        const sourceIndex = Math.floor(Math.random() * sources.length);
        const statusIndex = Math.floor(Math.random() * statuses.length);

        result.push({
            id: i,
            fullName: names[nameIndex],
            customerType: Math.random() > 0.5 ? 'Bireysel' : 'Kurumsal',
            email: emails[emailIndex],
            phone: `5${Math.floor(100000000 + Math.random() * 900000000)}`,
            status: statuses[statusIndex],
            source: sources[sourceIndex],
            store: stores[storeIndex],
            registerDate:
                new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
                    .toLocaleDateString('tr-TR') +
                ' ' +
                new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        });
    }

    return result;
}

const recordCount = 10;

const sampleData: PageData = {
    pageTitle: 'Müşteri Listesi',
    page: 1,
    orderBy: '',
    pageCount: Math.ceil(recordCount / 10),
    pageTodalCount: recordCount,
    data: generateSampleData(),
    filterFields: [
        { name: 'fullName', label: 'Ad Soyad' },
        { name: 'customerType', label: 'Müşteri Tipi' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Telefon' },
        { name: 'status', label: 'Durum' },
        { name: 'source', label: 'Kaynak' },
        { name: 'store', label: 'Mağaza' },
        { name: 'registerDate', label: 'Kayıt Tarihi' }
    ]
};



export default function GenericTablePage() {
    const router = useRouter();
    const [pageData, setPageData] = useState<PageData | null>(null);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');




    useEffect(() => {
        feather.replace();
        setTimeout(() => {
            setPageData(sampleData);
            setFilterData(Object.fromEntries(sampleData.filterFields.map(f => [f.name, ''])));
        }, 500);
    }, []);

    useEffect(() => {
        setPageData(sampleData);
        setCurrentPage(sampleData.page);
        feather.replace();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilterData(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        const total = pageData?.pageTodalCount ?? 1;
        if (page >= 1 && page <= total) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        if (!pageData) return null;

        const total = pageData.pageTodalCount;
        const maxButtons = 5;
        const pages: (number | string)[] = [];

        const showLeft = currentPage > 1;
        const showRight = currentPage < total;

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(total, start + maxButtons - 1);

        if (end - start < maxButtons - 1) {
            start = Math.max(1, end - maxButtons + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < total) {
            if (end < total - 1) pages.push('...');
            pages.push(total);
        }

        return (
            <ul className="pagination pagination-sm mb-0">
                {/* Sola git */}
                <li className={`page-item ${!showLeft ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                </li>

                {/* Sayfa numaraları */}
                {pages.map((p, i) => (
                    <li
                        key={i}
                        className={`page-item ${p === currentPage ? 'active' : ''} ${p === '...' ? 'disabled' : ''}`}
                    >
                        {p === '...' ? (
                            <span className="page-link" style={{ zIndex: 0 }}>...</span>
                        ) : (
                            <button className="page-link" style={{ zIndex: 0 }} onClick={() => handlePageChange(Number(p))}>
                                {p}
                            </button>
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
                <i className="bi bi-sort ms-1 text-secondary"></i>
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
    };

    return (
        <>
            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="d-flex justify-content-between align-items-end">
                        <h5 className="card-title mb-0">{pageData?.pageTitle}</h5>
                        <form className="row g-2">
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0 rounded-2"
                                    placeholder="Ara..."
                                    style={{ width: 200 }}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="col-auto">
                                <button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                >
                                    Filtre
                                </button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-info btn-sm" type="button" onClick={() => router.push(`/crm/create`)}>
                                    Yeni Kayıt
                                </button>
                            </div>
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
                                        <td
                                            key={f.name}
                                            style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {f.name === 'status' ? (
                                                <span className={`badge ${getStatusBadgeClass(item[f.name])}`}>
                                                    {item[f.name] === 'true' ? 'Aktif' : 'Pasif'}
                                                </span>
                                            ) : (
                                                item[f.name]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    {/* Pagination */}
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
                                <i className="bi bi-x me-1"></i>
                            </button>
                        </div>
                    ))}

                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-secondary w-100">
                            <i data-feather="check" className="me-1" /> Uygula
                        </button>
                        <button className="btn btn-danger w-100" onClick={() => setFilterData(Object.fromEntries((pageData?.filterFields ?? []).map(f => [f.name, ''])))} >
                            <i data-feather="x" className="me-1" /> Temizle
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
