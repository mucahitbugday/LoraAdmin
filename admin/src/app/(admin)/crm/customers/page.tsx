'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { customers } from '@/data'
import type { Customer } from '@/models/Customer';

export default function CustomersPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const filteredCustomers = customers.filter((customer: Customer) => 
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.addressInfo?.officialTitle?.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadgeClass = (status: string) => {
        switch(status) {
            case 'true':
                return 'bg-success';
            case 'false':
                return 'bg-warning';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div className="card-body">
            <div className="row">
                <div className="col-12">
                    <div className="input-group mb-2">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Müşteri Ara..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
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
                        {filteredCustomers.map((customer) => (
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
    )
}
