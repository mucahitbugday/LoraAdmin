'use client'

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Quote {
    id: number;
    quoteNo: string;
    customerName: string;
    customerImg: string;
    amount: number;
    date: string;
    validUntil: string;
    status: 'bekliyor' | 'onaylandi' | 'reddedildi';
}


export default function Page() {
    const router = useRouter();

    const [quotes, setQuotes] = useState<Quote[]>([]);

    // Örnek sipariş verileri
    useEffect(() => {
        setQuotes([
            {
                id: 1,
                quoteNo: 'Q-2025001',
                customerName: 'Ali Korkmaz',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                amount: 15000,
                date: '2025-06-10',
                validUntil: '2025-06-20',
                status: 'bekliyor'
            },
            {
                id: 2,
                quoteNo: 'Q-2025002',
                customerName: 'Zeynep Aydın',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                amount: 23000,
                date: '2025-06-05',
                validUntil: '2025-06-15',
                status: 'onaylandi'
            }
        ]);
    }, []);

    const getQuoteStatusBadgeClass = (status: Quote['status']) => {
        switch (status) {
            case 'bekliyor':
                return 'bg-warning text-dark';
            case 'onaylandi':
                return 'bg-success';
            case 'reddedildi':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    return (
        <div>

            <div className="row g-3">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mt-0">
                                    <h5 className="card-title mb-0">Sales</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-truck align-middle"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-1">2.382</h1>
                            <div className="mb-0">
                                <span className="badge badge-primary-light">-3.65%</span>
                                <span className="text-muted">Since last week</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mt-0">
                                    <h5 className="card-title mb-0">Visitors</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users align-middle"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-1">14.212</h1>
                            <div className="mb-0">
                                <span className="badge badge-success-light">5.25%</span>
                                <span className="text-muted">Since last week</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mt-0">
                                    <h5 className="card-title mb-0">Orders</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-cart align-middle"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-1">64</h1>
                            <div className="mb-0">
                                <span className="badge badge-danger-light">-2.25%</span>
                                <span className="text-muted">Since last week</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col mt-0">
                                    <h5 className="card-title mb-0">Earnings</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-dollar-sign align-middle"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-1">$21.300</h1>
                            <div className="mb-0">
                                <span className="badge badge-success-light">6.65%</span>
                                <span className="text-muted">Since last week</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Teklifler</h5>
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
                    </div>
                </div>
                <div className="card-body py-2">

                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Teklif No</th>
                                <th style={{ width: '20%' }}>Müşteri</th>
                                <th style={{ width: '15%' }}>Tutar</th>
                                <th style={{ width: '15%' }}>Tarih</th>
                                <th style={{ width: '15%' }}>Geçerlilik</th>
                                <th style={{ width: '15%' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id} onClick={() => router.push(`/crm/sales/quotes/${quote.id}`)} className="align-middle">
                                    <td>{quote.id}</td>
                                    <td>{quote.quoteNo}</td>
                                    <td>
                                        <img
                                            src={quote.customerImg}
                                            width="32"
                                            height="32"
                                            className="rounded-circle my-n1"
                                            style={{ marginRight: 10 }}
                                            alt="Avatar"
                                        />
                                        {quote.customerName}
                                    </td>
                                    <td>{quote.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                                    <td>{quote.date}</td>
                                    <td>{quote.validUntil}</td>
                                    <td>
                                        <span className={`badge ${getQuoteStatusBadgeClass(quote.status)}`}>
                                            {quote.status === 'bekliyor'
                                                ? 'Bekliyor'
                                                : quote.status === 'onaylandi'
                                                    ? 'Onaylandı'
                                                    : 'Reddedildi'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Teklifler</h5>
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
                    </div>
                </div>
                <div className="card-body py-2">

                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Teklif No</th>
                                <th style={{ width: '20%' }}>Müşteri</th>
                                <th style={{ width: '15%' }}>Tutar</th>
                                <th style={{ width: '15%' }}>Tarih</th>
                                <th style={{ width: '15%' }}>Geçerlilik</th>
                                <th style={{ width: '15%' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id} onClick={() => router.push(`/crm/sales/quotes/${quote.id}`)} className="align-middle">
                                    <td>{quote.id}</td>
                                    <td>{quote.quoteNo}</td>
                                    <td>
                                        <img
                                            src={quote.customerImg}
                                            width="32"
                                            height="32"
                                            className="rounded-circle my-n1"
                                            style={{ marginRight: 10 }}
                                            alt="Avatar"
                                        />
                                        {quote.customerName}
                                    </td>
                                    <td>{quote.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                                    <td>{quote.date}</td>
                                    <td>{quote.validUntil}</td>
                                    <td>
                                        <span className={`badge ${getQuoteStatusBadgeClass(quote.status)}`}>
                                            {quote.status === 'bekliyor'
                                                ? 'Bekliyor'
                                                : quote.status === 'onaylandi'
                                                    ? 'Onaylandı'
                                                    : 'Reddedildi'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Teklifler</h5>
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
                    </div>
                </div>
                <div className="card-body py-2">

                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Teklif No</th>
                                <th style={{ width: '20%' }}>Müşteri</th>
                                <th style={{ width: '15%' }}>Tutar</th>
                                <th style={{ width: '15%' }}>Tarih</th>
                                <th style={{ width: '15%' }}>Geçerlilik</th>
                                <th style={{ width: '15%' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id} onClick={() => router.push(`/crm/sales/quotes/${quote.id}`)} className="align-middle">
                                    <td>{quote.id}</td>
                                    <td>{quote.quoteNo}</td>
                                    <td>
                                        <img
                                            src={quote.customerImg}
                                            width="32"
                                            height="32"
                                            className="rounded-circle my-n1"
                                            style={{ marginRight: 10 }}
                                            alt="Avatar"
                                        />
                                        {quote.customerName}
                                    </td>
                                    <td>{quote.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                                    <td>{quote.date}</td>
                                    <td>{quote.validUntil}</td>
                                    <td>
                                        <span className={`badge ${getQuoteStatusBadgeClass(quote.status)}`}>
                                            {quote.status === 'bekliyor'
                                                ? 'Bekliyor'
                                                : quote.status === 'onaylandi'
                                                    ? 'Onaylandı'
                                                    : 'Reddedildi'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Teklifler</h5>
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
                    </div>
                </div>
                <div className="card-body py-2">

                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Teklif No</th>
                                <th style={{ width: '20%' }}>Müşteri</th>
                                <th style={{ width: '15%' }}>Tutar</th>
                                <th style={{ width: '15%' }}>Tarih</th>
                                <th style={{ width: '15%' }}>Geçerlilik</th>
                                <th style={{ width: '15%' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id} onClick={() => router.push(`/crm/sales/quotes/${quote.id}`)} className="align-middle">
                                    <td>{quote.id}</td>
                                    <td>{quote.quoteNo}</td>
                                    <td>
                                        <img
                                            src={quote.customerImg}
                                            width="32"
                                            height="32"
                                            className="rounded-circle my-n1"
                                            style={{ marginRight: 10 }}
                                            alt="Avatar"
                                        />
                                        {quote.customerName}
                                    </td>
                                    <td>{quote.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                                    <td>{quote.date}</td>
                                    <td>{quote.validUntil}</td>
                                    <td>
                                        <span className={`badge ${getQuoteStatusBadgeClass(quote.status)}`}>
                                            {quote.status === 'bekliyor'
                                                ? 'Bekliyor'
                                                : quote.status === 'onaylandi'
                                                    ? 'Onaylandı'
                                                    : 'Reddedildi'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Teklifler</h5>
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
                    </div>
                </div>
                <div className="card-body py-2">

                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Teklif No</th>
                                <th style={{ width: '20%' }}>Müşteri</th>
                                <th style={{ width: '15%' }}>Tutar</th>
                                <th style={{ width: '15%' }}>Tarih</th>
                                <th style={{ width: '15%' }}>Geçerlilik</th>
                                <th style={{ width: '15%' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id} onClick={() => router.push(`/crm/sales/quotes/${quote.id}`)} className="align-middle">
                                    <td>{quote.id}</td>
                                    <td>{quote.quoteNo}</td>
                                    <td>
                                        <img
                                            src={quote.customerImg}
                                            width="32"
                                            height="32"
                                            className="rounded-circle my-n1"
                                            style={{ marginRight: 10 }}
                                            alt="Avatar"
                                        />
                                        {quote.customerName}
                                    </td>
                                    <td>{quote.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</td>
                                    <td>{quote.date}</td>
                                    <td>{quote.validUntil}</td>
                                    <td>
                                        <span className={`badge ${getQuoteStatusBadgeClass(quote.status)}`}>
                                            {quote.status === 'bekliyor'
                                                ? 'Bekliyor'
                                                : quote.status === 'onaylandi'
                                                    ? 'Onaylandı'
                                                    : 'Reddedildi'}
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
