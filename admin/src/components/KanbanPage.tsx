'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Column, DraggableBoard } from './DraggableBoard';

export default function KanbanPage({ columns }: { columns: Column[] | null }) {





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
                <DraggableBoard
                    initialColumns={columns}
                    onColumnChange={handleColumnChange}
                    // onOpenItemModal={handleModal}
                    // onAddItemModal={() => handleModal()}
                    renderItemContent={renderItemContent}
                />
            )}
        </div>
    );
}
