import { Eye } from 'lucide-react'
import { News } from "@/app/types/news";

interface NewsProps {
    news?: News
    variant?: 'overlay' | 'horizontal'
    onClick?: () => void;
}

export default function CardHorizontal({ news, variant, onClick }: NewsProps) {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const formattedDate = news?.created_at ? new Date(news.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) : 'Data desconhecida';
    const coverImage = !news?.cover_image ? "https://images.unsplash.com/photo-1513438205128-16af16280739?ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80" : news.cover_image.startsWith('http') ? news.cover_image : `${backendUrl}/storage/${news.cover_image}`;
    const authorName = news?.user?.name || "Autor Desconhecido";
    const authorAvatar = !news?.user?.profile_image ? `https://ui-avatars.com/api/?name=${encodeURIComponent(news?.user?.name || 'User')}&background=random` : news?.user.profile_image.startsWith('http') ? news?.user.profile_image : `${backendUrl}/storage/${news?.user.profile_image}`;

    const renderOverlay = (displayClasses = "") => (
        <div className={`mt-6 w-full px-3 lg:w-1/2 ${displayClasses} cursor-pointer group`} onClick={onClick}>
            <div className="w-full h-64 bg-cover bg-center bg-no-repeat rounded p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                 style={{ backgroundImage: `url(${coverImage})` }}>

                <div className="overlay-shade bg-black/40 z-0 !pointer-events-auto"></div>

                <div className="z-10 flex flex-col h-full">
                    <h2 className="text-lg text-white font-mono h-[50%] overflow-x-auto transition-colors duration-300 group-hover:text-blue-400">
                        {news?.title}
                    </h2>
                    <p className="text-gray-500/80 h-[50%] overflow-x-auto text-xs sm:text-sm"> {news?.category?.name || "Sem categoria"}</p>

                    <div className="flex flex-row flex-wrap w-1/2 h-full overflow-auto gap-1 mt-1">
                        {news?.tags?.map(tag => (
                            <span key={tag.id} className="tag-pill shadow-sm h-fit w-fit">
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-row justify-between items-end h-full">
                        <div>
                            <div className="author-wrap">
                                <div className="author-avatar">
                                    <img src={authorAvatar} alt={authorName} className="full-cover-img" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <h2 className="mb-1 text-white">{authorName}</h2>
                                    <p className="text-xs text-white opacity-50">{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="view-count-wrap mb-auto mt-10">
                            <Eye className="w-5 h-5 text-white" />
                            <p className="text-white">{news?.views || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (variant === 'overlay') {
        return renderOverlay();
    }

    return (
        <>
            {renderOverlay("block sm:hidden")}

            <div className="hidden sm:block mt-6 w-full px-3 lg:w-1/2 cursor-pointer group" onClick={onClick}>
                <div className="card-base-style h-64 flex flex-row transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">

                    <div className="w-2/5 h-full overflow-hidden">
                        <img
                            src={coverImage}
                            alt="Capa da notícia"
                            className="full-cover-img transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>

                    <div className="flex-1 flex flex-col p-5 h-full">
                        <div className="flex flex-col gap-1 h-[25%]">
                            <h2 className="text-base sm:text-lg text-gray-900 font-mono font-bold h-[50%] overflow-x-auto transition-colors duration-300 group-hover:text-blue-500">
                                {news?.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 h-[50%] overflow-x-auto">
                                {news?.category.name || "Sem categoria"}
                            </p>
                        </div>

                        <div className="flex flex-row flex-wrap mt-2 overflow-auto gap-1">
                            {news?.tags?.map(tag => (
                                <span key={tag.id} className="tag-pill shadow-sm h-fit w-fit">
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-row justify-between items-center w-full">
                            <div className="author-wrap">
                                <div className="author-avatar">
                                    <img src={authorAvatar} alt={authorName} className="full-cover-img" />
                                </div>
                                <div className="flex-1 pl-3">
                                    <h2 className="mb-0.5 text-sm text-gray-900">{authorName}</h2>
                                    <p className="text-xs text-gray-500">{formattedDate}</p>
                                </div>
                            </div>

                            <div className="view-count-wrap">
                                <Eye className="w-5 h-5 text-blue-500" />
                                <p className="text-gray-600">{news?.views || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}