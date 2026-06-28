"use client"

import Link from "next/link"
import Image from "next/image";
import { LayoutDashboard, Layers, Users, Tag, Newspaper, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"

// Menu items configuration
const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Usuários", url: "/dashboard/users", icon: Users },
    { title: "Categorias", url: "/dashboard/categories", icon: Layers },
    { title: "Tags", url: "/dashboard/tags", icon: Tag },
    { title: "Notícias", url: "/dashboard/news", icon: Newspaper },
]

interface AppSidebarProps {
    user: {
        name: string;
        profile_image?: string;
    };
    logout: () => void;
}



export function AppSidebar({ user, logout }: AppSidebarProps) {
    return (
        <Sidebar className="font-mono">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-lg mb-5'>Management System</SidebarGroupLabel>
                    <SidebarGroupContent>

                        <SidebarMenu >
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="py-5 mb-1">
                                        <Link href={item.url}>
                                            <item.icon className="w-5 h-5" />

                                            <span className="text-base">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter >
                <SidebarMenu className="space-y-2">
                    <SidebarMenuItem>
                        <div className="flex items-center gap-3 px-2 py-3">
                            {user.profile_image ? (
                                <Image
                                    src={user.profile_image}
                                    alt={user.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                            <span className="text-base font-medium truncate">{user.name}</span>
                        </div>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50 py-5">
                            <LogOut size={20} />
                            <span className="text-lg">Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}