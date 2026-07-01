import { Eye } from 'lucide-react'
import { News } from "@/app/types/news";

interface NewsProps {
    news?: News
    onClick?: () => void;
}

export default function CardVertical({ news,onClick }: NewsProps) {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const formattedDate = news?.created_at ? new Date(news.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) : 'Data desconhecida';
    const coverImage = news?.cover_image ? `${backendUrl}/storage/${news.cover_image}` : "https://images.unsplash.com/photo-1513438205128-16af16280739?ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80";
    const authorName = news?.user?.name || "Autor Desconhecido";
    const authorAvatar = news?.user?.profile_image ? `${backendUrl}/storage/${news.user.profile_image}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`;

    return (
        <div className="w-full min-[600px]:w-1/2 min-[1000px]:w-1/3 min-[1275px]:w-1/4 h-full mt-6 px-3" onClick={onClick}>
            <div className="flex flex-col w-full h-full bg-mist-50 border border-blue-400 overflow-hidden rounded">
                <div className="h-full shrink-0">
                    <img
                        src={coverImage}
                        alt={news?.title || "Capa da Notícia"}
                        className="object-cover h-full w-full"
                    />
                </div>

                <div className="flex flex-col flex-1 p-5">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-base sm:text-lg text-gray-900 font-mono font-bold line-clamp-3 sm:h-14">
                            {news?.title || "Sem título"}
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">
                            {news?.category?.name || "Sem categoria"}
                        </p>

                    </div>

                    <div className="flex flex-row gap-1 mt-1 md:mt-3 mb-3 w-full overflow-x-auto scrollbar-hide">
                        {news?.tags?.map(tag => (
                            <span
                                key={tag.id}
                                className="bg-green-500 text-white text-xs px-3 py-0.5 rounded-full shrink-0 whitespace-nowrap"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto flex flex-row justify-between items-center w-full">
                        <div className="inline-flex items-center min-w-0 flex-1">
                            <div className="h-10 w-10 overflow-hidden rounded-full shrink-0">
                                <img
                                    src={authorAvatar}
                                    alt={authorName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 pl-3 min-w-0">
                                <h2 className="mb-0.5 text-sm text-gray-900 truncate">
                                    {authorName}
                                </h2>
                                <p className="text-xs text-gray-500 truncate">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-1.5 text-sm ml-2 shrink-0">
                            <Eye className="w-5 h-5 text-blue-500" />
                            <p className="text-gray-600 font-medium">{news?.views || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}