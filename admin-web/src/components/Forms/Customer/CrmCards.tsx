import React, { useState } from 'react';
import type { CrmCard } from '@/models/Customer';

interface CrmCardsProps {
    data: CrmCard[];
    onChange: (newCrmCards: CrmCard[]) => void;
}

export default function CrmCards({ data, onChange }: CrmCardsProps) {
    const [crmKartlari, setCrmKartlari] = useState<CrmCard[]>(data);

    const handleDelete = (id: number) => {
        const updated = crmKartlari.filter(item => item.id !== id);
        setCrmKartlari(updated);
        onChange(updated);
    };

    const handleChange = (id: number, field: string, value: string) => {
        const updated = crmKartlari.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setCrmKartlari(updated);
        onChange(updated);
    };

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
                <thead className="table-light">
                    <tr>
                        <th style={{ width: '15%' }}>Tarih</th>
                        <th style={{ width: '20%' }}>Kart</th>
                        <th style={{ width: '60%' }}>Açıklama</th>
                        <th style={{ width: '5%' }}>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {crmKartlari.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={item.date}
                                    onChange={(e) => handleChange(item.id, 'date', e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    className="form-select"
                                    value={item.cardId}
                                    onChange={(e) => handleChange(item.id, 'cardId', e.target.value)}
                                >
                                    <option value="">--Kart Seçin--</option>
                                    <option value="1">CRM Kartı 1</option>
                                    <option value="2">CRM Kartı 2</option>
                                </select>
                            </td>
                            <td>
                                <textarea
                                    className="form-control"
                                    rows={1}
                                    placeholder="Açıklama girin..."
                                    value={item.description}
                                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                                ></textarea>
                            </td>
                            <td className="text-center">
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
