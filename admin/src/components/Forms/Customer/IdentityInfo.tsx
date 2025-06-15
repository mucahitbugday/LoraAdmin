import React, { useState } from 'react'
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
                    <span className="input-group-text" style={{ width: '150px' }}>National ID</span>
                    <input type="text" className="form-control" maxLength={11} name="nationalId" value={formData.nationalId || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Serial Number</span>
                    <input type="text" className="form-control" maxLength={9} name="serialNumber" value={formData.serialNumber || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Gender</span>
                    <select className="form-select" name="gender" value={formData.gender || ''} onChange={handleChange}>
                        <option value="">--Select--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Birth Date</span>
                    <input type="date" className="form-control" name="birthDate" value={formData.birthDate || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Place of Birth</span>
                    <input type="text" className="form-control" name="placeOfBirth" value={formData.placeOfBirth || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Blood Type</span>
                    <select className="form-select" name="bloodType" value={formData.bloodType || ''} onChange={handleChange}>
                        <option value="">--Select--</option>
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
                    <span className="input-group-text" style={{ width: '150px' }}>Driver License Number</span>
                    <input type="text" className="form-control" name="driverLicenseNumber" value={formData.driverLicenseNumber || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Insurance Institution</span>
                    <input type="text" className="form-control" name="insuranceInstitution" value={formData.insuranceInstitution || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Insurance Number</span>
                    <input type="text" className="form-control" name="insuranceNumber" value={formData.insuranceNumber || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Marital Status</span>
                    <select className="form-select" name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange}>
                        <option value="">--Select--</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Marriage Date</span>
                    <input type="date" className="form-control" name="marriageDate" value={formData.marriageDate || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Father Name</span>
                    <input type="text" className="form-control" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Mother Name</span>
                    <input type="text" className="form-control" name="motherName" value={formData.motherName || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Occupation</span>
                    <input type="text" className="form-control" name="occupation" value={formData.occupation || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Monthly Income</span>
                    <input type="number" className="form-control" name="monthlyIncome" value={formData.monthlyIncome || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Credit Discount (%)</span>
                    <input type="number" className="form-control" name="creditDiscount" value={formData.creditDiscount || ''} onChange={handleChange} />
                </div>
            </div>
            <div className="col-6">
                <div className="input-group mb-2">
                    <span className="input-group-text" style={{ width: '150px' }}>Cash Discount (%)</span>
                    <input type="number" className="form-control" name="cashDiscount" value={formData.cashDiscount || ''} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}
