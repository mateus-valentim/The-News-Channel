'use client';

import { PageHeader } from "@/app/components/DashboardHeader";
import {Tag} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {TagType} from "@/app/types/tagType";
import {TagActions} from "@/app/actions/tag";
import {TagTable} from "@/app/components/tables/tag/TagTable";
import {CategorySkeleton} from "@/app/components/skeletons/CategorySkeleton";
import {Pagination} from "@/app/types/paginate";
import {CrudPagination} from "@/app/components/pagination/Paginate";
import {SelectPaginate} from "@/app/components/pagination/SelectPaginate";
import {InputButton} from "@/app/components/Input";
import { Button } from "@/components/ui/button"
import {TagPostDialog} from "@/app/components/dialogs/tag/TagPostDialog";





export default function DashboardCategories() {

    const [tags, setTags] = useState<TagType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<Pagination<TagType> | null>(null);
    const [page, setPage] = useState(1);
    const [paginateBy, setPaginateBy] = useState(10);
    const [orderBy, setOrderBy] = useState("asc");
    const [sortBy, setSortBy] = useState("id");
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");

    const fetchTags = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await TagActions.getAll({
                page,
                paginate_by: String(paginateBy),
                order_by: orderBy,
                sort_by: sortBy,
                name,
            });

            setTags(response.data);
            setPagination(response);
        } finally {
            setIsLoading(false);
        }
    }, [page, paginateBy, orderBy, sortBy, name]);

    useEffect(() => {

        void fetchTags();
    }, [fetchTags]);


    return (
        <div className="min-h-screen">
            <PageHeader
                title="Tags"
                description="Crie, edite e delete tags."
                icon={Tag}
                colorClass="text-purple-800"
                borderColorClass="border-blue-100"
            />


            <div className="flex flex-col-reverse md:flex-row justify-between md:items-center w-full">
                <div className="flex flex-row gap-2 paragraph w-full md:w-[50vw] p-8">
                    <InputButton
                        value={search}
                        onChange={(value) => {
                            setSearch(value);
                            setPage(1);
                        }}

                    />
                    <Button className="bg-blue-600 m-auto p-4 hover:bg-blue-500"
                            onClick={() => {
                                setName(search);
                                setPage(1);
                            }}
                    >
                        Buscar
                    </Button>
                </div>
                <div className="px-8">
                    <TagPostDialog onSuccess={fetchTags}/>
                </div>
            </div>

            {
                isLoading ? (
                    <div  className="px-8">
                        <CategorySkeleton></CategorySkeleton>
                    </div>
                ): tags?(
                    <div className="px-8">
                        <TagTable
                            data={tags}
                            sortBy={sortBy}
                            orderBy={orderBy}
                            onSort={(field) => {
                                if (field === sortBy) {
                                    setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
                                } else {
                                    setSortBy(field);
                                    setOrderBy("asc");
                                }

                                setPage(1);
                            }}
                            onSuccess={fetchTags}
                        />
                        {pagination && (
                            <div className='flex flex-row gap-5 mb-10 paragraph'>
                                <div className="mt-6">
                                    <CrudPagination
                                        currentPage={pagination.current_page}
                                        lastPage={pagination.last_page}
                                        onPageChange={setPage}
                                    />
                                </div>

                                <div className="mt-6">
                                    <SelectPaginate
                                        value={paginateBy}
                                        text="Itens por página"
                                        options={ [5, 10, 15, 20, 50, 100]}
                                        onChange={(value) => {
                                            setPaginateBy(value);
                                            setPage(1);
                                        }}
                                    />
                                </div>

                            </div>
                        )}
                    </div>

                ):(
                    <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                        Não foi possível carregar as tags no momento.
                    </div>
                )
            }


        </div>
    );
}