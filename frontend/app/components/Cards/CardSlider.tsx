import {News} from "@/app/types/news";

interface NewsProps {
    news?: News
}

export default function CardSlider({news}: NewsProps) {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const coverImage = news?.cover_image
        ? `${backendUrl}/storage/${news.cover_image}`
        : "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80";
    return(

        <div className="w-full min-[600px]:w-1/2 min-[1000px]:w-1/3 min-[1275px]:w-1/4 h-full mt-6 px-3">

            <div className="relative flex flex-col w-full h-80 overflow-hidden rounded-xl group cursor-pointer">

                <img
                    src={coverImage}
                    alt="Capa da Notícia"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
                />

                <div className="absolute inset-0 bg-black/30 t z-10 pointer-events-none"></div>

                <div className="absolute bottom-0 left-0 w-full p-5 z-20 flex flex-col justify-end h-full">
                    <h2 className="text-lg sm:text-xl text-white font-mono font-bold line-clamp-3 leading-tight drop-shadow-md">
                        {news?.title}
                    </h2>
                </div>

            </div>

        </div>
    )
}