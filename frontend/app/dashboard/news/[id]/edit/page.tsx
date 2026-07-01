"use client";

import {useEffect, useState, use} from "react";
import {Loader2, Newspaper} from "lucide-react";
import { PageHeader } from "@/app/components/DashboardHeader";
import CategoryComboBox from "@/app/components/CategoryComboBox";
import { Input } from "@/components/ui/input";
import { Editor,JSONContent } from '@tiptap/react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Field,
    FieldLabel,
} from "@/components/ui/field";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import TagComboBox from "@/app/components/TagComboBox";
import {SimpleEditor} from "@/components/tiptap-templates/simple/simple-editor";
import axios from "axios";
import {useRouter} from "next/navigation";
import {NewsActions} from "@/app/actions/news";
import {NewsPreview} from "@/app/components/NewsPreview";

interface tag{
    id: number;
    name: string;
}

export default function EditNews({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const newsId = Number(resolvedParams.id);
    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [tagId, setTagId] = useState<number[] | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [contentJson, setContentJson] = useState<JSONContent | null>(null);
    const [contentHtml, setContentHtml] = useState<string| null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchNews() {
            try {
                setIsLoading(true);

                const news = await NewsActions.getOne(newsId);

                setTitle(news.title)
                setCategoryId(news.category_id)

                if (news.tags && news.tags.length > 0) {
                    setTagId(news.tags.map((tag: tag) => tag.id));
                }

                if (news.content_json) {
                    try {
                        const parsedContent = typeof news.content_json === "string"
                            ? JSON.parse(news.content_json)
                            : news.content_json;
                        setContentJson(parsedContent);
                    } catch (e) {
                        console.error("Erro ao converter o JSON do Tiptap", e);
                    }
                }

                setContentHtml(news.content_html);

                if (news.cover_image) {
                    if (news.cover_image.startsWith('http')) {
                        setPreview(news.cover_image);
                    } else {
                        setPreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${news.cover_image}`);
                    }
                }


            }catch (error) {
                console.error("Erro ao buscar a notícia:", error);
                setErrors("Não foi possível carregar os dados da notícia.");
            }
            finally {
                setIsLoading(false);
            }
        }

        void fetchNews();
    },[])

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    async function handleSubmit() {
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append("title", title);

            if (image) {
                formData.append("cover_image", image);
            }

            if(contentHtml){
                formData.append("content_html", contentHtml);
            }

            const finalContent = typeof contentJson === "string" ? contentJson : JSON.stringify(contentJson);
            formData.append("content_json", finalContent);

            formData.append("category_id", String(categoryId));

            if (tagId && tagId.length > 0) {
                tagId.forEach((id) => {
                    formData.append("tags[]", String(id));
                });
            }

            await NewsActions.update(newsId, formData);


            router.push("/dashboard/news");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(
                    error.response?.data?.message ??
                    "Erro ao salvar categoria."
                );
            } else {
                setErrors("Erro inesperado.");
            }
        }finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className="min-h-screen">
            <PageHeader
                title="Notícias"
                description="Crie uma nova notícia."
                icon={Newspaper}
                colorClass="text-orange-600"
                borderColorClass="border-blue-100"
            />


            <div className=" mx-auto px-6 py-8 flex flex-col gap-10">
                <Card className="shadow-sm border-gray-200">
                    <CardHeader>
                        <CardTitle>Informações da notícia</CardTitle>
                        <CardDescription>
                            Preencha os dados básicos antes de escrever o conteúdo.
                        </CardDescription>
                    </CardHeader>


                    {isLoading ? (
                            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-3">
                                <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
                                <p className="text-sm font-medium text-gray-500 animate-pulse">
                                    Carregando dados da notícia...
                                </p>
                            </div>
                        )
                    :(
                            <CardContent className="space-y-6">
                                <Field>
                                    <FieldLabel>Título</FieldLabel>

                                    <Input
                                        placeholder="Digite o título da notícia..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Categoria</FieldLabel>

                                    <CategoryComboBox
                                        onChange={(id) => setCategoryId(id)}
                                        value={categoryId}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Tags</FieldLabel>

                                    <TagComboBox
                                        onChange={(id) => setTagId(id)}
                                        value={tagId}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Imagem de Capa</FieldLabel>

                                    <div className="flex flex-col gap-2">
                                        <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer border-1  file:text-blue-700"></Input>
                                        {preview && (
                                            <div className="relative w-full max-w-sm aspect-video rounded-xl border border-border overflow-hidden shadow-sm group">
                                                <Image
                                                    src={preview}
                                                    alt="Preview da capa"
                                                    fill
                                                    unoptimized
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Field>

                            </CardContent>
                        )}
                </Card>


                <Card className='shadow-sm border-gray-200'>
                    <CardHeader>
                        <CardTitle>
                            Conteúdo
                        </CardTitle>
                        <CardDescription>
                            Escreva o corpo da matéria aqui
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="w-full overflow-hidden rounded-md border">
                            {contentJson && (
                                <SimpleEditor
                                    content={contentJson}
                                    onUpdate={({ editor }) => {
                                        setContentJson((editor as Editor).getJSON());
                                        setContentHtml((editor as Editor).getHTML());
                                    }}
                                />
                            )}
                        </div>
                    </CardContent>
                </Card>

                {errors && (
                    <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
                        {errors}
                    </div>
                )}

                <div className="flex justify-end pb-8">
                    <Button
                        size="lg"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Publicando..." : "Publicar Notícia"}
                    </Button>
                </div>



                <NewsPreview
                    html={contentHtml}

                />



            </div>



        </div>
    );
}