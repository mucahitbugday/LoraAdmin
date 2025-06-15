'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { customers } from '@/data'
import type { Customer } from '@/models/Customer';

export default function CustomersPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const filteredData = customers.filter((customer: Customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.addressInfo?.officialTitle?.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'true':
                return 'bg-success';
            case 'false':
                return 'bg-warning';
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
                        <div className="float-end">
                            <form className="row g-2">

                                <div className="col-auto">
                                    <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 200 }} placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <div className="col-auto">
                                    {/* <button type='button' onClick={handleOpenFilter}>Filtre</button> */}
                                    <button className="btn btn-primary btn-sm " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtre</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-body py-2">
                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '5%' }}></th>
                                <th style={{ width: '15%' }}>Adı Soyadı</th>
                                <th style={{ width: '20%' }}>Şirket</th>
                                <th style={{ width: '20%' }}>Email</th>
                                <th style={{ width: '15%' }}>Telefon</th>
                                <th style={{ width: '10%' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((customer) => (
                                <tr key={customer.id} onClick={() => router.push(`/crm/customers/${customer.id}`)} className="align-middle">
                                    <td>{customer.id}</td>
                                    <td><img src={customer.image} width="32" height="32" className="rounded-circle my-n1" alt="Avatar" /></td>
                                    <td>{customer.name}</td>
                                    <td>{customer.addressInfo?.officialTitle}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(customer.status)}`}>
                                            {customer.status === 'true' ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
                        etc.
                    </div>
                </div>
            </div>
        </>

    )
}
