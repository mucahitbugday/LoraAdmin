'use client'
import React from 'react'
import LineChart from '../Chart/LineChart'

export default function CrmDashboard() {

    const monthlyData = {
        labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        data: [2000, 1500, 1600, 1800, 1600, 1800, 2500, 2300, 2500, 3500, 3000, 3300]
    };

    return (
        <div className="container-fluid p-0">
            <div className="row g-3">
                <div className="col-sm-6 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h5 className="card-title">Gelir 0</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-dollar-sign align-middle">
                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-3">$47.482</h1>
                            <div className="mb-0">
                                <span className="badge badge-success-light">3.65%</span>
                                <span className="text-muted">Geçen haftadan itibaren</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h5 className="card-title">Siparişler</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-shopping-bag align-middle">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                            <line x1="3" y1="6" x2="21" y2="6"></line>
                                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-3">2.542</h1>
                            <div className="mb-0">
                                <span className="badge badge-danger-light">-5.25%</span>
                                <span className="text-muted">Geçen haftadan itibaren</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h5 className="card-title">Aktivite</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-activity align-middle">
                                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-3">16.300</h1>
                            <div className="mb-0">
                                <span className="badge badge-success-light">4.65%</span>
                                <span className="text-muted">Geçen haftadan itibaren</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h5 className="card-title">Hasılat</h5>
                                </div>

                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="feather feather-shopping-cart align-middle">
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="mt-1 mb-3">$20.120</h1>
                            <div className="mb-0">
                                <span className="badge badge-success-light">2.35%</span>
                                <span className="text-muted">Geçen haftadan itibaren</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card g-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <button className="btn btn-outline-primary me-2">Primary</button>
                            <button className="btn btn-outline-secondary me-2">Secondary</button>
                            <button className="btn btn-outline-success me-2">Success</button>
                            <button className="btn btn-outline-danger me-2">Danger</button>
                            <button className="btn btn-outline-warning me-2">Warning</button>
                            <button className="btn btn-outline-info me-2">Info</button>
                        </div>
                        <div className="d-flex">
                            <button className="btn btn-outline-primary me-2">Kısayolları Düzenle</button>

                        </div>
                    </div>

                </div>
            </div>

            <div className="row g-3">
                <div className="col-12 col-lg-8 d-flex">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <div className="float-end">
                                <form className="row g-2">
                                    <div className="col-auto">
                                        <select className="form-select form-select-sm bg-light border-0">
                                            <option>Oca</option>
                                            <option value="1">Şub</option>
                                            <option value="2">Mar</option>
                                            <option value="3">Nis</option>
                                        </select>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 100 }} placeholder="Ara.." />
                                    </div>
                                </form>
                            </div>
                            <h5 className="card-title mb-0">Toplam Hasılat</h5>
                        </div>
                        <div className="card-body pt-2 pb-3">
                            <div className="chart chart-md">
                                <LineChart
                                    data={monthlyData.data}
                                    labels={monthlyData.labels}
                                    label="Aylık Hasılat"
                                    borderColor="rgb(66, 139, 255)"
                                    backgroundColor="rgba(66, 139, 255, 0.1)"
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4 d-flex">
                    <div className="card flex-fill w-100">
                        <div className="card-header">
                            <div className="float-end">
                                <form className="row g-2">
                                    <div className="col-auto">
                                        <select className="form-select form-select-sm bg-light border-0">
                                            <option>Oca</option>
                                            <option value="1">Şub</option>
                                            <option value="2">Mar</option>
                                            <option value="3">Nis</option>

                                        </select>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control form-control-sm bg-light rounded-2 border-0" style={{ width: 100 }} placeholder="Ara.." />
                                    </div>
                                </form>
                            </div>
                            <h5 className="card-title mb-0">İl Bazında Satışlar</h5>
                        </div>
                        <div className="card-body px-4">
                            {/* Buraya satış verisi veya grafik ekleyebilirsin */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card g-3">
                <div className="card-header">
                    <div className="card-actions float-end">
                        <div className="dropdown position-relative">
                            <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="feather feather-more-horizontal align-middle">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                            </a>

                            <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#">İşlem</a>
                                <a className="dropdown-item" href="#">Başka işlem</a>
                                <a className="dropdown-item" href="#">Diğer seçenek</a>
                            </div>
                        </div>
                    </div>
                    <h5 className="card-title mb-0">En Çok Satan Ürünler</h5>
                </div>
                <table className="table table-borderless my-0">
                    <thead>
                        <tr>
                            <th>İsim</th>
                            <th className="d-none d-xxl-table-cell">Şirket</th>
                            <th className="d-none d-xl-table-cell">Atanan</th>
                            <th className="d-none d-xl-table-cell text-end">Siparişler</th>
                            <th>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <div className="bg-light rounded-2">
                                            <img className="p-2" src="https://demo.adminkit.io/img/icons/brand-4.svg" alt="Aurora" />
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <strong>Aurora</strong>
                                        <div className="text-muted">
                                            UI Kit
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="d-none d-xxl-table-cell">
                                <strong>Lechters</strong>
                                <div className="text-muted">
                                    Emlak
                                </div>
                            </td>
                            <td className="d-none d-xl-table-cell">
                                <strong>Vanessa Tucker</strong>
                                <div className="text-muted">
                                    HTML, JS, React
                                </div>
                            </td>
                            <td className="d-none d-xl-table-cell text-end">
                                520
                            </td>
                            <td>
                                <span className="badge badge-success-light">Devam Ediyor</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
