'use client'
import React, { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, useDraggable, useDroppable, } from '@dnd-kit/core';


interface FormComponent {
    type: string;
    label?: string;
    id?: number;
    icon?: string;
}

const COMPONENTS: FormComponent[] = [
    { type: "page", label: "Form Sayfası", icon: "bi bi-layout-text-window" },
    { type: "page-number", label: "Sayfa Numarası", icon: "bi bi-123" },
    { type: "line", label: "Satır Bölücü", icon: "bi bi-layout-three-columns" },
    { type: "column", label: "Kolon Bölücü", icon: "bi bi-columns-gap" },
    { type: "html-card", label: "Özel İçerik (HTML)", icon: "bi bi-card-text" },
    { type: "input-text", label: "Tek Satır Metin", icon: "bi bi-input-cursor-text" },
    { type: "input-mail", label: "E-Posta", icon: "bi bi-envelope" },
    { type: "input-phone", label: "Telefon Numarası", icon: "bi bi-telephone" },
    { type: "input-number", label: "Sayısal Giriş", icon: "bi bi-123" },
    { type: "input-date", label: "Tarih Seçici", icon: "bi bi-calendar" },
    { type: "input-clock", label: "Saat Seçici", icon: "bi bi-clock" },
    { type: "input-texts", label: "Çok Satırlı Metin", icon: "bi bi-card-text" },
    { type: "input-select", label: "Açılır Seçim Kutusu", icon: "bi bi-caret-down-square" },
    { type: "input-redio", label: "Tekli Seçim (Radio)", icon: "bi bi-ui-radios" },
    { type: "input-check", label: "Çoklu Seçim (Checkbox)", icon: "bi bi-ui-checks" },
];

function ComponentPalette({ onDragStart, }: { onDragStart: (e: React.DragEvent<HTMLDivElement>, comp: FormComponent) => void; }) {
    return (
        <div style={{ width: 220, borderRight: "1px solid #eee", padding: 12 }}>
            <h5 className="mb-3">Bileşenler</h5>
            {COMPONENTS.map((comp) => (
                <div
                    key={comp.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, comp)}
                    style={{
                        border: "1px solid #dee2e6",
                        borderRadius: 6,
                        padding: "8px 10px",
                        marginBottom: 10,
                        backgroundColor: "#f8f9fa",
                        cursor: "grab",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {comp.icon && <i className={comp.icon}></i>}
                    <span style={{ fontSize: 14 }}>{comp.label}</span>
                </div>
            ))}
        </div>
    );
}



export default function Page() {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, comp: FormComponent) => {
        e.dataTransfer.setData("component", JSON.stringify(comp));
    };



    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ComponentPalette onDragStart={handleDragStart} />

        </div>
    );
}
