"use client"

import React, {useEffect, useMemo, useState} from "react"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import {Category} from "@/app/types/category";
import {CategoryActions} from "@/app/actions/category";
import {Loader2} from "lucide-react";

interface comboBoxProps {
    onChange?: (id: number | null) => void;
    value?: number | null;
}


export default function CategoryComboBox({onChange, value}: comboBoxProps) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true);

                const response = await CategoryActions.getAllNoPag();

                setCategories(response);
            }catch (error) {
                console.error("Erro ao buscar categorias:", error)
                }
            finally {
                setIsLoading(false);
            }
        }

        void fetchCategories();
    }, []);

    const selectedCategoryName = useMemo(() => {
        if (!value || categories.length === 0) return null;
        const category = categories.find((c) => c.id === value);
        return category ? String(category.name) : null;
    }, [value, categories]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
        );
    }


    return (
        <Combobox
            items={categories}
            value={selectedCategoryName ?? null}

        >
            <ComboboxInput
                placeholder="Selecione uma categoria"
                className="bg-white p-4.5 rounded-lg border border-gray-200"
            />

            <ComboboxContent className="bg-white rounded border border-gray-200 shadow-lg p-3">
                {isLoading ? (
                    <ComboboxEmpty className="py-6">
                        <Loader2 className="mx-auto animate-spin text-blue-500" size={40} />
                    </ComboboxEmpty>
                ) : (
                    <>
                        <ComboboxEmpty className="py-6">
                            No items found.
                        </ComboboxEmpty>

                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem
                                    key={item.id}
                                    value={String(item.name)}
                                    onClick={() => onChange?.(Number(item.id))}
                                    className="rounded-lg px-4 py-3"
                                >
                                    {item.name}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </>
                )}
            </ComboboxContent>
        </Combobox>
    );
}
