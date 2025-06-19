'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';


export default function page() {
    const router = useRouter();
    const [forms, setForms] = useState<any[]>([]);

    useEffect(() => {
        setForms([
            {
                formID: 1,
                formTitle: 'Form Test',
                createDate: '01.01.2025',

            }
        ])


    }, [])




    return (
        <div>
            <div className="card flex-fill w-100 mt-2">
                <div className="card-header py-2">
                    <div className="align-items-end d-flex justify-content-between">
                        <h5 className="card-title mb-0">Teklifler</h5>
                        <div className="float-end">
                            <form className="row g-2">
                                <div className="col-auto">
                                    <select className="form-select form-select-sm bg-light border-0">
                                        <option>Jan</option>
                                        <option value="1">Feb</option>
                                        <option value="2">Mar</option>
                                        <option value="3">Apr</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 100 }} placeholder="Search.." />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-body py-2">

                    <table className="table table-striped table-hover" style={{ width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '20%' }}>Form Başlığı</th>
                                <th style={{ width: '15%' }}>Kayıt Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.map((frm) => (
                                <tr key={frm.formID} onDoubleClick={() => router.push(`/crm/form-editor/${frm.formID}`)} className="align-middle">
                                    <td>{frm.formID}</td>
                                    <td>{frm.formTitle}</td>
                                    <td>{frm.createDate}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}
