'use client'

import { useCallback, useEffect, useState } from "react";

import CardHorizontal from "@/app/components/Cards/CardHorizontal";
import CardVertical from "@/app/components/Cards/CardVertical";
import HomeSearchBar from "@/app/components/HomeSearchBar";
import {CardCarrousel} from "@/app/components/CardCarrousel"
import { NewsActions } from "@/app/actions/news";
import { News } from "@/app/types/news";
import { Pagination } from "@/app/types/paginate";
import { CrudPagination } from "@/app/components/pagination/Paginate";
import { useRouter } from "next/navigation";
import {Eye, Loader2, SearchX, Sparkles} from "lucide-react";


export default function Home() {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState<News[]>([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<Pagination<News> | null>(null);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<number | null>(null);
    const [tags, setTags] = useState<number[]>([]);
    const [title, setTitle] = useState("");

    const fetchNews = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await NewsActions.getAll({
                page,
                category_id: category,
                tag_id: tags,
                title: title
            });

            setNews(response.data);
            setPagination(response);
        } finally {
            setIsLoading(false);
        }
    }, [page, category, tags, title]);

    useEffect(() => {
        void fetchNews();
    }, [fetchNews]);

    const isSearching = title !== "" || category !== null || tags.length > 0;

    return (
        <div className="bg-mist-100 min-h-screen">
            <main className="mx-auto flex w-[95vw] flex-col gap-8 ">

                <div className="mt-8">
                    <HomeSearchBar
                        search={search}
                        category={category}
                        tags={tags}
                        onSearchChange={setSearch}
                        onCategoryChange={setCategory}
                        onTagsChange={setTags}
                        onClear={() => {
                            setSearch("");
                            setCategory(null);
                            setTags([]);
                            setTitle("")
                        }}
                        onButtonClick={()=>setTitle(search)}
                    />
                </div>

                {isLoading ?
                    (
                        <div className="flex w-full flex-col text-blue-500 items-center justify-center py-20">
                            <Loader2 className="h-12 w-12 animate-spin mb-4" />
                            <p className="text-lg font-medium text-gray-600">Carregando notícias...</p>
                        </div>
                )
                : news.length <= 0 ?
                    (
                        <div className="flex w-full flex-col items-center justify-center py-20 text-center">
                            <div className="rounded-full bg-gray-200/50 p-6 mb-4">
                                <SearchX className="h-12 w-12 text-gray-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Nenhuma notícia encontrada</h2>
                            <p className="text-gray-500 mt-2 max-w-md">
                                Não conseguimos encontrar nenhuma publicação, cheque se são os filtros selecionados.
                                Tente ajustar sua busca ou remover algumas categorias/tags.
                            </p>
                        </div>
                    ) :
                    (
                        <>
                            {!isSearching && page<=1 && (
                                <>
                                    <div className="flex items-center gap-2 mt-6 px-3 justify-center lg:justify-start">
                                        <Eye className="w-6 h-6 text-blue-500" />
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Mais visualizadas
                                        </h2>
                                    </div>
                                    <CardCarrousel></CardCarrousel>
                                </>
                            )}
                            <div className="w-full px-3 flex flex-col mt-10 w-full text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                    <h2 className="text-2xl font-bold text-gray-900 ">
                                        {isSearching ? "Resultados da busca" : "Últimas Atualizações"}
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {isSearching
                                        ? `Encontramos ${pagination?.total || news.length} publicação(ões)`
                                        : "Acompanhe as notícias mais recentes."}
                                </p>
                            </div>

                            <div className="flex w-full flex-wrap">
                                {news.slice(0, 6).map((item, index) => {
                                    const isOverlay = index === 0 || index === 5;

                                    return (
                                        <CardHorizontal
                                            key={item.id}
                                            news={item}
                                            variant={isOverlay ? "overlay" : "horizontal"}
                                            onClick={() => router.push(`/news/${item.id}`)}
                                        />
                                    );
                                })}
                            </div>

                            <div className="mb-10 flex w-full flex-wrap">
                                {news.slice(6, 10).map((item) => (
                                    <CardVertical
                                        key={item.id}
                                        news={item}
                                        onClick={() => router.push(`/news/${item.id}`)}
                                        variant="default"
                                    />
                                ))}
                            </div>

                            {pagination && news.length > 0 && (
                                <div className="mb-10 flex justify-center">
                                    <CrudPagination
                                        currentPage={pagination.current_page}
                                        lastPage={pagination.last_page}
                                        onPageChange={setPage}
                                    />
                                </div>
                            )}
                        </>
                    )
                }

            </main>
        </div>
    );
}