import React, { useState } from 'react'
import type { AddressInfo } from '@/models/Customer';

interface AddressInfoProps {
    data: AddressInfo;
    onChange: (newAddressInfo: AddressInfo) => void;
}

export default function AddressInfo({ data, onChange }: AddressInfoProps) {
    const [formData, setFormData] = useState<AddressInfo>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        onChange(updated);
    };

    return (
        <div className="row">
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Official Title</span>
                    <input type="text" className="form-control" name="officialTitle" value={formData.officialTitle || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Country</span>
                    <input type="text" className="form-control" name="country" value={formData.country || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>City</span>
                    <input type="text" className="form-control" name="city" value={formData.city || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>District</span>
                    <input type="text" className="form-control" name="district" value={formData.district || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>İlçe Adı</span>
                    <input type="text" className="form-control" />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Postal Code</span>
                    <input type="text" className="form-control" name="postalCode" maxLength={5} value={formData.postalCode || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-12">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Address</span>
                    <textarea className="form-control" name="address" rows={2} value={formData.address || ''} onChange={handleChange}></textarea>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Tax Office</span>
                    <input type="text" className="form-control" name="taxOffice" value={formData.taxOffice || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Tax Number</span>
                    <input type="text" className="form-control" name="taxNumber" maxLength={10} value={formData.taxNumber || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Phone 1</span>
                    <input type="tel" className="form-control" name="phone1" value={formData.phone1 || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Phone 2</span>
                    <input type="tel" className="form-control" name="phone2" value={formData.phone2 || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Mobile Phone</span>
                    <input type="tel" className="form-control" name="mobilePhone" value={formData.mobilePhone || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>E-posta</span>
                    <input type="email" className="form-control" name="email" value={formData.email || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Website</span>
                    <input type="url" className="form-control" name="website" value={formData.website || ''} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}
