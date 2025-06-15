'use client'

import React, { useEffect } from 'react'
import feather from 'feather-icons';
import { useSidebar } from '@/context/SidebarContext';
import { usePathname } from 'next/navigation';

export default function AppSidebar() {
    const { isExpanded } = useSidebar();
    const pathname = usePathname();

    useEffect(() => {
        feather.replace();
    }, [pathname, isExpanded]);

    const sidebarItems = [
        {
            module: 'CRM',
            setupMenu: [
                {
                    label: 'Dashboard',
                    icon: 'sliders',
                    path: '/'
                },
                {
                    label: 'Müşteriler',
                    icon: 'users',
                    setupSubMenu: [
                        { label: 'Müşteri Listesi', path: '/crm/customers' },
                        { label: 'Yeni Müşteri', path: '/crm/customers/new' }
                    ]
                },
                {
                    label: 'Satışlar',
                    icon: 'shopping-bag',
                    setupSubMenu: [
                        { label: 'Fırsatlar', path: '/crm/sales/opportunities' },
                        { label: 'Teklifler', path: '/crm/sales/quotes' },
                        { label: 'Siparişler', path: '/crm/sales/orders' }
                    ]
                },
                {
                    label: 'Aktiviteler',
                    icon: 'calendar',
                    setupSubMenu: [
                        { label: 'Aramalar', path: '/crm/activities/calls' },
                        { label: 'Toplantılar', path: '/crm/activities/meetings' },
                        { label: 'E-posta Kayıtları', path: '/crm/activities/emails' }
                    ]
                },
                {
                    label: 'Görevler',
                    icon: 'check-square',
                    path: '/crm/tasks'
                },
                {
                    label: 'Raporlar',
                    icon: 'bar-chart-2',
                    setupSubMenu: [
                        { label: 'Satış Raporları', path: '/crm/reports/sales' },
                        { label: 'Müşteri Raporları', path: '/crm/reports/customers' }
                    ]
                },
                {
                    label: 'Destek Talepleri',
                    icon: 'help-circle',
                    path: '/crm/support-tickets'
                }
            ]
        }
    ];

    const subMenu = pathname.split('/')[1] || '/'

    const renderSidebarItems = (
        <>
            {sidebarItems.map((item) => (
                <React.Fragment key={item.module}>
                    {sidebarItems.length > 1 && (
                        <li className="sidebar-header">{item.module}</li>
                    )}

                    {item.setupMenu.map((menuItem, index) => {
                        const hasSubMenu = !!menuItem.setupSubMenu;
                        const collapseId = `collapse-${item.module}-${index}`;
                        const isActive = subMenu === menuItem.path;

                        if (hasSubMenu) {
                            const isSubActive = menuItem.setupSubMenu.some(
                                (subItem) => subItem.path === pathname
                            );

                            return (
                                <li className={`sidebar-item ${isSubActive ? 'active' : ''}`} key={menuItem.label}>
                                    <a
                                        href={`#${collapseId}`}
                                        data-bs-toggle="collapse"
                                        className={`sidebar-link ${isSubActive ? '' : 'collapsed'}`}
                                        aria-expanded={isSubActive ? 'true' : 'false'}
                                    >
                                        <i className="align-middle" data-feather={menuItem.icon}></i>
                                        <span className="align-middle">{menuItem.label}</span>
                                    </a>
                                    <ul
                                        id={collapseId}
                                        className={`sidebar-dropdown list-unstyled collapse ${isSubActive ? 'show' : ''}`}
                                        data-bs-parent="#sidebar"
                                    >
                                        {menuItem.setupSubMenu.map((subItem) => (
                                            <li
                                                className={`sidebar-item ${pathname === subItem.path ? 'active' : ''}`}
                                                key={subItem.label}
                                            >
                                                <a className="sidebar-link" href={subItem.path}>
                                                    {subItem.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        } else {
                            return (
                                <li className={`sidebar-item ${isActive ? 'active' : ''}`} key={menuItem.label}>
                                    <a className="sidebar-link" href={menuItem.path}>
                                        <i className="align-middle" data-feather={menuItem.icon}></i>
                                        <span className="align-middle">{menuItem.label}</span>
                                    </a>
                                </li>
                            );
                        }
                    })}
                </React.Fragment>
            ))}
        </>
    );

    return (
        <nav id="sidebar" className={`sidebar js-sidebar ${isExpanded ? '' : 'collapsed'}`}>
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="/">
                    <span className="align-middle">AdminKit</span>
                </a>

                <ul className="sidebar-nav">
                    {renderSidebarItems}
                </ul>
            </div>
        </nav>
    )
}
