import React from 'react';

interface NewsPreviewProps {
    html: string | null;

}

export function NewsPreview({ html }: NewsPreviewProps) {
    if (!html) return <p className="text-gray-400 p-8 text-center">Nenhum conteúdo para visualizar.</p>;


    const processedHtml = html.replace(/style="/g, 'style="max-width: 100%; ');

    return (
        <div className="w-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm">

            <div
                className="prose prose-blue max-w-none
                           prose-headings:font-title
                           prose-p:font-paragraph
                           prose-img:mx-auto"
                dangerouslySetInnerHTML={{ __html: processedHtml }}
            />
        </div>
    );
}