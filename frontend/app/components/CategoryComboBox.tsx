"use client"

import {useEffect, useMemo, useState} from "react"
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


    return (

        <Combobox items={categories} value={selectedCategoryName ?? null}>
            <ComboboxInput placeholder="Selecione uma categoria" />
            <ComboboxContent>
                {isLoading ? (
                    <ComboboxEmpty>
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                    </ComboboxEmpty>
                ):
                    <><ComboboxEmpty>No items found.</ComboboxEmpty><ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item.id} value={String(item.name)} onClick={() => onChange?.(Number(item.id))}>
                                {item.name}
                            </ComboboxItem>
                        )}
                    </ComboboxList></>
                }

            </ComboboxContent>
        </Combobox>
    )
}
