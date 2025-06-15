'use client'

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Order {
    id: number;
    orderNo: string;
    customerImg: string
    customerName: string;
    company: string;
    email: string;
    phone: string;
    status: 'hazirlaniyor' | 'teslim_edildi' | 'iptal';
}

export default function Page() {
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);

    // Örnek sipariş verileri
    useEffect(() => {
        setOrders([
            {
                id: 1,
                orderNo: 'ORD-2025001',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Ahmet Yılmaz',
                company: 'Yılmaz İnşaat',
                email: 'ahmet@example.com',
                phone: '0532 123 45 67',
                status: 'hazirlaniyor',
            },
            {
                id: 2,
                orderNo: 'ORD-2025002',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',

                customerName: 'Elif Kaya',
                company: 'Kaya Gıda',
                email: 'elif@example.com',
                phone: '0555 987 65 43',
                status: 'teslim_edildi',
            },
            {
                id: 3,
                orderNo: 'ORD-2025003',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Mehmet Demir',
                company: 'Demir Otomotiv',
                email: 'mehmet@example.com',
                phone: '0543 111 22 33',
                status: 'iptal',
            }
        ]);
    }, []);

    const getStatusBadgeClass = (status: Order['status']) => {
        switch (status) {
            case 'hazirlaniyor':
                return 'bg-warning text-dark';
            case 'teslim_edildi':
                return 'bg-success';
            case 'iptal':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div>


            <div className="w-100">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col mt-0">
                                        <h5 className="card-title">Sales</h5>
                                    </div>

                                    <div className="col-auto">
                                        <div className="stat text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-truck align-middle"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="mt-1 mb-3">2.382</h1>
                                <div className="mb-0">
                                    <span className="badge badge-primary-light">-3.65%</span>
                                    <span className="text-muted">Since last week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col mt-0">
                                        <h5 className="card-title">Visitors</h5>
                                    </div>

                                    <div className="col-auto">
                                        <div className="stat text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users align-middle"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="mt-1 mb-3">14.212</h1>
                                <div className="mb-0">
                                    <span className="badge badge-success-light">5.25%</span>
                                    <span className="text-muted">Since last week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col mt-0">
                                        <h5 className="card-title">Orders</h5>
                                    </div>

                                    <div className="col-auto">
                                        <div className="stat text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-cart align-middle"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="mt-1 mb-3">64</h1>
                                <div className="mb-0">
                                    <span className="badge badge-danger-light">-2.25%</span>
                                    <span className="text-muted">Since last week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col mt-0">
                                        <h5 className="card-title">Earnings</h5>
                                    </div>

                                    <div className="col-auto">
                                        <div className="stat text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-dollar-sign align-middle"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="mt-1 mb-3">$21.300</h1>
                                <div className="mb-0">
                                    <span className="badge badge-success-light">6.65%</span>
                                    <span className="text-muted">Since last week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card flex-fill w-100">
                <div className="card-header">
                    <div className="float-end">
                        <form className="row g-2">
                            <div className="col-auto">
                                <select className="form-select form-select-sm bg-light border-0">
                                    <option>Jan</option>
                                    <option value="1">Feb</option>
                                    <option value="2">Mar</option>
                                    <option value="3">Apr</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 100 }} placeholder="Search.." />
                            </div>
                        </form>
                    </div>
                    <h5 className="card-title mb-0">Siparişler</h5>
                </div>
                <div className="card-body pt-2 pb-3">

                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Sipariş No</th>
                                <th style={{ width: '20%' }}>Adı Soyadı</th>
                                <th style={{ width: '20%' }}>Şirket</th>
                                <th style={{ width: '20%' }}>Email</th>
                                <th style={{ width: '10%' }}>Telefon</th>
                                <th style={{ width: '10%' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} onClick={() => router.push(`/crm/sales/orders/${order.id}`)} className="align-middle">
                                    <td>{order.id}</td>
                                    <td>{order.orderNo}</td>
                                    <td>
                                        <img src={order.customerImg} width="32" height="32" className="rounded-circle my-n1" style={{ marginRight: 10 }} />
                                        {order.customerName}
                                    </td>
                                    <td>{order.company}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                            {order.status === 'hazirlaniyor'
                                                ? 'Hazırlanıyor'
                                                : order.status === 'teslim_edildi'
                                                    ? 'Teslim Edildi'
                                                    : 'İptal'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    );
}
