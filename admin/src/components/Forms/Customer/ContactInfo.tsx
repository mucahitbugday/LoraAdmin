import React from 'react';
import TableCard from '@/components/TableCard';

interface ContactInfoProps {
    customer: any;
}

export default function ContactInfo({ customer }: ContactInfoProps) {
    
    const izinler = [
        {
            baslik: 'SMS',
            durum: 'Yok',
            kanal: 'GPOS',
            tarih: '19.07.2024',
            ip: '213.74.49.18'
        },
        {
            baslik: 'E-posta',
            durum: 'Yok',
            kanal: 'IEticaret',
            tarih: '24.07.2024',
            ip: '1.1.1.1'
        },
        {
            baslik: 'Telefon',
            durum: 'Yok',
            kanal: 'GPOS',
            tarih: '19.07.2024',
            ip: '213.74.49.18'
        },
        {
            baslik: 'E-posta Anket Mesajları',
            durum: 'Yok',
            kanal: 'IsteERP',
            tarih: '07.03.2024',
            ip: '1.1.1.1'
        }
    ];

    const acikRiza = {
        durum: 'Yok',
        kanal: 'Kanal',
        tarih: '',
        ip: '',
        aydinlatma: 'Yok'
    };

    return (
        <div>
            <TableCard variant="bordered" data={
                {
                    headers: ['İzin Türü', 'Durum', 'Kanal', 'İzin Tarihi', 'IP Adresi'],
                    rows: izinler.map(item => [item.baslik, item.durum, item.kanal, item.tarih, item.ip])
                }} />
        </div>
    );
}
