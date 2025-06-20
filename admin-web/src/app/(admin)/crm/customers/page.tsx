'use client'
import GlobalPageList from '@/components/PageList';
import { usePathname } from 'next/navigation';
import React from 'react'




export default function page() {
    const pathname = usePathname();

    return (
        <GlobalPageList pathname={pathname} />

    )
}
