'use client';

import { useAuth } from "@/app/hooks/auth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Users, Layers, Tag, Newspaper, Loader2 } from "lucide-react";
import { Stats } from '@/app/types/stats';
import {getStats} from '@/app/actions/stat'
import { useEffect, useState } from "react";


export default function DashboardHome() {
    const { user } = useAuth();

    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (error) {
                console.error("Erro ao buscar as estatísticas:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats().catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <div className="w-fit trigger_container">
                <SidebarTrigger className="trigger" />
            </div>

            <div className="max-w-6xl mx-auto mt-6">

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">
                        Bem-vindo(a) ao Sistema, {user?.name}!
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Este é o seu painel de controle central. Acompanhe abaixo o resumo do seu sistema.
                    </p>
                </div>




                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                    </div>
                ) : stats ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <Layers size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Categorias</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.categories}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Usuários</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.users}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                <Tag size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tags</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.tags}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                <Newspaper size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Notícias</p>
                                <p className="text-2xl font-bold text-gray-800">{stats.news}</p>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                        Não foi possível carregar as estatísticas no momento.
                    </div>
                )}
            </div>
        </div>
    );
}