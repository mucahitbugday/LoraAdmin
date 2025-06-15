'use client'

import { Column, KanbanPage } from '@/components/DraggableBoard';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function page() {
    const pathname = usePathname();
    const columns: Column[] = [
        {
            "ColumnID": "col-1",
            "ColumnName": "İlk Temas",
            "ColumnDescription": "İlk müşteri görüşmeleri bu aşamada tutulur.",
            "ColumnStatus": "active",
            "Tasks": [
                {
                    "TaskID": "task-101",
                    "TaskName": "ACME Firması - Ürün Tanıtımı",
                    "TaskDescription": "ACME firması ile ilk tanıtım toplantısı yapıldı.",
                    "TaskStatus": "open"
                },
                {
                    "TaskID": "task-102",
                    "TaskName": "Beta Ltd - İletişime Geçildi",
                    "TaskDescription": "Beta firması ile ön görüşme tamamlandı.",
                    "TaskStatus": "open"
                }
            ]
        },
        {
            "ColumnID": "col-2",
            "ColumnName": "Teklif Verildi",
            "ColumnDescription": "Müşteriye teklif sunulan fırsatlar burada yer alır.",
            "ColumnStatus": "active",
            "Tasks": [
                {
                    "TaskID": "task-103",
                    "TaskName": "Gamma AŞ - Teklif Gönderildi",
                    "TaskDescription": "5.000₺ tutarında teklif gönderildi. Geri dönüş bekleniyor.",
                    "TaskStatus": "pending"
                }
            ]
        },
        {
            "ColumnID": "col-3",
            "ColumnName": "Müzakere",
            "ColumnDescription": "Fiyat ve şartlar üzerinde görüşmeler sürüyor.",
            "ColumnStatus": "active",
            "Tasks": [
                {
                    "TaskID": "task-104",
                    "TaskName": "Delta Teknoloji - Müzakere Aşaması",
                    "TaskDescription": "İndirim talebi görüşülüyor.",
                    "TaskStatus": "negotiation"
                }
            ]
        },
        {
            "ColumnID": "col-4",
            "ColumnName": "Kazanıldı",
            "ColumnDescription": "Başarıyla sonuçlanan satışlar.",
            "ColumnStatus": "closed",
            "Tasks": [
                {
                    "TaskID": "task-105",
                    "TaskName": "Omega Mühendislik - Anlaşma Sağlandı",
                    "TaskDescription": "20.000₺ tutarındaki teklif kabul edildi.",
                    "TaskStatus": "won"
                }
            ]
        },
        {
            "ColumnID": "col-5",
            "ColumnName": "Kaybedildi",
            "ColumnDescription": "Olumsuz sonuçlanan fırsatlar burada yer alır.",
            "ColumnStatus": "closed",
            "Tasks": [
                {
                    "TaskID": "task-106",
                    "TaskName": "Zeta Gıda - Reddedildi",
                    "TaskDescription": "Fiyat yüksek bulunduğu için teklif reddedildi.",
                    "TaskStatus": "lost"
                }
            ]
        }
    ]


    const handleColumnChange = (change: any) => {
        console.log('Kolon değiştirildi');
    };



    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-secondary'; // gri
            case 'in-progress':
                return 'bg-warning'; // sarı
            case 'review':
                return 'bg-info'; // mavi
            case 'done':
                return 'bg-success'; // yeşil
            default:
                return 'bg-light text-dark'; // bilinmeyen statü
        }
    };

    const renderItemContent = (task: any) => {
        const badgeClass = getStatusBadgeClass(task.TaskStatus);
        return (
            <>
                <div className="float-end me-n2">
                    <i className="fas fa-edit" title="Düzenle"></i>
                </div>
                <div className="d-flex flex-column">
                    <h6 className="mb-2">{task.TaskName}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <span className={`badge ${badgeClass} me-2`}>
                                {task.TaskStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="container-fluid p-0">
            {columns && (
                <KanbanPage initialColumns={columns} onColumnChange={handleColumnChange} renderItemContent={renderItemContent} />
            )}
        </div>

    )
}
