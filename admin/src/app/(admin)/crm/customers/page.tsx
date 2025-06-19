'use client'

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { customers } from '@/data';
import type { Customer } from '@/models/Customer';
import feather from 'feather-icons';

export default function CustomersPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState<{ email: string }>({ email: '' });

    useEffect(() => {
        feather.replace();
    }, []);

    const handleMainInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterData((prev) => ({ ...prev, [name]: value }));
    };

    const filteredData = customers.filter((customer: Customer) => {
        const matchesSearch =
            customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
            customer.email.toLowerCase().includes(search.toLowerCase()) ||
            customer.addressInfo?.officialTitle?.toLowerCase().includes(search.toLowerCase());

        const matchesEmailFilter = filterData.email
            ? customer.email.toLowerCase().includes(filterData.email.toLowerCase())
            : true;

        return matchesSearch && matchesEmailFilter;
    });

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'true': return 'bg-success';
            case 'false': return 'bg-warning';
            default:    
                return 'bg-secondary';
        }
    };
    
    return (
        <>
            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Müşteri Listesi</h5>
                        <form className="row g-2">
                            <div className="col-auto">
                                <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 200 }} placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >
                                    Filtre
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card-body py-2">
                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
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
                            {filteredData.map((customer) => (
                                <tr key={customer.id} onDoubleClick={() => router.push(`/crm/customers/${customer.id}`)} className="align-middle">
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
                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title">Filtreleme</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="input-group mb-2">
                        <span className="input-group-text" style={{ width: '80px' }}>Email</span>
                        <input
                            name="email"
                            type="text"
                            className="form-control"
                            value={filterData.email}
                            onChange={handleMainInputChange}
                        />
                        <button
                            type="button"
                            className="input-group-text"
                            onClick={() => setFilterData((prev) => ({ ...prev, email: '' }))}
                        >
                            <i data-feather="x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
