import React, { useState, useRef } from 'react'

interface Task {
    TaskID: string;
    TaskName: string;
    TaskDescription: string;
    TaskStatus: string;
}

interface Column {
    ColumnID: string;
    ColumnName: string;
    ColumnDescription: string;
    ColumnStatus: boolean;
    Tasks: Task[];
}

interface ColumnChange {
    sourceColumn: Column;
    targetColumn: Column;
}

interface DraggableBoardProps {
    initialColumns: Column[];
    onColumnChange?: (change: ColumnChange) => void;
    onOpenItemModal?: (task: Task) => void;
    onAddItemModal?: () => void;
    renderItemContent?: (task: Task) => React.ReactNode;
}

export const KanbanPage: React.FC<DraggableBoardProps> = ({ initialColumns, onColumnChange, onOpenItemModal, onAddItemModal, renderItemContent }) => {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const dragItem = useRef<any>(null);
    const dragNode = useRef<any>(null);
    const [dragging, setDragging] = useState(false);
    const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
    console.log('dd-columns',columns)

    const handleDragStart = (e: React.DragEvent, taskId: string, sourceColumn: string) => {
        e.dataTransfer.setData('taskId', taskId);
        e.dataTransfer.setData('sourceColumn', sourceColumn);
        dragItem.current = taskId;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setDragging(true);
    };

    const handleDragEnd = () => {
        setDragging(false);
        setDragOverColumn(null);
        dragNode.current?.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    };

    const handleDragOver = (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        if (dragOverColumn !== columnId) {
            setDragOverColumn(columnId);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOverColumn(null);
    };

    const handleDrop = (e: React.DragEvent, targetColumn: string) => {
        e.preventDefault();
        setDragOverColumn(null);

        const taskId = e.dataTransfer.getData('taskId');
        const sourceColumn = e.dataTransfer.getData('sourceColumn');

        if (sourceColumn === targetColumn) return;

        const newColumns = columns.map(col => {
            if (col.ColumnID === sourceColumn) {
                return {
                    ...col,
                    Tasks: col.Tasks.filter(t => t.TaskID !== taskId)
                };
            }
            if (col.ColumnID === targetColumn) {
                const task = columns.find(c => c.ColumnID === sourceColumn)?.Tasks.find(t => t.TaskID === taskId);
                if (task) {
                    return {
                        ...col,
                        Tasks: [...col.Tasks, task]
                    };
                }
            }
            return col;
        });

        const changedColumns = {
            sourceColumn: newColumns.find(col => col.ColumnID === sourceColumn)!,
            targetColumn: newColumns.find(col => col.ColumnID === targetColumn)!
        };

        setColumns(newColumns);
        onColumnChange?.(changedColumns);
    };

    return (
        <div className="d-flex overflow-auto">
            {columns.map(column => (
                <div key={column.ColumnID} className="flex-shrink-0 me-3" style={{ width: "300px" }}>
                    <div className="card h-100">
                        <div className="card-header py-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#3e536b', borderBottom: '1px solid #edf2f7' }}>
                            <h5 className="card-title mb-0" style={{ fontSize: '0.95rem', color: '#fff', fontWeight: '600' }}>
                                {column.ColumnName}
                            </h5>
                            <button className="btn btn-light btn-sm rounded-circle" style={{ width: '24px', height: '24px', padding: 0 }} onClick={onAddItemModal} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#edf2f7'; e.currentTarget.style.color = '#2d3748'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#718096'; }}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between p-2">
                            <div id={`tasks-${column.ColumnID}`} className={`rounded p-2 flex-grow-1 ${dragOverColumn === column.ColumnID ? 'bg-primary bg-opacity-10' : ''}`} style={{ minHeight: '200px', transition: 'all 0.2s ease', overflowY: 'auto', backgroundColor: '#ffffff' }} onDragOver={(e) => handleDragOver(e, column.ColumnID)} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, column.ColumnID)} >
                                {column.Tasks.map(task => (
                                    <div key={task.TaskID} className={`card mb-3 ${dragging && dragItem.current === task.TaskID ? 'opacity-50' : ''}`} draggable onDragStart={(e) => handleDragStart(e, task.TaskID, column.ColumnID)} style={{ cursor: 'all-scroll', transform: dragging && dragItem.current === task.TaskID ? 'scale(1.02)' : 'scale(1)', transition: 'all 0.2s ease', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', backgroundColor: '#ffffff' }} onClick={() => onOpenItemModal?.(task)}>
                                        <div className="card-body p-3">
                                            {renderItemContent ? (
                                                renderItemContent(task)
                                            ) : (<></>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export type { Task, Column, ColumnChange }; 