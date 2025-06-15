'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Call {
    id: number;
    date: string;
    time: string;
    customerImg: string;
    customerName: string;
    phone: string;
    type: 'gelen' | 'giden';
    subject: string;
    status: 'cevaplandi' | 'cevapsiz' | 'bekliyor';
}

export default function Page() {
    const router = useRouter();

    const [calls, setCalls] = useState<Call[]>([]);

    useEffect(() => {
        setCalls([
            {
                id: 1,
                date: '2025-06-14',
                time: '14:30',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Ahmet Yılmaz',
                phone: '0532 123 45 67',
                type: 'giden',
                subject: 'Ürün Bilgilendirme',
                status: 'cevaplandi',
            },
            {
                id: 2,
                date: '2025-06-13',
                time: '09:45',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Elif Kaya',
                phone: '0555 987 65 43',
                type: 'gelen',
                subject: 'Destek Talebi',
                status: 'bekliyor',
            },
            {
                id: 3,
                date: '2025-06-12',
                time: '16:00',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Mehmet Demir',
                phone: '0543 111 22 33',
                type: 'giden',
                subject: 'Borç Hatırlatma',
                status: 'cevapsiz',
            }
        ]);
    }, []);

    const getStatusBadgeClass = (status: Call['status']) => {
        switch (status) {
            case 'cevaplandi':
                return 'bg-success';
            case 'cevapsiz':
                return 'bg-danger';
            case 'bekliyor':
                return 'bg-warning text-dark';
            default:
                return 'bg-secondary';
        }
    };

    const getTypeBadge = (type: Call['type']) => {
        return type === 'gelen'
            ? <span className="badge bg-info">Gelen</span>
            : <span className="badge bg-primary">Giden</span>;
    };

    return (
        <div className="card flex-fill w-100">
            <div className="card-header">
                <div className="float-end">
                    <input type="text" className="form-control form-control-sm bg-light border-0" placeholder="Ara..." />
                </div>
                <h5 className="card-title mb-0">Arama Kayıtları</h5>
            </div>

            <div className="card-body pt-2 pb-3">
                <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '15%' }}>Tarih</th>
                            <th style={{ width: '25%' }}>Müşteri</th>
                            <th style={{ width: '15%' }}>Telefon</th>
                            <th style={{ width: '10%' }}>Tip</th>
                            <th style={{ width: '20%' }}>Konu</th>
                            <th style={{ width: '10%' }}>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calls.map((call) => (
                            <tr key={call.id} onClick={() => router.push(`/crm/activities/calls/${call.id}`)} className="align-middle">
                                <td>{call.id}</td>
                                <td>{call.date} {call.time}</td>
                                <td>
                                    <img src={call.customerImg} width="32" height="32" className="rounded-circle my-n1 me-2" />
                                    {call.customerName}
                                </td>
                                <td>{call.phone}</td>
                                <td>{getTypeBadge(call.type)}</td>
                                <td>{call.subject}</td>
                                <td><span className={`badge ${getStatusBadgeClass(call.status)}`}>
                                    {call.status === 'cevaplandi' ? 'Cevaplandı' : call.status === 'cevapsiz' ? 'Cevapsız' : 'Bekliyor'}
                                </span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
