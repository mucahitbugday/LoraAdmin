'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { customers } from '@/data';
import type { Customer } from '@/models/Customer';
import feather from 'feather-icons';

export default function CustomersPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState<Record<string, string>>({
        fullName: '',
        customerType: '',
        email: '',
        phone: '',
        status: '',
        source: '',
        store: '',
        registerDate: '',
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        feather.replace();
    }, []);

    // Arama ve filtre değişince sayfa 1'e dönsün
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterData]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterData((prev) => ({ ...prev, [name]: value }));
    };

    const filteredData = customers.filter((customer: Customer) => {
        const matchesSearch =
            customer.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            customer.email?.toLowerCase().includes(search.toLowerCase()) ||
            customer.addressInfo?.officialTitle?.toLowerCase().includes(search.toLowerCase());

        const matchesFilters = Object.entries(filterData).every(([key, val]) => {
            if (!val) return true;
            const customerValue = (customer as any)[key];
            return customerValue?.toString().toLowerCase().includes(val.toLowerCase());
        });

        return matchesSearch && matchesFilters;
    });

    // Pagination hesaplama
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'true': return 'bg-success';
            case 'false': return 'bg-warning';
            default: return 'bg-secondary';
        }
    };

    const filterFields: { name: keyof Customer; label: string }[] = [
        { name: 'fullName', label: 'Ad Soyad' },
        { name: 'customerType', label: 'Müşteri Tipi' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Telefon' },
        { name: 'status', label: 'Durum' },
        { name: 'source', label: 'Kaynak' },
        { name: 'store', label: 'Mağaza' },
        { name: 'registerDate', label: 'Kayıt Tarihi' },
    ];

    return (
        <>
            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Müşteri Listesi</h5>
                        <form className="row g-2">
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control form-control-sm bg-light rounded-2 border-0"
                                    style={{ width: 200 }}
                                    placeholder="Ara..."
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
                                    aria-controls="offcanvasRight"
                                >
                                    Filtre
                                </button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-info btn-sm" type="button">
                                    Müşteri Ekle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card-body py-2">
                    <table
                        className="table table-striped table-hover"
                        style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}
                    >
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Adı Soyadı</th>
                                <th style={{ width: '15%' }}>Müşteri Tipi</th>
                                <th style={{ width: '20%' }}>Email</th>
                                <th style={{ width: '15%' }}>Telefon</th>
                                <th style={{ width: '10%' }}>Durum</th>
                                <th style={{ width: '10%' }}>Kaynak</th>
                                <th style={{ width: '10%' }}>Mağaza</th>
                                <th style={{ width: '10%' }}>Kayıt Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((customer) => (
                                <tr
                                    key={customer.id}
                                    onDoubleClick={() => router.push(`/crm/customers/${customer.id}`)}
                                    className="align-middle"
                                >
                                    <td>{customer.id}</td>
                                    <td>{customer.fullName}</td>
                                    <td>{customer.customerType}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(customer.status)}`}>
                                            {customer.status === 'true' ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                    <td>{customer.source}</td>
                                    <td>{customer.store}</td>
                                    <td>{customer.registerDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center align-items-center my-2">
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        &laquo;
                                    </button>
                                </li>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <li
                                        key={page}
                                        className={`page-item ${page === currentPage ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        &raquo;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* OFFCANVAS */}
            <div
                className="offcanvas offcanvas-end"
                tabIndex={-1}
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title">Filtreleme</h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    {filterFields.map(({ name, label }) => (
                        <div key={name} className="input-group mb-2">
                            <span className="input-group-text" style={{ width: '120px' }}>
                                {label}
                            </span>
                            <input
                                name={name}
                                type="text"
                                className="form-control"
                                value={filterData[name] || ''}
                                onChange={handleFilterChange}
                            />
                            <button
                                type="button"
                                className="input-group-text"
                                onClick={() => setFilterData((prev) => ({ ...prev, [name]: '' }))}
                            >
                                <i data-feather="x"></i>
                            </button>
                        </div>
                    ))}

                    <div className="gap-2 d-flex">
                        <button className="btn btn-secondary flex-grow-1">
                            <i className="align-middle" data-feather="check"></i> Uygula
                        </button>
                        <button
                            className="btn btn-danger flex-grow-1"
                            onClick={() =>
                                setFilterData({
                                    fullName: '',
                                    customerType: '',
                                    email: '',
                                    phone: '',
                                    status: '',
                                    source: '',
                                    store: '',
                                    registerDate: '',
                                })
                            }
                        >
                            <i className="align-middle" data-feather="x"></i> Temizle
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
