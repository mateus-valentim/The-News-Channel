import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Category } from "@/app/types/category"
import {TableSortHeader} from '../TableSortHeader'
import {CategoryPostDialog} from "@/app/components/dialogs/category/CategoryPostDialog";
import {CategoryDeleteDialog} from "@/app/components/dialogs/category/CategoryDeleteDialog";


interface CategoryProps {
    data: Category[];
    sortBy: string;
    orderBy: string;
    onSort: (field: string) => void;
    onSuccess?: () => void;
}

export function CategoryTable({ data, sortBy, orderBy, onSort, onSuccess }: CategoryProps) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
    };

    return (
        <div className='border border-gray-200 bg-white shadow-sm rounded-xl'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-gray-50/50  border-b border-gray-200 text-base'>
                        <TableHead>
                            <TableSortHeader
                                label="ID"
                                field="id"
                                sortBy={sortBy}
                                orderBy={orderBy}
                                onSort={onSort}
                            />
                        </TableHead>

                        <TableHead>
                            <TableSortHeader
                                label="Name"
                                field="name"
                                sortBy={sortBy}
                                orderBy={orderBy}
                                onSort={onSort}
                            />
                        </TableHead>

                        <TableHead>
                            <TableSortHeader
                                label="Criado em"
                                field="created_at"
                                sortBy={sortBy}
                                orderBy={orderBy}
                                onSort={onSort}
                            />
                        </TableHead>

                        <TableHead>
                            <TableSortHeader
                                label="Atualizado em"
                                field="updated_at"
                                sortBy={sortBy}
                                orderBy={orderBy}
                                onSort={onSort}
                            />
                        </TableHead>

                        <TableHead className="font-semibold">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-gray-500 italic">
                                Nenhuma categoria cadastrada.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((category) => (
                            <TableRow key={category.id} className="group hover:bg-blue-200/50 transition-colors font-mono">
                                <TableCell className='text-sm text-gray-500 font-mono py-4'>
                                    {category.id}
                                </TableCell>
                                <TableCell className='font-medium text-black'>
                                    {category.name}
                                </TableCell>
                                <TableCell className='text-sm text-gray-500'>
                                    {formatDate(category.created_at)}
                                </TableCell>
                                <TableCell className='text-sm text-gray-500'>
                                    {formatDate(category.updated_at)}
                                </TableCell>
                                <TableCell className="flex flex-row gap-5">
                                    <CategoryPostDialog id={category.id} name={category.name} onSuccess={onSuccess}></CategoryPostDialog>
                                    <CategoryDeleteDialog id={category.id} onSuccess={onSuccess}></CategoryDeleteDialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}