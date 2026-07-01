import React, {useMemo} from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import {Loader2} from "lucide-react";
import {useEffect, useState} from "react"
import {TagActions} from "@/app/actions/tag";
import {TagType} from "@/app/types/tagType";


interface TagSelectorProps {
    onChange?: (ids: number[]) => void;
    value?: number[] | null;
}

const MultipleSelectorDemo = ({onChange, value}:TagSelectorProps) => {
    const [tags, setTags] = useState<TagType[]>([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        async function fetchTags() {
            try {
                setIsLoading(true);

                const response = await TagActions.getAllNoPag();

                setTags(response);
                console.log(response);
            }catch (error) {
                console.error("Erro ao buscar categorias:", error)
            }
            finally {
                setIsLoading(false);
            }
        }

        void fetchTags();
    }, []);

    const options = useMemo<Option[]>(
        () =>
            tags.map((tag) => ({
                label: tag.name,
                value: String(tag.id),
            })),
        [tags]
    );

    const selectedOptions = useMemo<Option[]>(() => {
        if (!value || value.length === 0 || tags.length === 0) return [];
        return tags
            .filter((tag) => value.includes(tag.id))
            .map((tag) => ({
                label: tag.name,
                value: String(tag.id),
            }));
    }, [value, tags])

    if (isLoading) {
        return (
            <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="w-full ">
            <MultipleSelector className='w-full rounded-lg bg-gray-50 shadow-sm'
                defaultOptions={options}
                value={selectedOptions}
                placeholder="Selecione as tags"
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Nenhuma tag foi achada
                    </p>
                }
                onChange={(options) =>{

                    const ids = options.map((option) => Number(option.value));
                    onChange?.(ids);
                } }
            />
        </div>
    );
};

export default MultipleSelectorDemo;
