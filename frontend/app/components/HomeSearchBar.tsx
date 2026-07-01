"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {InputButton} from "@/app/components/Input";
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

export default function NewsSearchBar({
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
        <div className="w-full rounded-2xl border bg-white shadow-sm">
            <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
                <div className="flex-1">
                    <InputButton
                        value={search}
                        onChange={onSearchChange}
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl"
                        onClick={() => setAdvancedOpen((v) => !v)}
                    >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Advanced Filters
                    </Button>

                    <Button
                        type="button"
                        variant={null}
                        className="rounded-xl px-6 py-3 post_button"
                        onClick={onButtonClick}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </Button>
                </div>
            </div>

            {advancedOpen && (
                <>
                    <Separator />

                    <div className="space-y-6 p-5">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-6">
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

                            <div className="space-y-2">
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
                                <X className="mr-2 h-4 w-4" />
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}