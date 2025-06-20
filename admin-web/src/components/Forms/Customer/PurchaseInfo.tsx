import React, { useState } from 'react';
import TableCard from '@/components/TableCard';
import type { Purchase } from '@/models/Customer';

interface PurchaseInfoProps {
    data: Purchase[];
    onChange: (newPurchases: Purchase[]) => void;
}

export default function PurchaseInfo({ data, onChange }: PurchaseInfoProps) {
    const [purchases, setPurchases] = useState<Purchase[]>(data);

    // Filtre state'leri eklenebilir
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minAmount, setMinAmount] = useState('');

    // Opsiyonel filtreleme butonu için handler
    const handleSearch = () => {
        let filtered = [...data];

        if (startDate) {
            filtered = filtered.filter(p => p.date >= startDate);
        }

        if (endDate) {
            filtered = filtered.filter(p => p.date <= endDate);
        }

        if (minAmount) {
            const amountNum = parseFloat(minAmount);
            filtered = filtered.filter(p => p.amount >= amountNum);
        }

        setPurchases(filtered);
    };

    return (
        <div>
            <div className="row mb-2">
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Başlangıç</span>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text">Bitiş</span>
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group">
                        <span className="input-group-text">Tutar</span>
                        <input
                            type="number"
                            className="form-control"
                            value={minAmount}
                            onChange={(e) => setMinAmount(e.target.value)}
                        />
                        <span className="input-group-text">₺</span>
                    </div>
                </div>
                <div className="col-md-1">
                    <button className="btn btn-primary w-100" onClick={handleSearch}>Ara</button>
                </div>
            </div>

            <TableCard
                variant="condensed"
                data={{
                    headers: ['ID', 'Tarih', 'Tutar (₺)'],
                    rows: purchases.map((item) => [
                        item.id,
                        item.date,
                        item.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
                    ]),
                }}
            />
        </div>
    );
}
