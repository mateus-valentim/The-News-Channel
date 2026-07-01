'use client'

import { useCallback, useEffect, useState } from "react";

import CardHorizontal from "@/app/components/Cards/CardHorizontal";
import CardVertical from "@/app/components/Cards/CardVertical";
import NewsSearchBar from "@/app/components/HomeSearchBar";

import { NewsActions } from "@/app/actions/news";
import { News } from "@/app/types/news";
import { Pagination } from "@/app/types/paginate";
import { CrudPagination } from "@/app/components/pagination/Paginate";
import { useRouter } from "next/navigation";


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

    return (
        <div className="bg-mist-100">
            <main className="mx-auto flex w-[95vw] flex-col gap-8 ">

                <div className="mt-8">
                    <NewsSearchBar
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

                <div className="flex w-full flex-wrap">
                    {news.slice(0, 6).map((item, index) => {
                        const isOverlay = index === 0 || index === 5;

                        return (
                            <CardHorizontal
                                key={item.id}
                                news={item}
                                variant={isOverlay ? "overlay" : "horizontal"}
                                onClick={() => router.push(`/${item.id}/news`)}
                            />
                        );
                    })}
                </div>

                <div className="mb-10 flex w-full flex-wrap">
                    {news.slice(6, 10).map((item) => (
                        <CardVertical
                            key={item.id}
                            news={item}
                            onClick={() => router.push(`/${item.id}/news`)}
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
            </main>
        </div>
    );
}