'use client'

import * as React from "react"
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { News } from "@/app/types/news";
import { NewsActions } from "@/app/actions/news";
import CardVertical from "@/app/components/Cards/CardVertical";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Eye, Loader2} from "lucide-react";

export function CardCarrousel() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState<News[]>([]);

    const fetchNews = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await NewsActions.getAll({
                sort_by: "views",
            });
            setNews(response.data);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchNews();
    }, [fetchNews]);

    if (isLoading) return (
        <div className="flex w-full flex-col text-blue-500 items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-600">Carregando notícias...</p>
        </div>
    );
    if (news.length === 0) return null;

    return (
        <div className="w-full px-4 md:px-12">

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {news.map((noticia) => (

                        <CarouselItem
                            key={noticia.id}
                            className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >

                            <div className="h-full">
                                <CardVertical
                                    news={noticia}
                                    variant="slider"
                                    onClick={() => router.push(`/news/${noticia.id}`)}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex h-12 w-12 text-blue-600 hover:text-blue-700" />
                <CarouselNext className="hidden md:flex h-12 w-12 text-blue-600 hover:text-blue-700" />
            </Carousel>
        </div>
    )
}