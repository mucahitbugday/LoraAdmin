'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SupportTicket {
    id: number;
    date: string;
    time: string;
    customerName: string;
    customerEmail: string;
    subject: string;
    description: string;
    status: 'açık' | 'beklemede' | 'kapandı';
    priority: 'düşük' | 'orta' | 'yüksek';
    type: 'hata' | 'geliştirme' | 'finans onayı' | 'diğer';
    assignedTo: string;
    createdBy: string;
    updatedAt: string;
    attachments: { id: number; fileName: string; url: string }[];
}

interface Comment {
    id: number;
    text: string;
    author: string;
    createdAt: string;
}

export default function SupportTicketDetail() {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname?.split('/').pop();

    const [ticket, setTicket] = useState<SupportTicket | null>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [type, setType] = useState<'hata' | 'geliştirme' | 'finans onayı' | 'diğer'>('diğer');
    const [notes, setNotes] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [activeTab, setActiveTab] = useState<'notlar' | 'dosyalar'>();

    useEffect(() => {
        if (!id) return;
        const fetchedTicket: SupportTicket = {
            id: Number(id),
            date: '2025-06-10',
            time: '10:20',
            customerName: 'Ayşe Demir',
            customerEmail: 'ayse@example.com',
            subject: 'Hesap erişim sorunu',
            description: 'Giriş yaparken hata alıyorum. Yardımcı olabilir misiniz?',
            status: 'açık',
            priority: 'yüksek',
            type: 'hata',
            assignedTo: 'Mehmet Öz',
            createdBy: 'Destek Ekibi',
            updatedAt: '2025-06-13 14:45',
            attachments: [
                { id: 1, fileName: 'screenshot.png', url: '/uploads/screenshot.png' },
            ],
        };
        setTicket(fetchedTicket);
        setStatus(fetchedTicket.status);
        setPriority(fetchedTicket.priority);
        setType(fetchedTicket.type);
        setLoading(false);
    }, [id]);

    const getStatusClass = (status: string) =>
        status === 'açık' ? 'bg-success' :
            status === 'beklemede' ? 'bg-warning text-dark' : 'bg-secondary';

    const getPriorityClass = (priority: string) =>
        priority === 'yüksek' ? 'bg-danger' :
            priority === 'orta' ? 'bg-info text-dark' : 'bg-primary';

    const handleSave = () => {
        alert(`Durum: ${status}\nÖncelik: ${priority}\nTür: ${type}\nNotlar: ${notes}`);
    };

    const handleAddComment = () => {
        if (comment.trim()) {
            const newComment: Comment = {
                id: Date.now(),
                text: comment.trim(),
                author: 'Destek Temsilcisi',
                createdAt: new Date().toLocaleString('tr-TR'),
            };
            setComments(prev => [newComment, ...prev]);
            setComment('');
        }
    };

    if (loading || !ticket) return <div className="container my-5">Yükleniyor...</div>;

    return (
        <div className="">
            <div className="row">
                {/* Sol Kısım */}
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Konu</label>
                                <input type="text" className="form-control" value={ticket.subject} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Açıklama</label>
                                <textarea className="form-control" rows={5} readOnly value={ticket.description} />
                            </div>

                            {/* Tabs */}
                            <ul className="nav nav-tabs mb-3">
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === 'notlar' ? 'active' : ''}`} onClick={() => setActiveTab('notlar')}>
                                        📝 Notlar
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${activeTab === 'dosyalar' ? 'active' : ''}`} onClick={() => setActiveTab('dosyalar')}>
                                        📎 Dosyalar
                                    </button>
                                </li>
                            </ul>

                            <div>
                                {activeTab === 'notlar' && (
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            placeholder="Not girin..."
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                        />
                                        <button className="btn btn-primary mt-2" onClick={handleSave}>Kaydet</button>
                                    </div>
                                )}

                                {activeTab === 'dosyalar' && (
                                    <ul className="list-group mb-3">
                                        {ticket.attachments.length === 0
                                            ? <li className="list-group-item text-muted">Dosya yok</li>
                                            : ticket.attachments.map(file => (
                                                <li key={file.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {file.fileName}
                                                    <a href={file.url} target="_blank" className="btn btn-sm btn-outline-primary">İndir</a>
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Yorumlar */}
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h5 className="card-title mb-3">💬 Yorumlar</h5>

                            {comments.length === 0 ? (
                                <p className="text-muted">Henüz yorum yapılmadı.</p>
                            ) : (
                                <ul className="list-group mb-3">
                                    {comments.map(c => (
                                        <li key={c.id} className="list-group-item">
                                            <div className="fw-semibold">{c.author} <small className="text-muted">({c.createdAt})</small></div>
                                            <div>{c.text}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <div className="mt-3">
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    placeholder="Yorum yazın..."
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                                <button className="btn btn-outline-success mt-2" onClick={handleAddComment}>Yorum Ekle</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sağ Kısım */}
                <div className="col-md-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '80px' }}>
                        <div className="card-body">
                            <h5 className="card-title">📋 Ticket Bilgileri</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Ticket:</strong> {ticket.id}</li>
                                <li className="list-group-item"><strong>Müşteri:</strong> {ticket.customerName}</li>
                                <li className="list-group-item"><strong>E-posta:</strong> {ticket.customerEmail}</li>
                                <li className="list-group-item"><strong>Oluşturma:</strong> {ticket.date} {ticket.time}</li>
                                <li className="list-group-item"><strong>Atanan:</strong> {ticket.assignedTo}</li>
                                <li className="list-group-item"><strong>Durum:</strong> <span className={`badge ${getStatusClass(status)}`}>{status}</span></li>
                                <li className="list-group-item"><strong>Öncelik:</strong> <span className={`badge ${getPriorityClass(priority)}`}>{priority}</span></li>
                                <li className="list-group-item"><strong>Tür:</strong> {type}</li>
                                <li className="list-group-item"><strong>Güncellendi:</strong> {ticket.updatedAt}</li>
                            </ul>

                            <div className="mt-3">
                                <label className="form-label fw-semibold">Durumu Değiştir</label>
                                <select className="form-select mb-2" value={status} onChange={e => setStatus(e.target.value)}>
                                    <option value="açık">Açık</option>
                                    <option value="beklemede">Beklemede</option>
                                    <option value="kapandı">Kapandı</option>
                                </select>

                                <label className="form-label fw-semibold">Öncelik</label>
                                <select className="form-select mb-2" value={priority} onChange={e => setPriority(e.target.value)}>
                                    <option value="yüksek">Yüksek</option>
                                    <option value="orta">Orta</option>
                                    <option value="düşük">Düşük</option>
                                </select>

                                <label className="form-label fw-semibold">Tür</label>
                                <select className="form-select" value={type} onChange={e => setType(e.target.value as any)}>
                                    <option value="hata">Hata</option>
                                    <option value="geliştirme">Geliştirme</option>
                                    <option value="finans onayı">Finans Onayı</option>
                                    <option value="diğer">Diğer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
