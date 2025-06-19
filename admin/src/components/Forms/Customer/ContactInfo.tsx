import React from 'react';
import TableCard from '@/components/TableCard';

interface ContactInfoProps {
    customer: any;
}

export default function ContactInfo({ customer }: ContactInfoProps) {
    const izinler = [
        {
            storeName: 'IYS',
            permissions: [
                { baslik: 'SMS', durum: 'Yok', kanal: 'GPOS', tarih: '19.07.2024' },
                { baslik: 'E-posta', durum: 'Yok', kanal: 'IEticaret', tarih: '24.07.2024' },
                { baslik: 'Telefon', durum: 'Yok', kanal: 'GPOS', tarih: '19.07.2024' },
            ],
        },
        {
            storeName: 'Marka',
            permissions: [
                { baslik: 'SMS', durum: 'Yok', kanal: 'GPOS', tarih: '19.07.2024' },
                { baslik: 'E-posta', durum: 'Yok', kanal: 'IEticaret', tarih: '24.07.2024' },
                { baslik: 'Telefon', durum: 'Yok', kanal: 'GPOS', tarih: '19.07.2024' },
            ],
        },
    ];

    const acikRiza = {
        durum: 'Yok',
        kanal: 'Web',
        tarih: '20.06.2024',
        ip: '213.74.49.18',
        aydinlatma: 'Yok',
    };

    return (
        <div className="d-flex flex-column gap-3">
            {izinler.map((store, index) => (
                <div key={index}>
                    <h6 className="mb-2">{store.storeName} İzinleri</h6>
                    <TableCard
                        variant="bordered"
                        data={{
                            headers: ['İzin Türü', 'Durum', 'Kanal', 'İzin Tarihi'],
                            rows: store.permissions.map((p) => [
                                p.baslik,
                                p.durum,
                                p.kanal,
                                p.tarih,
                            ]),
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
