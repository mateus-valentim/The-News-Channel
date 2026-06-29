import React from 'react';

interface NewsPreviewProps {
    html: string | null;
    title: string;

}

export function NewsPreview({ html, title}: NewsPreviewProps) {
    if (!html) return <p className="text-gray-400 p-8 text-center">Nenhum conteúdo para visualizar.</p>;

    return (
        <div className="w-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{title || "Título da Notícia"}</h1>



            <div
                className="prose prose-blue max-w-none
               prose-img:mx-auto
               prose-img:transition-all
               prose-img:duration-300"
                dangerouslySetInnerHTML={{
                    __html: html
                        .replace(/style="/g, 'style="max-width: 100%; ') // Garante que a imagem não estoura o container
                }}
            />
        </div>
    );
}