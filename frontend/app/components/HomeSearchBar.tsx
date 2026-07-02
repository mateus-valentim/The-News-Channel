"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InputButton } from "@/app/components/Input";
import CategoryComboBox from "@/app/components/CategoryComboBox";
import TagComboBox from "@/app/components/TagComboBox";

interface NewsSearchBarProps {
    search: string;
    category: number | null;
    tags: number[];

    onSearchChange: (value: string) => void;
    onCategoryChange: (id: number | null) => void;
    onTagsChange: (ids: number[]) => void;
    onClear?: () => void;
    onButtonClick?: () => void;
}

export default function HomeSearchBar({
                                          search,
                                          category,
                                          tags,
                                          onSearchChange,
                                          onCategoryChange,
                                          onTagsChange,
                                          onClear,
                                          onButtonClick,
                                      }: NewsSearchBarProps) {
    const [advancedOpen, setAdvancedOpen] = useState(false);

    return (
        <div className="w-full rounded-2xl border bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center relative z-10 bg-white">
                <div className="flex-1">
                    <InputButton
                        value={search}
                        onChange={onSearchChange}
                    />
                </div>

                <div className="flex gap-2 justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => setAdvancedOpen((v) => !v)}
                    >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Pesquisa Avançada
                    </Button>

                    <Button
                        type="button"
                        variant={null}
                        className="rounded-xl px-6 py-3 post_button"
                        onClick={onButtonClick}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        Buscar
                    </Button>
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateRows: advancedOpen ? "1fr" : "0fr",
                    opacity: advancedOpen ? 1 : 0,
                    transition: "grid-template-rows 300ms ease, opacity 300ms ease",
                    pointerEvents: advancedOpen ? "auto" : "none",
                }}
            >
                <div className="overflow-hidden">
                    <Separator />

                    <div className="p-5">
                        <div className="grid gap-6 lg:grid-cols-2 mb-5">
                            <div >
                                <label className="text-sm font-medium text-gray-700">
                                    Category
                                </label>

                                <div className="mt-1">
                                    <CategoryComboBox
                                        value={category}
                                        onChange={onCategoryChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Tags
                                </label>

                                <TagComboBox
                                    value={tags}
                                    onChange={onTagsChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant={null}
                                className="delete_button"
                                onClick={onClear}
                            >
                                <X className="h-4 w-4" />
                                Retirar Filtros
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}