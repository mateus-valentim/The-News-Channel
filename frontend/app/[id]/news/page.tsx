'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Eye, Loader2 } from "lucide-react";

import { NewsPreview } from "@/app/components/NewsPreview";
import { NewsActions } from "@/app/actions/news";
import { News } from "@/app/types/news";

export default function NewsPage() {
    const params = useParams();
    const newsId = Number(params.id);

    const [news, setNews] = useState<News | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        async function fetchNews() {
            try {
                setIsLoading(true);

                const data = await NewsActions.getOne(newsId);

                setNews(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load this news.");
            } finally {
                setIsLoading(false);
            }
        }

        if (!isNaN(newsId)) {
            void fetchNews();
        }

    }, [newsId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error || "News not found."}</p>
            </div>
        );
    }

    const cover = news.cover_image
        ? `${backend}/storage/${news.cover_image}`
        : "/placeholder.jpg";

    const avatar = news.user?.profile_image
        ? `${backend}/storage/${news.user.profile_image}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(news.user.name)}&background=random`;

    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="flex justify-center">
                    <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-medium">
                        {news.category?.name}
                    </span>
                </div>
                <h1 className="mt-6 text-center text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                    {news.title}
                </h1>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {news.tags?.map(tag => (
                        <span
                            key={tag.id}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
                <div className="mt-10 flex flex-wrap justify-center items-center gap-3 md:gap-4 text-gray-500 text-sm">
                    <img
                        src={avatar}
                        className="w-10 h-10 rounded-full object-cover"
                        alt={news.user.name}
                    />

                    <span className="font-medium text-gray-900">{news.user.name}</span>

                    <span className="hidden sm:inline">•</span>

                    <span>
                        {new Date(news.created_at).toLocaleDateString("pt-BR")}
                    </span>

                    <span className="hidden sm:inline">•</span>

                    <div className="flex items-center gap-1">
                        <Eye size={16}/>
                        {news.views}
                    </div>
                </div>
                {news.cover_image && (
                    <img
                        src={cover}
                        alt={news.title}
                        className="mt-12 w-full max-h-[500px] object-cover rounded-2xl shadow-lg"
                    />
                )}
                <div className="mt-10 w-full pb-16">
                    <NewsPreview html={news.content_html} />
                </div>
            </div>
        </main>
    );
}