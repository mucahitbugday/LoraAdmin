'use client'

import { Column } from '@/components/DraggableBoard';
import React, { useState, useEffect } from 'react';

interface KanbanColumnModalProps {
    columns: Column[];
    onColumnsUpdate: (columns: Column[]) => void;
}

const KanbanColumnModal: React.FC<KanbanColumnModalProps> = ({ columns, onColumnsUpdate }) => {
    const [tempColumns, setTempColumns] = useState<Column[]>(columns);

    // Modal her açıldığında mevcut kolonları güncelle
    useEffect(() => {
        setTempColumns(columns);
    }, [columns]);

    const handleAddColumn = () => {
        const newCol: Column = {
            ColumnID: `col-${tempColumns.length + 1}`,
            ColumnName: '',
            ColumnDescription: '',
            ColumnStatus: true,
            Tasks: []
        };
        setTempColumns([...tempColumns, newCol]);
    };

    const handleDeleteColumn = (columnId: string) => {
        setTempColumns(tempColumns.filter(col => col.ColumnID !== columnId));
    };

    const handleColumnUpdate = (columnId: string, field: string, value: any) => {
        setTempColumns(tempColumns.map(col =>
            col.ColumnID === columnId
                ? { ...col, [field]: value }
                : col
        ));
    };

    const handleSave = () => {
        onColumnsUpdate(tempColumns);
        // Modal'ı kapat
        const closeButton = document.querySelector('#CanbanColonAdd .btn-close') as HTMLButtonElement;
        if (closeButton) {
            closeButton.click();
        }
    };

    return (
        <div className="modal fade" id="CanbanColonAdd" tabIndex={-1} style={{ display: 'none' }} aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Kanban Kolon Yönetimi</h5>
                        <div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="table-responsive">
                            <div className="d-flex justify-content-end mb-3">
                                <button type="button" className="btn btn-primary btn-sm" onClick={handleAddColumn}>
                                    <i className="fas fa-plus"></i> Yeni Kolon
                                </button>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Kolon Adı</th>
                                        <th>Açıklama</th>
                                        <th>Durum</th>
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tempColumns.map((column) => (
                                        <tr key={column.ColumnID}>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={column.ColumnName}
                                                    onChange={(e) => handleColumnUpdate(column.ColumnID, 'ColumnName', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={column.ColumnDescription}
                                                    onChange={(e) => handleColumnUpdate(column.ColumnID, 'ColumnDescription', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={column.ColumnStatus}
                                                        onChange={(e) => handleColumnUpdate(column.ColumnID, 'ColumnStatus', e.target.checked)}
                                                    />
                                                    <label className="form-check-label">
                                                        {column.ColumnStatus ? 'Aktif' : 'Pasif'}
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDeleteColumn(column.ColumnID)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KanbanColumnModal; 