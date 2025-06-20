'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface SupportTicket {
    id: number;
    date: string;
    time: string;
    customerName: string;
    subject: string;
    status: 'açık' | 'beklemede' | 'kapandı';
    priority: 'düşük' | 'orta' | 'yüksek';
    ticketType: 'hata' | 'geliştirme' | 'finans onayı' | 'diğer';
    assignedTo: string;
    customerImg: string;
    assignedImg: string;
}


export default function SupportTicketsPage() {
    const router = useRouter();
    const pathname = usePathname();

    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    useEffect(() => {
        setTickets([
            {
                id: 101,
                date: '2025-06-10',
                time: '10:20',
                customerName: 'Ayşe Demir',
                subject: 'Hesap erişim sorunu',
                status: 'açık',
                priority: 'yüksek',
                ticketType: 'hata',
                assignedTo: 'Mehmet Öz',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg',
                assignedImg: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg',
            },
            {
                id: 102,
                date: '2025-06-12',
                time: '14:50',
                customerName: 'Kemal Yılmaz',
                subject: 'Fatura kesilmedi',
                status: 'beklemede',
                priority: 'orta',
                ticketType: 'finans onayı',
                assignedTo: 'Elif Kaya',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-2.jpg',
                assignedImg: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg',
            },
            {
                id: 103,
                date: '2025-06-13',
                time: '09:30',
                customerName: 'Zeynep Ak',
                subject: 'Yeni rapor modülü',
                status: 'kapandı',
                priority: 'düşük',
                ticketType: 'geliştirme',
                assignedTo: 'Ahmet Yılmaz',
                customerImg: 'https://demo.adminkit.io/img/avatars/avatar-5.jpg',
                assignedImg: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg',
            },
        ]);
    }, []);


    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch =
            ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
        const matchesType = filterType === 'all' || ticket.ticketType === filterType;

        // Date range filtering
        const ticketDate = new Date(ticket.date);
        const matchesStartDate = !startDate || ticketDate >= new Date(startDate);
        const matchesEndDate = !endDate || ticketDate <= new Date(endDate);

        return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesStartDate && matchesEndDate;
    });

    const getStatusBadgeClass = (status: SupportTicket['status']) => {
        switch (status) {
            case 'açık': return 'bg-success';
            case 'beklemede': return 'bg-warning text-dark';
            case 'kapandı': return 'bg-secondary';
            default: return 'bg-secondary';
        }
    };

    const getPriorityBadgeClass = (priority: SupportTicket['priority']) => {
        switch (priority) {
            case 'yüksek': return 'bg-danger';
            case 'orta': return 'bg-info text-dark';
            case 'düşük': return 'bg-primary';
            default: return 'bg-primary';
        }
    };

    const generateAvatar = (name: string) => {
        const encoded = encodeURIComponent(name.trim());
        return `https://ui-avatars.com/api/?name=${encoded}&background=random&color=fff&size=32`;
    };


    return (
        <div className="card flex-fill w-100">
            <div className="card-header pb-1">
                <div className="float-end">
                    <div className="d-flex gap-2 align-items-center">
                        <div className="input-group input-group-sm" style={{ width: '200px' }}>
                            <span className="input-group-text bg-light border-0">
                                <i className="fas fa-calendar"></i>
                            </span>
                            <input 
                                type="date" 
                                className="form-control form-control-sm bg-light border-0" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Başlangıç"
                            />
                        </div>
                        <div className="input-group input-group-sm" style={{ width: '200px' }}>
                            <span className="input-group-text bg-light border-0">
                                <i className="fas fa-calendar"></i>
                            </span>
                            <input 
                                type="date" 
                                className="form-control form-control-sm bg-light border-0" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="Bitiş"
                            />
                        </div>
                        <select
                            className="form-select form-select-sm bg-light border-0"
                            style={{ width: '150px' }}
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Tüm Durumlar</option>
                            <option value="açık">Açık</option>
                            <option value="beklemede">Beklemede</option>
                            <option value="kapandı">Kapandı</option>
                        </select>
                        <select
                            className="form-select form-select-sm bg-light border-0"
                            style={{ width: '150px' }}
                            value={filterPriority}
                            onChange={e => setFilterPriority(e.target.value)}
                        >
                            <option value="all">Tüm Öncelikler</option>
                            <option value="yüksek">Yüksek</option>
                            <option value="orta">Orta</option>
                            <option value="düşük">Düşük</option>
                        </select>
                        <select
                            className="form-select form-select-sm bg-light border-0"
                            style={{ width: '150px' }}
                            value={filterType}
                            onChange={e => setFilterType(e.target.value)}
                        >
                            <option value="all">Tüm Türler</option>
                            <option value="hata">Hata</option>
                            <option value="geliştirme">Geliştirme</option>
                            <option value="finans onayı">Finans Onayı</option>
                            <option value="diğer">Diğer</option>
                        </select>
                        <div className="input-group input-group-sm" style={{ width: '200px' }}>
                            <span className="input-group-text bg-light border-0">
                                <i className="fas fa-search"></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control form-control-sm bg-light border-0" 
                                placeholder="Ara..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <h5 className="card-title mb-0">Destek Talepleri</h5>
            </div>

            <div className="card-body pt-2 pb-3">
                <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '10%' }}>Tarih</th>
                            <th style={{ width: '15%' }}>Müşteri</th>
                            <th style={{ width: '25%' }}>Konu</th>
                            <th style={{ width: '10%' }}>Durum</th>
                            <th style={{ width: '10%' }}>Öncelik</th>
                            <th style={{ width: '10%' }}>Tür</th>
                            <th style={{ width: '15%' }}>Atanan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.map(ticket => (
                            <tr key={ticket.id} onClick={() => router.push(`${pathname}/${ticket.id}`)}>
                                <td>{ticket.id}</td>
                                <td>{ticket.date} {ticket.time}</td>
                                <td className="d-flex align-items-center gap-2">
                                    <img
                                        src={ticket.customerImg}
                                        alt={ticket.customerName}
                                        className="rounded-circle"
                                        width="32"
                                        height="32"
                                    />
                                    <span>{ticket.customerName}</span>
                                </td>
                                <td>{ticket.subject}</td>
                                <td>
                                    <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${getPriorityBadgeClass(ticket.priority)}`}>
                                        {ticket.priority}
                                    </span>
                                </td>
                                <td>{ticket.ticketType}</td>
                                <td className="d-flex align-items-center gap-2">
                                    <img
                                        src={ticket.assignedImg}
                                        alt={ticket.assignedTo}
                                        className="rounded-circle"
                                        width="32"
                                        height="32"
                                    />
                                    <span>{ticket.assignedTo}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>

    );
}
