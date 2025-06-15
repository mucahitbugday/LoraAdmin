import TableCard from '@/components/TableCard';
import React, { useState } from 'react'
import type { CrmCard } from '@/models/Customer';

interface CrmCardsProps {
    data: CrmCard[];
    onChange: (newCrmCards: CrmCard[]) => void;
}

export default function CrmCards({ data, onChange }: CrmCardsProps) {
    const [crmKartlari, setCrmKartlari] = useState<CrmCard[]>(data);

    const handleDelete = (id: number) => {
        const updated = crmKartlari.filter((item: CrmCard) => item.id !== id);
        setCrmKartlari(updated);
        onChange(updated);
    }

    const handleChange = (id: number, field: string, value: string) => {
        const updated = crmKartlari.map((item: CrmCard) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setCrmKartlari(updated);
        onChange(updated);
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: '15%' }}>Date</th>
                        <th style={{ width: '15%' }}>Card</th>
                        <th style={{ width: '65%' }}>Description</th>
                        <th style={{ width: '5%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {crmKartlari.map((item: CrmCard, index: number) => (
                        <tr key={index} className="align-middle">
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
                                    <option value="">--Select--</option>
                                    <option value="1">CRM Card 1</option>
                                    <option value="2">CRM Card 2</option>
                                </select>
                            </td>
                            <td>
                                <textarea
                                    className="form-control"
                                    rows={1}
                                    value={item.description}
                                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                                ></textarea>
                            </td>
                            <td className="table-action">
                                <button
                                    className="btn btn-danger w-100"
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
