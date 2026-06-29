'use client';

import { useAuth } from "@/app/hooks/auth";
import { AppSidebar } from "@/app/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import {Loader2} from "lucide-react";
import "@/app/globals.css";
import { Montserrat, Roboto, Poppins } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});

const robotoMono = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
});

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
});


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, isLoading } = useAuth({ middleware: 'auth' });


    if (isLoading) {
        return (
            <div className="flex gap-2 items-center justify-center h-screen text-gray-500">
                <Loader2 size={20} className="animate-spin" />
                <span>Carregando...</span>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <SidebarProvider>
            <div className="flex w-full min-h-screen bg-gray-50">
                <AppSidebar user={user} logout={logout} />
                <main className="flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}