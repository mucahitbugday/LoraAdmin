import TableCard from '@/components/TableCard'
import React, { useState } from 'react'
import type { Purchase } from '@/models/Customer'

interface PurchaseInfoProps {
    data: Purchase[];
    onChange: (newPurchases: Purchase[]) => void;
}

export default function PurchaseInfo({ data, onChange }: PurchaseInfoProps) {
    const [purchases, setPurchases] = useState<Purchase[]>(data);

    // You can add handlers for filtering/searching if needed

    return (
        <div>
            <div className="row mb-2">
                <div className="col-4">
                    <div className="input-group mb-2">
                        <span className="input-group-text">Başlangıç Tarihi</span>
                        <input type="date" className="form-control" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group mb-2">
                        <span className="input-group-text">Bitiş Tarihi</span>
                        <input type="date" className="form-control" />
                    </div>
                </div>
                <div className="col-3">
                    <div className="input-group mb-2">
                        <div className="input-group mb-2">
                            <span className="input-group-text">Tutar</span>
                            <input type="number" className="form-control" />
                            <span className="input-group-text">TL</span>
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <button className="btn btn-primary w-100">Ara</button>
                </div>
            </div>

            <TableCard variant="condensed" data={
                {
                    headers: ['ID', 'Date', 'Amount'],
                    rows: purchases.map((item: Purchase) => [item.id, item.date, item.amount])
                }} />
        </div>
    )
}
