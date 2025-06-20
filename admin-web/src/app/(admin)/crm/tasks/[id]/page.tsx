'use client'

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    id: number;
    name: string;
    avatar: string;
}

interface Comment {
    id: number;
    author: User;
    content: string;
    date: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    assignedTo: User;
    startDate: string;
    dueDate: string;
    priority: 'Düşük' | 'Orta' | 'Yüksek';
    status: 'Yapılacak' | 'Devam Ediyor' | 'Tamamlandı' | 'İptal';
    progress: number; // 0-100 arası
    attachments: File[];
    comments: Comment[];
}

const usersMock: User[] = [
    { id: 1, name: 'Ahmet Yılmaz', avatar: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg' },
    { id: 2, name: 'Elif Kaya', avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 3, name: 'Mehmet Demir', avatar: 'https://demo.adminkit.io/img/avatars/avatar-5.jpg' },
];

export default function TaskDetailPage() {
    const router = useRouter();
    const pathname = usePathname();
    const id = Number(pathname.split('/').pop());

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [formErrors, setFormErrors] = useState<string[]>([]);

    useEffect(() => {
        // Simule edilmiş fetch
        const fetchedTask: Task = {
            id,
            title: 'Web sitesi revizyonu',
            description: 'Web sitesindeki tüm görseller güncellenecek ve SEO optimize edilecek.',
            assignedTo: usersMock[0],
            startDate: '2025-06-14',
            dueDate: '2025-06-20',
            priority: 'Yüksek',
            status: 'Yapılacak',
            progress: 40,
            attachments: [],
            comments: [
                { id: 1, author: usersMock[1], content: 'SEO analizi yapılmalı.', date: '2025-06-10' },
                { id: 2, author: usersMock[2], content: 'Görseller optimize edildi.', date: '2025-06-12' }
            ]
        };
        setTask(fetchedTask);
    }, [id]);

    // Input handler
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!task) return;
        const { name, value } = e.target;

        if (name === 'assignedTo') {
            const selectedUser = usersMock.find(u => u.id === Number(value));
            if (selectedUser) setTask(prev => prev ? { ...prev, assignedTo: selectedUser } : prev);
        } else if (name === 'attachments') {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                setTask(prev => prev ? { ...prev, attachments: [...prev.attachments, ...Array.from(files)] } : prev);
            }
        } else {
            setTask(prev => prev ? { ...prev, [name]: value } : prev);
        }
    };

    // Progress handler
    const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!task) return;
        let val = Number(e.target.value);
        if (val < 0) val = 0;
        if (val > 100) val = 100;
        setTask(prev => prev ? { ...prev, progress: val } : prev);
    };

    // Yorum ekleme
    const handleAddComment = (e: FormEvent) => {
        e.preventDefault();
        if (!task || !newComment.trim()) return;

        const comment: Comment = {
            id: task.comments.length + 1,
            author: usersMock[0], // Şu anki kullanıcı - backend ile değiştirilmeli
            content: newComment.trim(),
            date: new Date().toISOString().slice(0, 10),
        };
        setTask({ ...task, comments: [...task.comments, comment] });
        setNewComment('');
    };

    // Form validasyon örneği
    const validateForm = () => {
        const errors: any = [];
        if (!task) return errors;
        if (!task.title.trim()) errors.push('Başlık boş olamaz');
        if (!task.startDate) errors.push('Başlangıç tarihi gerekli');
        if (!task.dueDate) errors.push('Bitiş tarihi gerekli');
        return errors;
    };

    // Kaydetme simülasyonu
    const handleSave = () => {
        const errors = validateForm();
        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors([]);
        setLoading(true);

        // Burada gerçek API çağrısı yapılmalı
        setTimeout(() => {
            setLoading(false);
            alert('Görev başarıyla kaydedildi!');
            router.back();
        }, 1500);
    };

    if (!task) return <div>Yükleniyor...</div>;

    return (
        <div className="card p-4">
            <h3>Görev Detayı - #{task.id}</h3>

            {formErrors.length > 0 && (
                <div className="alert alert-danger">
                    <ul className="mb-0">
                        {formErrors.map((err, i) => (<li key={i}>{err}</li>))}
                    </ul>
                </div>
            )}

            <div className="row mb-3">
                <div className="col-6">
                    <label className="form-label">Görev Başlığı</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={task.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-6">
                    <label className="form-label">Atanan Kişi</label>
                    <select
                        className="form-select"
                        name="assignedTo"
                        value={task.assignedTo.id}
                        onChange={handleInputChange}
                    >
                        {usersMock.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Açıklama</label>
                <textarea
                    className="form-control"
                    name="description"
                    rows={5}
                    value={task.description}
                    onChange={handleInputChange}
                />
            </div>

            <div className="row mb-3">
                <div className="col-3">
                    <label className="form-label">Başlangıç Tarihi</label>
                    <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={task.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-3">
                    <label className="form-label">Bitiş Tarihi</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-3">
                    <label className="form-label">Öncelik</label>
                    <select
                        className="form-select"
                        name="priority"
                        value={task.priority}
                        onChange={handleInputChange}
                    >
                        <option value="Düşük">Düşük</option>
                        <option value="Orta">Orta</option>
                        <option value="Yüksek">Yüksek</option>
                    </select>
                </div>
                <div className="col-3">
                    <label className="form-label">Durum</label>
                    <select
                        className="form-select"
                        name="status"
                        value={task.status}
                        onChange={handleInputChange}
                    >
                        <option value="Yapılacak">Yapılacak</option>
                        <option value="Devam Ediyor">Devam Ediyor</option>
                        <option value="Tamamlandı">Tamamlandı</option>
                        <option value="İptal">İptal</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">İlerleme: {task.progress}%</label>
                <input
                    type="range"
                    className="form-range"
                    min={0}
                    max={100}
                    value={task.progress}
                    onChange={handleProgressChange}
                />
                <div className="progress mt-1" style={{ height: '10px' }}>
                    <div className={`progress-bar ${task.progress === 100 ? 'bg-success' : 'bg-info'}`} role="progressbar" style={{ width: `${task.progress}%` }} aria-valuenow={task.progress} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Dosyalar</label>
                <input
                    type="file"
                    multiple
                    className="form-control"
                    name="attachments"
                    onChange={handleInputChange}
                />
                {task.attachments.length > 0 && (
                    <ul className="list-group mt-2">
                        {task.attachments.map((file, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                {file.name}
                                {/* İstersen silme butonu da ekleyebilirsin */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Yorumlar</label>
                <ul className="list-group mb-2" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {task.comments.map(comment => (
                        <li key={comment.id} className="list-group-item">
                            <div className="d-flex align-items-center mb-1">
                                <img src={comment.author.avatar} alt={comment.author.name} width="30" height="30" className="rounded-circle me-2" />
                                <strong>{comment.author.name}</strong>
                                <small className="text-muted ms-auto">{comment.date}</small>
                            </div>
                            <p className="mb-0">{comment.content}</p>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleAddComment}>
                    <textarea
                        className="form-control mb-2"
                        rows={2}
                        placeholder="Yeni yorum ekle..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="btn btn-sm btn-primary">Yorumu Ekle</button>
                </form>
            </div>

            <div>
                <button className="btn btn-primary me-2" onClick={handleSave} disabled={loading}>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
                <button className="btn btn-secondary" onClick={() => router.back()} disabled={loading}>
                    Geri
                </button>
            </div>
        </div>
    );
}
