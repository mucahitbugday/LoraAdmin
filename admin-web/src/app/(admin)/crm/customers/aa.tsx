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
    pageSize: number;
    pageTodalCount: number;
    data: T[];
    filterFields: FilterField[];
}

const sampleData: PageData = {
    page: 50,
    pageCount: 3,
    pageSize: 50,
    pageTodalCount: 100,
    data: [
        {
            id: 1,
            fullName: 'John Deep',
            customerType: 'Bireysel',
            email: 'john.doe@example.com',
            phone: '1234567890',
            status: 'true',
            source: 'e-ticaret',
            store: 'Piazza AVM',
            registerDate: '05.05.2025 15:22'
        }
    ],
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
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPageData(sampleData);
        setCurrentPage(sampleData.page);
        feather.replace();
    }, []);

    useEffect(() => {
        feather.replace();
    }, [pageData]);

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
                            <span className="page-link">...</span>
                        ) : (
                            <button className="page-link" onClick={() => handlePageChange(Number(p))}>
                                {p}
                            </button>
                        )}
                    </li>
                ))}

                {/* Sağa git */}
                <li className={`page-item ${!showRight ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        );
    };

    return (
        <div className="card mt-3">
            <div className="card-header py-2">
                <h5 className="card-title mb-0">Veri Listesi</h5>
            </div>

            <div className="card-body py-2">
                <table className="table table-striped table-hover table-sm">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            {pageData?.filterFields.map(f => (
                                <th key={f.name}>{f.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData?.data.map((item, index) => (
                            <tr key={index} onDoubleClick={() => router.push(`/crm/view/${item.id}`)}>
                                <td>{item.id}</td>
                                {pageData.filterFields.map(f => (
                                    <td key={f.name}>
                                        {f.name === 'status' ? (
                                            <span className={`badge ${item[f.name] === 'true' ? 'bg-success' : 'bg-warning'}`}>
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
    );
}
