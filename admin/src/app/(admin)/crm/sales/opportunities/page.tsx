'use client'

import { Column } from '@/components/DraggableBoard';
import KanbanPage from '@/components/KanbanPage'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function page() {
    const pathname = usePathname();
    const data: Column[] = [
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

    return (
        <KanbanPage columns={data} />

    )
}
