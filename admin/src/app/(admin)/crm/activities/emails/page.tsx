'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface EmailLog {
    id: number;
    date: string;
    time: string;
    customerImg: string;
    customerName: string;
    email: string;
    subject: string;
    direction: 'gelen' | 'giden';
    status: 'okundu' | 'bekliyor' | 'hata';
}

export default function Page() {
    const router = useRouter();

    const [emails, setEmails] = useState<EmailLog[]>([]);

    useEffect(() => {
        setEmails([
            {
                id: 1,
                date: '2025-06-14',
                time: '10:20',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Ahmet Yılmaz',
                email: 'ahmet@example.com',
                subject: 'Fiyat Teklifi Talebi',
                direction: 'gelen',
                status: 'okundu',
            },
            {
                id: 2,
                date: '2025-06-13',
                time: '13:45',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Elif Kaya',
                email: 'elif@example.com',
                subject: 'Sipariş Durumu Hk.',
                direction: 'giden',
                status: 'bekliyor',
            },
            {
                id: 3,
                date: '2025-06-12',
                time: '09:30',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Mehmet Demir',
                email: 'mehmet@example.com',
                subject: 'Teslimat Bilgisi',
                direction: 'giden',
                status: 'hata',
            }
        ]);
    }, []);

    const getStatusBadgeClass = (status: EmailLog['status']) => {
        switch (status) {
            case 'okundu':
                return 'bg-success';
            case 'bekliyor':
                return 'bg-warning text-dark';
            case 'hata':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    const getDirectionBadge = (direction: EmailLog['direction']) => {
        return direction === 'gelen'
            ? <span className="badge bg-info">Gelen</span>
            : <span className="badge bg-primary">Giden</span>;
    };

    return (
        <div className="card flex-fill w-100">
            <div className="card-header">
                <div className="float-end">
                    <input type="text" className="form-control form-control-sm bg-light border-0" placeholder="Ara..." />
                </div>
                <h5 className="card-title mb-0">E-posta Kayıtları</h5>
            </div>

            <div className="card-body pt-2 pb-3">
                <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '15%' }}>Tarih</th>
                            <th style={{ width: '25%' }}>Müşteri</th>
                            <th style={{ width: '20%' }}>E-posta</th>
                            <th style={{ width: '20%' }}>Konu</th>
                            <th style={{ width: '7%' }}>Yön</th>
                            <th style={{ width: '8%' }}>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((mail) => (
                            <tr key={mail.id} onClick={() => router.push(`/crm/activities/emails/${mail.id}`)} className="align-middle">
                                <td>{mail.id}</td>
                                <td>{mail.date} {mail.time}</td>
                                <td>
                                    <img src={mail.customerImg} width="32" height="32" className="rounded-circle my-n1 me-2" />
                                    {mail.customerName}
                                </td>
                                <td>{mail.email}</td>
                                <td>{mail.subject}</td>
                                <td>{getDirectionBadge(mail.direction)}</td>
                                <td><span className={`badge ${getStatusBadgeClass(mail.status)}`}>
                                    {mail.status === 'okundu'
                                        ? 'Okundu'
                                        : mail.status === 'bekliyor'
                                            ? 'Bekliyor'
                                            : 'Hata'}
                                </span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
