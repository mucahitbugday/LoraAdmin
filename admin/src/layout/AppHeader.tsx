'use client'

import React, { useEffect, useState } from 'react'
import feather from 'feather-icons';
import { useSidebar } from '@/context/SidebarContext';

export default function AppHeader() {
    const { toggleSidebar } = useSidebar();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    useEffect(() => {
        feather.replace();
    }, []);
    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle js-sidebar-toggle" onClick={toggleSidebar}>
                <i className="hamburger align-self-center"></i>
            </a>

            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown" aria-expanded="true" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                            <div className="position-relative">
                                <i className="align-middle text-light" data-feather="bell"></i>
                                <span className="indicator">4</span>
                            </div>
                        </a>
                        <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 ${isNotificationOpen ? 'show' : ''}`} data-bs-popper="static" aria-labelledby="alertsDropdown">
                            <div className="dropdown-menu-header">4 New Notifications</div>
                            <div className="list-group">
                                <a href="#" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <i className="text-danger" data-feather="alert-circle"></i>
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Update completed</div>
                                            <div className="text-muted small mt-1">Restart server 12 to complete the
                                                update.</div>
                                            <div className="text-muted small mt-1">30m ago</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all notifications</a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown" onClick={() => setIsMessageOpen(!isMessageOpen)}>
                            <div className="position-relative">
                                <i className="align-middle text-light" data-feather="message-square"></i>
                            </div>
                        </a>
                        <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-end py-0 ${isMessageOpen ? 'show' : ''}`} data-bs-popper="static" aria-labelledby="messagesDropdown">
                            <div className="dropdown-menu-header">
                                <div className="position-relative">4 New Messages</div>
                            </div>
                            <div className="list-group">
                                <a href="#" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <img src="https://demo.adminkit.io/img/avatars/avatar-5.jpg" className="avatar img-fluid rounded-circle" alt="Vanessa Tucker" />
                                        </div>
                                        <div className="col-10 ps-2">
                                            <div className="text-dark">Vanessa Tucker</div>
                                            <div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu
                                                tortor.</div>
                                            <div className="text-muted small mt-1">15m ago</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all messages</a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown" onClick={() => setIsUserOpen(!isUserOpen)}>
                            <i className="align-middle" data-feather="settings"></i>
                        </a>

                        <a className="nav-link dropdown-toggle d-none d-sm-inline-block text-light" href="#" data-bs-toggle="dropdown" onClick={() => setIsUserOpen(!isUserOpen)}>
                            <img src="https://picsum.photos/200/300" className="avatar img-fluid rounded me-1" /> <span className="text-light">Admin</span>
                        </a>
                        <div className={`dropdown-menu dropdown-menu-end ${isUserOpen ? 'show' : ''}`} data-bs-popper="static">
                            <a className="dropdown-item" href="pages-profile.html"><i className="align-middle me-1"
                                data-feather="user"></i> Profile</a>
                            <a className="dropdown-item" href="#"><i className="align-middle me-1"
                                data-feather="pie-chart"></i> Analytics</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="index.html"><i className="align-middle me-1"
                                data-feather="settings"></i> Settings & Privacy</a>
                            <a className="dropdown-item" href="#"><i className="align-middle me-1"
                                data-feather="help-circle"></i> Help Center</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Log out</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
