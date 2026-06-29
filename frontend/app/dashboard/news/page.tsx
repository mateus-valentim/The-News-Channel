'use client';

import { PageHeader } from "@/app/components/DashboardHeader";
import {Newspaper, Plus} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {News} from "@/app/types/news";
import {NewsActions} from "@/app/actions/news";
import {NewsTable} from "@/app/components/tables/news/NewsTable";
import {NewsSkeleton} from "@/app/components/skeletons/NewsSkeleton";
import {Pagination} from "@/app/types/paginate";
import {CrudPagination} from "@/app/components/pagination/Paginate";
import {SelectPaginate} from "@/app/components/pagination/SelectPaginate";
import {InputButton} from "@/app/components/Input";
import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation";


export default function DashboardNews() {

    const router = useRouter();
    const [news, setNews] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<Pagination<News> | null>(null);
    const [page, setPage] = useState(1);
    const [paginateBy, setPaginateBy] = useState(5);
    const [orderBy, setOrderBy] = useState("asc");
    const [sortBy, setSortBy] = useState("id");
    const [title, setTitle] = useState("");
    const [search, setSearch] = useState("");

    const fetchNews = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await NewsActions.getAll({
                page,
                paginate_by: String(paginateBy),
                order_by: orderBy,
                sort_by: sortBy,
                title,
            });

            setNews(response.data);
            setPagination(response);
        } finally {
            setIsLoading(false);
        }
    }, [page, paginateBy, orderBy, sortBy, title]);

    useEffect(() => {

        void fetchNews();
    }, [fetchNews]);


    return (
        <div className="min-h-screen">
            <PageHeader
                title="Notícias"
                description="Crie, edite e delete notícias."
                icon={Newspaper}
                colorClass="text-orange-600"
                borderColorClass="border-blue-100"
            />


            <div className="flex flex-col-reverse md:flex-row justify-between md:items-center w-full">
                <div className="flex flex-row gap-2 paragraph w-full md:w-[50vw] p-8">
                    <InputButton
                        value={search}
                        onChange={(value) => {
                            setSearch(value);
                            setPage(1);
                        }}

                    />
                    <Button className="bg-blue-600 m-auto p-4 hover:bg-blue-500"
                            onClick={() => {
                                setTitle(search);
                                setPage(1);
                            }}
                    >
                        Buscar
                    </Button>
                </div>
                <div className="px-8">
                    <Button variant={null} className="post_button" onClick={() => router.push("/dashboard/news/create")}>
                        <Plus size={18} />Criar Notícia
                    </Button>
                </div>
            </div>

            {
                isLoading ? (
                    <div  className="px-8">
                        <NewsSkeleton></NewsSkeleton>
                    </div>
                ): news?(
                    <div className="px-8">
                        <NewsTable
                            data={news}
                            sortBy={sortBy}
                            orderBy={orderBy}
                            onSort={(field) => {
                                if (field === sortBy) {
                                    setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
                                } else {
                                    setSortBy(field);
                                    setOrderBy("asc");
                                }

                                setPage(1);
                            }}
                            onSuccess={fetchNews}
                        />
                        {pagination && (
                            <div className='flex flex-row gap-5 mb-10 paragraph'>
                                <div className="mt-6">
                                    <CrudPagination
                                        currentPage={pagination.current_page}
                                        lastPage={pagination.last_page}
                                        onPageChange={setPage}
                                    />
                                </div>

                                <div className="mt-6">
                                    <SelectPaginate
                                        value={paginateBy}
                                        text="Itens por página"
                                        options={ [5, 10, 15, 20, 50, 100]}
                                        onChange={(value) => {
                                            setPaginateBy(value);
                                            setPage(1);
                                        }}
                                    />
                                </div>

                            </div>
                        )}
                    </div>

                ):(
                    <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                        Não foi possível carregar as notícias no momento.
                    </div>
                )
            }




        </div>
    );
}