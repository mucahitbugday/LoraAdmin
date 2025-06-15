'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Participant {
    name: string;
    avatar: string;
}

interface Meeting {
    id: number;
    date: string;
    time: string;
    customerImg: string;
    customerName: string;
    subject: string;
    location: string;
    participants: Participant[];
    status: 'planlandi' | 'yapildi' | 'iptal';
}

export default function Page() {
    const router = useRouter();
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setMeetings([
            {
                id: 1,
                date: '2025-06-15',
                time: '14:00',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Ahmet Yılmaz',
                subject: 'Teklif Sunumu',
                location: 'Zoom',
                status: 'planlandi',
                participants: [
                    { name: 'Zeynep', avatar: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg' },
                    { name: 'Murat', avatar: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg' },
                    { name: 'Serkan', avatar: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg' },
                    { name: 'Ayşe', avatar: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg' },
                ],
            },
            {
                id: 2,
                date: '2025-06-12',
                time: '11:00',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Elif Kaya',
                subject: 'Sözleşme Görüşmesi',
                location: 'Ofis',
                status: 'yapildi',
                participants: [
                    { name: 'Elif Kaya', avatar: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg' },
                    { name: 'Ahmet Yılmaz', avatar: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg' },
                    { name: 'Mehmet Demir', avatar: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg' },
                ],
            },
            {
                id: 3,
                date: '2025-06-10',
                time: '16:30',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
                customerName: 'Mehmet Demir',
                subject: 'Demo Sunumu',
                location: 'Google Meet',
                status: 'iptal',
                participants: [
                    { name: 'Nuray', avatar: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg' },
                    { name: 'Cenk', avatar: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg' },
                ],
            },
        ]);
    }, []);

    const getStatusBadgeClass = (status: Meeting['status']) => {
        switch (status) {
            case 'planlandi':
                return 'bg-warning text-dark';
            case 'yapildi':
                return 'bg-success';
            case 'iptal':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    // Arama filtreleme
    const filteredMeetings = meetings.filter(
        (m) =>
            m.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="card flex-fill w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Toplantılar</h5>
                <input
                    type="text"
                    className="form-control form-control-sm bg-light border-0"
                    style={{ maxWidth: 200 }}
                    placeholder="Ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Toplantılar arasında ara"
                />
            </div>

            <div className="card-body pt-2 pb-3">
                <table
                    className="table table-striped table-hover"
                    style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}
                >
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '15%' }}>Tarih</th>
                            <th style={{ width: '20%' }}>Müşteri</th>
                            <th style={{ width: '25%' }}>Konu</th>
                            <th style={{ width: '15%' }}>Lokasyon</th>
                            <th style={{ width: '20%' }}>Katılımcılar</th>
                            <th style={{ width: '10%' }}>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMeetings.map((meeting) => (
                            <tr
                                key={meeting.id}
                                onClick={() => router.push(`/crm/activities/meetings/${meeting.id}`)}
                                className="align-middle"
                            >
                                <td>{meeting.id}</td>
                                <td>
                                    {meeting.date} {meeting.time}
                                </td>
                                <td>
                                    <img
                                        src={meeting.customerImg}
                                        width="32"
                                        height="32"
                                        className="rounded-circle my-n1 me-2"
                                        alt={`${meeting.customerName} avatar`}
                                    />
                                    {meeting.customerName}
                                </td>
                                <td>{meeting.subject}</td>
                                <td>{meeting.location}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        {meeting.participants.slice(0, 3).map((p, i) => (
                                            <img
                                                key={i}
                                                src={p.avatar}
                                                title={p.name}
                                                className="rounded-circle me-1"
                                                width="24"
                                                height="24"
                                                alt={`${p.name} avatar`}
                                            />
                                        ))}
                                        {meeting.participants.length > 3 && (
                                            <span className="text-muted">+{meeting.participants.length - 3}</span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${getStatusBadgeClass(meeting.status)}`}>
                                        {meeting.status === 'planlandi'
                                            ? 'Planlandı'
                                            : meeting.status === 'yapildi'
                                                ? 'Yapıldı'
                                                : 'İptal'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filteredMeetings.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center text-muted">
                                    Kayıt bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
