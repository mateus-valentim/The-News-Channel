import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {TableSortHeader} from '../TableSortHeader'
import {TagDeleteDialog} from "@/app/components/dialogs/tag/TagDeleteDialog";
import {TagPostDialog} from "@/app/components/dialogs/tag/TagPostDialog";
import {TagType} from "@/app/types/tagType";


interface TagProps {
    data: TagType[];
    sortBy: string;
    orderBy: string;
    onSort: (field: string) => void;
    onSuccess?: () => void;
}

export function TagTable({ data, sortBy, orderBy, onSort, onSuccess }: TagProps) {
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
                                label="Atualizado"
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
                                Nenhuma tag cadastrada.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((tag) => (
                            <TableRow key={tag.id} className="group hover:bg-blue-200/50 transition-colors font-mono">
                                <TableCell className='text-sm text-gray-500 font-mono py-4'>
                                    {tag.id}
                                </TableCell>
                                <TableCell className='font-medium text-black'>
                                    {tag.name}
                                </TableCell>
                                <TableCell className='text-sm text-gray-500'>
                                    {formatDate(tag.created_at)}
                                </TableCell>
                                <TableCell className='text-sm text-gray-500'>
                                    {formatDate(tag.updated_at)}
                                </TableCell>
                                <TableCell className="flex flex-row gap-5">
                                    <TagPostDialog id={tag.id} name={tag.name} onSuccess={onSuccess}></TagPostDialog>
                                    <TagDeleteDialog id={tag.id} onSuccess={onSuccess}></TagDeleteDialog>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}