import React from 'react';

interface NewsPreviewProps {
    html: string | null;
}

export function NewsPreview({ html }: NewsPreviewProps) {
    if (!html) return <p className="text-gray-400 p-8 text-center">Nenhum conteúdo para visualizar.</p>;

    return (

        <div className="w-full h-full bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden break-words flow-root">
            <div
                className="prose prose-blue max-w-none
                           prose-headings:font-title
                           prose-p:font-paragraph
                           prose-img:max-w-full prose-img:h-auto prose-img:rounded-md"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}