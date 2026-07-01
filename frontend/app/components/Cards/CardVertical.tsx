import { Eye } from 'lucide-react'
import { News } from "@/app/types/news";

interface NewsProps {
    news?: News;
    onClick?: () => void;
    variant?: 'default' | 'slider';
}

export default function CardVertical({ news, onClick, variant = 'default' }: NewsProps) {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const formattedDate = news?.created_at ? new Date(news.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) : 'Data desconhecida';
    const coverImage = !news?.cover_image ? "https://images.unsplash.com/photo-1513438205128-16af16280739?ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80" : news.cover_image.startsWith('http') ? news.cover_image : `${backendUrl}/storage/${news.cover_image}`;
    const authorName = news?.user?.name || "Autor Desconhecido";
    const authorAvatar = !news?.user?.profile_image ? `https://ui-avatars.com/api/?name=${encodeURIComponent(news?.user?.name || 'User')}&background=random` : news?.user.profile_image.startsWith('http') ? news?.user.profile_image : `${backendUrl}/storage/${news?.user.profile_image}`;

    return (

        <div
            className={`${variant === "slider" ? "w-full" : "w-full min-[600px]:w-1/2 min-[1000px]:w-1/3 min-[1275px]:w-1/4"} h-full mt-6 px-3 group cursor-pointer`}
            onClick={onClick}
        >

        {variant === 'slider' ? (


            <div className="relative flex flex-col w-full h-80 overflow-hidden rounded-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <img
                    src={coverImage}
                    alt={news?.title || "Capa da Notícia"}
                    className="full-cover-img absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 z-0"
                />
                <div className="overlay-shade bg-black/30 transition-colors duration-300 group-hover:bg-black/50 z-10"></div>

                <div className="absolute bottom-0 left-0 w-full p-5 z-20 flex flex-col justify-end h-full">
                    <h2 className="text-lg sm:text-xl text-white font-mono font-bold line-clamp-3 leading-tight drop-shadow-md transition-colors duration-300 group-hover:text-blue-300">
                        {news?.title || "Sem título"}
                    </h2>
                </div>
            </div>

            ) : (

        <div className="card-base-style flex-col h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">

            <div className="h-48 w-full shrink-0 overflow-hidden relative">
                <img
                    src={coverImage} alt={news?.title || "Capa da Notícia"} className="full-cover-img transition-transform duration-700 ease-out group-hover:scale-105"/>
            </div>

            <div className="flex flex-col flex-1 p-5">
                <div className="flex flex-col gap-1">
                    <h2 className="text-base sm:text-lg text-gray-900 font-mono font-bold line-clamp-3 sm:h-14 transition-colors duration-300 group-hover:text-blue-500">
                        {news?.title || "Sem título"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">
                        {news?.category?.name || "Sem categoria"}
                    </p>
                </div>

                <div className="flex flex-row gap-1 mt-1 md:mt-3 mb-3 w-full overflow-x-auto scrollbar-hide">
                    {news?.tags?.map(tag => (
                        <span key={tag.id} className="tag-pill shrink-0 whitespace-nowrap">{tag.name}</span>
                    ))}
                </div>

                <div className="mt-auto flex flex-row justify-between items-center w-full">
                    <div className="author-wrap flex-1">
                        <div className="author-avatar">
                            <img
                                src={authorAvatar}
                                alt={authorName}
                                className="full-cover-img"
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

                    <div className="view-count-wrap ml-2 shrink-0">
                        <Eye className="w-5 h-5 text-blue-500" />
                        <p className="text-gray-600 font-medium">{news?.views || 0}</p>
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
)
}