'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Task {
    id: number;
    title: string;
    assignedTo: { name: string; avatar: string };
    startDate: string;
    dueDate: string;
    priority: 'Düşük' | 'Orta' | 'Yüksek';
    status: 'Yapılacak' | 'Devam Ediyor' | 'Tamamlandı' | 'İptal';
}

export default function Page() {
    const router = useRouter();

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks([
            {
                id: 1,
                title: 'Web sitesi revizyonu',
                assignedTo: { name: 'Ahmet Yılmaz', avatar: 'https://demo.adminkit.io/img/avatars/avatar-3.jpg' },
                startDate: '2025-06-14',
                dueDate: '2025-06-20',
                priority: 'Yüksek',
                status: 'Yapılacak',
            },
            {
                id: 2,
                title: 'Müşteri toplantısı hazırlığı',
                assignedTo: { name: 'Elif Kaya', avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
                startDate: '2025-06-12',
                dueDate: '2025-06-15',
                priority: 'Orta',
                status: 'Devam Ediyor',
            },
            {
                id: 3,
                title: 'Teklif dokümanlarını güncelle',
                assignedTo: { name: 'Mehmet Demir', avatar: 'https://demo.adminkit.io/img/avatars/avatar-5.jpg' },
                startDate: '2025-06-10',
                dueDate: '2025-06-13',
                priority: 'Düşük',
                status: 'Tamamlandı',
            }
        ]);
    }, []);

    const getStatusBadgeClass = (status: Task['status']) => {
        switch (status) {
            case 'Yapılacak':
                return 'bg-warning text-dark';
            case 'Devam Ediyor':
                return 'bg-info text-white';
            case 'Tamamlandı':
                return 'bg-success';
            case 'İptal':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    };

    const getPriorityBadgeClass = (priority: Task['priority']) => {
        switch (priority) {
            case 'Yüksek':
                return 'bg-danger';
            case 'Orta':
                return 'bg-warning text-dark';
            case 'Düşük':
                return 'bg-secondary';
            default:
                return 'bg-secondary';
        }
    };

    // Durum güncelleme fonksiyonu (şimdilik sadece state güncelliyor)
    const handleStatusChange = (id: number, newStatus: Task['status']) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, status: newStatus } : task));
    };

    // Öncelik güncelleme fonksiyonu
    const handlePriorityChange = (id: number, newPriority: Task['priority']) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, priority: newPriority } : task));
    };

    return (
        <div className="card flex-fill w-100">
            <div className="card-header">
                <div className="float-end">
                    <input type="text" className="form-control form-control-sm bg-light border-0" placeholder="Ara..." />
                </div>
                <h5 className="card-title mb-0">Görevler</h5>
            </div>

            <div className="card-body pt-2 pb-3">
                <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '25%' }}>Görev</th>
                            <th style={{ width: '20%' }}>Atanan</th>
                            <th style={{ width: '15%' }}>Başlangıç</th>
                            <th style={{ width: '15%' }}>Bitiş</th>
                            <th style={{ width: '10%' }}>Öncelik</th>
                            <th style={{ width: '15%' }}>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id} onClick={() => router.push(`/crm/tasks/${task.id}`)} className="align-middle">
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>
                                    <img src={task.assignedTo.avatar} width="32" height="32" className="rounded-circle my-n1 me-2" />
                                    {task.assignedTo.name}
                                </td>
                                <td>{task.startDate}</td>
                                <td>{task.dueDate}</td>
                                <td>
                                    <select
                                        className={`form-select form-select-sm ${getPriorityBadgeClass(task.priority)}`}
                                        value={task.priority}
                                        onClick={e => e.stopPropagation()}
                                        onChange={e => handlePriorityChange(task.id, e.target.value as Task['priority'])}
                                    >
                                        <option value="Düşük">Düşük</option>
                                        <option value="Orta">Orta</option>
                                        <option value="Yüksek">Yüksek</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className={`form-select form-select-sm ${getStatusBadgeClass(task.status)}`}
                                        value={task.status}
                                        onClick={e => e.stopPropagation()}
                                        onChange={e => handleStatusChange(task.id, e.target.value as Task['status'])}
                                    >
                                        <option value="Yapılacak">Yapılacak</option>
                                        <option value="Devam Ediyor">Devam Ediyor</option>
                                        <option value="Tamamlandı">Tamamlandı</option>
                                        <option value="İptal">İptal</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
