"use client"

import Link from "next/link"
import Image from "next/image";
import { LayoutDashboard, Layers, Users, Tag, Newspaper, LogOut } from "lucide-react"
import {useState} from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter, useSidebar,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

// Menu items configuration
const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, color:"text-green-600",  hover: "hover:text-green-600", },
    { title: "Categorias", url: "/dashboard/categories", icon: Layers, color:"text-blue-600",  hover: "hover:text-blue-600", },
    { title: "Tags", url: "/dashboard/tags", icon: Tag, color:"text-purple-600",  hover: "hover:text-purple-600", },
    { title: "Notícias", url: "/dashboard/news", icon: Newspaper, color:"text-orange-600",  hover: "hover:text-orange-600",},
]

interface AppSidebarProps {
    user: {
        name: string;
        profile_image?: string;
    };
    logout: () => void;
}



export function AppSidebar({ user, logout }: AppSidebarProps) {
    const { setOpenMobile } = useSidebar();
    const pathname = usePathname();

    const [lastClicked, setLastClicked] = useState(()=>{
        if(pathname === "/dashboard"){ return 0}
        else if (pathname === "/dashboard/categories"){ return 1 }
        else if (pathname === "/dashboard/tags"){ return 2 }
        if (pathname.startsWith("/dashboard/news")) {
            return 3;
        }
        else return -1
    });

    return (
        <Sidebar className="font-mono">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-lg mb-5'>Management System</SidebarGroupLabel>
                    <SidebarGroupContent>

                        <SidebarMenu >
                            {items.map((item,i) => (
                                <SidebarMenuItem key={i}>
                                    <SidebarMenuButton asChild className={`py-5 mb-1  ${item.hover} ${i==lastClicked && item.color} transition-all duration-200`}>
                                        <Link href={item.url} onClick={() => {
                                            setOpenMobile(false)
                                            setLastClicked(i)
                                        }}>
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