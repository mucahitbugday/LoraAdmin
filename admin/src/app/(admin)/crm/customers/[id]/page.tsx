'use client'

import React, { useEffect, useState } from 'react'
import DropzoneComponent from '@/components/DropZone'
import TabCard from '@/components/TabCard'
import ContactInfo from '@/components/Forms/Customer/ContactInfo'
import IdentityInfo from '@/components/Forms/Customer/IdentityInfo'
import AddressInfo from '@/components/Forms/Customer/AddressInfo'
import CrmCards from '@/components/Forms/Customer/CrmCards'
import PurchaseInfo from '@/components/Forms/Customer/PurchaseInfo'
import { customers } from '@/data'
import type { Customer } from '@/models/Customer'
import Flatpickr from 'react-flatpickr'

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    const { id } = resolvedParams;

    const [customerData, setCustomerData] = useState<Customer | null>(null);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        if (id == 'new') {
            setCustomerData({
                id: 0,
                name: '',
                surname: '',
                image: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                memberCode: '',
                memberId: '',
                birthDate: '',
                gender: '',
                store: '',
                representative: '',
                status: '',
                category: '',
                identityInfo: {
                    nationalId: '',
                    serialNumber: '',
                    placeOfBirth: '',
                    bloodType: '',
                    driverLicenseNumber: '',
                    insuranceInstitution: '',
                    insuranceNumber: '',
                    maritalStatus: '',
                    marriageDate: '',
                    fatherName: '',
                    motherName: '',
                    occupation: '',
                    monthlyIncome: 0,
                    creditDiscount: 0,
                    cashDiscount: 0,
                    gender: '',
                    birthDate: ''
                },
                addressInfo: {
                    officialTitle: '',
                    country: '',
                    city: '',
                    district: '',
                    postalCode: '',
                    address: '',
                    taxOffice: '',
                    taxNumber: '',
                    phone1: '',
                    phone2: '',
                    mobilePhone: '',
                    email: '',
                    website: ''
                },
                crmCards: [],
                purchases: []
            })
            return
        }


        const foundCustomer = customers.find(c => c.id === parseInt(id));
        if (foundCustomer) {
            setCustomerData(foundCustomer);
            setImage(foundCustomer.image || null);
        }
    }, [id]);

    const handleMainInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomerData(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleImageChange = (newImage: string) => {
        setImage(newImage);
        setCustomerData(prev => prev ? { ...prev, image: newImage } : prev);
    };

    const updateIdentityInfo = (newIdentityInfo: Customer['identityInfo']) => {
        setCustomerData(prev => prev ? { ...prev, identityInfo: newIdentityInfo } : prev);
    };

    const updateAddressInfo = (newAddressInfo: Customer['addressInfo']) => {
        setCustomerData(prev => prev ? { ...prev, addressInfo: newAddressInfo } : prev);
    };

    const updateCrmCards = (newCrmCards: Customer['crmCards']) => {
        setCustomerData(prev => prev ? { ...prev, crmCards: newCrmCards } : prev);
    };

    const updatePurchases = (newPurchases: Customer['purchases']) => {
        setCustomerData(prev => prev ? { ...prev, purchases: newPurchases } : prev);
    };

    const saveCustomer = () => {
        if (customerData) {
            console.log('Customer saved:', customerData);
        }
    };

    const tabs = [
        {
            id: 'iletisim-bilgileri',
            title: 'İletişim Bilgileri',
            content: customerData ? <ContactInfo customer={customerData} /> : null
        },
        {
            id: 'kimlik-bilgileri',
            title: 'Kimlik Bilgileri',
            content: customerData ? <IdentityInfo data={customerData.identityInfo} onChange={updateIdentityInfo} /> : null
        },
        {
            id: 'adres-bilgileri',
            title: 'Adres Bilgileri',
            content: customerData ? <AddressInfo data={customerData.addressInfo} onChange={updateAddressInfo} /> : null
        },
        {
            id: 'crm-kartlari',
            title: 'CRM Kartları',
            content: customerData ? <CrmCards data={customerData.crmCards} onChange={updateCrmCards} /> : null
        },
        {
            id: 'alisveris-bilgileri',
            title: 'Alışveriş Bilgileri',
            content: customerData ? <PurchaseInfo data={customerData.purchases} onChange={updatePurchases} /> : null
        }
    ]

    if (!customerData) {
        return <div>Müşteri bulunamadı</div>;
    }

    return (
        <div className='container-fluid'>
            <div className="card">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-4">
                            <DropzoneComponent
                                initialImage={image}
                                onImageChange={handleImageChange}
                            />
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Adı</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={customerData.name || ''}
                                            onChange={handleMainInputChange}
                                        />
                                        <span className="input-group-text" style={{ width: '100px' }}>Soyadı</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="surname"
                                            value={customerData.surname || ''}
                                            onChange={handleMainInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>M. Kodu</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="memberCode"
                                            value={customerData.memberCode || ''}
                                            onChange={handleMainInputChange}
                                        />
                                        <span className="input-group-text" style={{ width: '100px' }}>M. ID</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="memberId"
                                            value={customerData.memberId || ''}
                                            onChange={handleMainInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Email</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={customerData.email || ''}
                                            onChange={handleMainInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Telefon</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={customerData.phone || ''}
                                            onChange={handleMainInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>D. Tarihi</span>
                                        <Flatpickr
                                            className="form-control"
                                            options={{ dateFormat: 'Y-m-d' }}
                                            value={customerData.birthDate || ''}
                                            onChange={([date]) => handleMainInputChange({ target: { name: 'birthDate', value: date ? date.toISOString().slice(0, 10) : '' } } as any)}
                                        />
                                        {/* <DatePicker
                                            value={customerData.birthDate || ''}
                                            onChange={([date]) => handleMainInputChange({ target: { name: 'birthDate', value: date ? date : '' } } as any)}
                                        /> */}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Cinsiyet</span>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={customerData.gender || ''}
                                            onChange={handleMainInputChange}
                                        >
                                            <option value="">--Seçiniz--</option>
                                            <option value="male">Erkek</option>
                                            <option value="female">Kadın</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Mağaza</span>
                                        <select
                                            className="form-select"
                                            name="store"
                                            value={customerData.store || ''}
                                            onChange={handleMainInputChange}
                                        >
                                            <option value="">--Seçiniz--</option>
                                            <option value="1">Mağaza 1</option>
                                            <option value="2">Mağaza 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Temsilci</span>
                                        <select
                                            className="form-select"
                                            name="representative"
                                            value={customerData.representative || ''}
                                            onChange={handleMainInputChange}
                                        >
                                            <option value="">--Seçiniz--</option>
                                            <option value="1">Temsilci 1</option>
                                            <option value="2">Temsilci 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Statü</span>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={customerData.status ? 'true' : 'false'}
                                            onChange={handleMainInputChange}
                                        >
                                            <option value="">--Seçiniz--</option>
                                            <option value="true">Aktif</option>
                                            <option value="false">Pasif</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-group mb-2">
                                        <span className="input-group-text" style={{ width: '100px' }}>Kategori</span>
                                        <select
                                            className="form-select"
                                            name="category"
                                            value={customerData.category || ''}
                                            onChange={handleMainInputChange}
                                        >
                                            <option value="">--Seçiniz--</option>
                                            <option value="1">Kategori 1</option>
                                            <option value="2">Kategori 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TabCard type="default" variant="horizontal" tabs={tabs} />

            <button className='btn btn-primary mt-3' onClick={saveCustomer}>Kaydet</button>
        </div>
    )
}
