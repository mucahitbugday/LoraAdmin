import React, { useState } from 'react';
import type { IdentityInfo } from '@/models/Customer';

interface IdentityInfoProps {
    data: IdentityInfo;
    onChange: (newIdentityInfo: IdentityInfo) => void;
}

export default function IdentityInfo({ data, onChange }: IdentityInfoProps) {
    const [formData, setFormData] = useState<IdentityInfo>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        onChange(updated);
    };

    return (
        <div className="row">
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>T.C. Kimlik No</span>
                    <input type="text" className="form-control" maxLength={11} name="nationalId" value={formData.nationalId || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Seri No</span>
                    <input type="text" className="form-control" maxLength={9} name="serialNumber" value={formData.serialNumber || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Cinsiyet</span>
                    <select className="form-select" name="gender" value={formData.gender || ''} onChange={handleChange}>
                        <option value="">--Seçiniz--</option>
                        <option value="male">Erkek</option>
                        <option value="female">Kadın</option>
                    </select>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Doğum Tarihi</span>
                    <input type="date" className="form-control" name="birthDate" value={formData.birthDate || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Doğum Yeri</span>
                    <input type="text" className="form-control" name="placeOfBirth" value={formData.placeOfBirth || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Kan Grubu</span>
                    <select className="form-select" name="bloodType" value={formData.bloodType || ''} onChange={handleChange}>
                        <option value="">--Seçiniz--</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="0+">0+</option>
                        <option value="0-">0-</option>
                    </select>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Ehliyet No</span>
                    <input type="text" className="form-control" name="driverLicenseNumber" value={formData.driverLicenseNumber || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Sigorta Kurumu</span>
                    <input type="text" className="form-control" name="insuranceInstitution" value={formData.insuranceInstitution || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Sigorta No</span>
                    <input type="text" className="form-control" name="insuranceNumber" value={formData.insuranceNumber || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Medeni Hali</span>
                    <select className="form-select" name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange}>
                        <option value="">--Seçiniz--</option>
                        <option value="Single">Bekar</option>
                        <option value="Married">Evli</option>
                        <option value="Divorced">Boşanmış</option>
                        <option value="Widowed">Dul</option>
                    </select>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Evlilik Tarihi</span>
                    <input type="date" className="form-control" name="marriageDate" value={formData.marriageDate || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Baba Adı</span>
                    <input type="text" className="form-control" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Anne Adı</span>
                    <input type="text" className="form-control" name="motherName" value={formData.motherName || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Meslek</span>
                    <input type="text" className="form-control" name="occupation" value={formData.occupation || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Aylık Gelir (₺)</span>
                    <input type="number" className="form-control" name="monthlyIncome" value={formData.monthlyIncome || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Kredi İndirimi (%)</span>
                    <input type="number" className="form-control" name="creditDiscount" value={formData.creditDiscount || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '180px' }}>Nakit İndirimi (%)</span>
                    <input type="number" className="form-control" name="cashDiscount" value={formData.cashDiscount || ''} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}
