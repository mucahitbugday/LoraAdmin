"use client";

import React from "react";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
    return (
        <div className="wrapper h-screen overflow-hidden">
            <AppSidebar />
            <div className="main h-full overflow-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                <AppHeader />
                <main className="content p-2">{children}</main>
            </div>
        </div>
    );
}