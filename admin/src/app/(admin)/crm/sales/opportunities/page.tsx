'use client'

import { Column } from '@/components/DraggableBoard';
import { KanbanPage } from '@/components/KanbanPage';
import { usePathname } from 'next/navigation';
import React, { useState, useMemo } from 'react'
import KanbanColumnModal from './KanbanColumnModal';

const data = [
    {
        "ColumnID": "col-1",
        "ColumnName": "İlk Temas",
        "ColumnDescription": "İlk müşteri görüşmeleri bu aşamada tutulur.",
        "ColumnStatus": true,
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
        "ColumnStatus": true,
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
        "ColumnStatus": true,
        "Tasks": [
            {
                "TaskID": "task-104",
                "TaskName": "Delta Teknoloji - Müzakere Aşaması",
                "TaskDescription": "İndirim talebi görüşülüyor.",
                "TaskStatus": "negotiation"
            }
        ]
    },
]

export default function page() {
    const pathname = usePathname();
    const [columns, setColumns] = useState<Column[]>(data);

    // Sadece aktif kolonları filtrele
    const activeColumns = useMemo(() => {
        console.log('çalıştı', columns.filter(col => col.ColumnStatus))
        return columns.filter(col => col.ColumnStatus);
    }, [columns]);

    const handleColumnChange = (change: any) => {
        console.log('Kolon değiştirildi');
    };

    const handleColumnsUpdate = (updatedColumns: Column[]) => {
        console.log('updatedColumns', updatedColumns)
        setColumns(updatedColumns);
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
                <div className="float-end me-n2" style={{ cursor: 'context-menu' }}>
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
            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <div className="float-end">
                            <button type='button' className="btn btn-outline-primary btn-sm rounded-2" data-bs-toggle="modal" data-bs-target="#CanbanColonAdd">
                                <i className="fas fa-plus"></i> Kolon Ekle
                            </button>
                        </div>
                        <div className="float-end">
                            <form className="row g-2">
                                <div className="col-auto">
                                    <input type="date" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 100 }} placeholder="Search.." />
                                </div>
                                <div className="col-auto">
                                    <input type="date" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 100 }} placeholder="Search.." />
                                </div>
                                <div className="col-auto">
                                    <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 100 }} placeholder="Search.." />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            {activeColumns && (

                <KanbanPage initialColumns={activeColumns} onColumnChange={handleColumnChange} renderItemContent={renderItemContent} />
            )}

            <KanbanColumnModal
                columns={columns}
                onColumnsUpdate={handleColumnsUpdate}
            />
        </div>
    )
}
