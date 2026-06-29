'use client';

import { PageHeader } from "@/app/components/DashboardHeader";
import {Layers, Loader2} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {Category} from "@/app/types/category";
import {CategoryActions} from "@/app/actions/category";
import {CategoryTable} from "@/app/components/tables/category/CategoryTable";
import {CategorySkeleton} from "@/app/components/skeletons/CategorySkeleton";
import {Pagination} from "@/app/types/paginate";
import {CrudPagination} from "@/app/components/pagination/Paginate";
import {SelectPaginate} from "@/app/components/pagination/SelectPaginate";
import {InputButton} from "@/app/components/Input";
import { Button } from "@/components/ui/button"
import {CategoryPostDialog} from "@/app/components/dialogs/category/CategoryPostDialog";




export default function DashboardCategories() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState<Pagination<Category> | null>(null);
    const [page, setPage] = useState(1);
    const [paginateBy, setPaginateBy] = useState(10);
    const [orderBy, setOrderBy] = useState("asc");
    const [sortBy, setSortBy] = useState("id");
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true);

            const response = await CategoryActions.getAll({
                page,
                paginate_by: String(paginateBy),
                sort_order: orderBy,
                sort_by: sortBy,
                name,
            });

            setCategories(response.data);
            setPagination(response);
        } finally {
            setIsLoading(false);
        }
    }, [page, paginateBy, orderBy, sortBy, name]);

    useEffect(() => {

        void fetchCategories();
    }, [fetchCategories]);


    return (
        <div className="min-h-screen">
            <PageHeader
                title="Categorias"
                description="Crie, edite e delete categorias."
                icon={Layers}
                colorClass="text-blue-800"
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
                    <CategoryPostDialog onSuccess={fetchCategories}/>
                </div>
            </div>

            {
                isLoading ? (
                    <div  className="px-8">
                        <CategorySkeleton></CategorySkeleton>
                    </div>
                ): categories?(
                    <div className="px-8">
                        <CategoryTable
                            data={categories}
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
                            onSuccess={fetchCategories}
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
                        Não foi possível carregar as categorias no momento.
                    </div>
                )
            }


        </div>
    );
}