import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { News } from "@/app/types/news"
import {TableSortHeader} from '../TableSortHeader'
import {Pencil, Trash2} from "lucide-react";
import { Button } from "@/components/ui/button";


interface NewsProps {
    data: News[];
    sortBy: string;
    orderBy: string;
    onSort: (field: string) => void;
    onSuccess?: () => void;
}

export function NewsTable({ data, sortBy, orderBy, onSort, onSuccess }: NewsProps) {
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
    };

    return (
        <div className='border border-gray-200 bg-white shadow-sm rounded-xl'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-gray-50/50  border-b border-gray-200 text-base'>
                        <TableHead className="w-20">
                            <TableSortHeader
                                label="ID"
                                field="id"
                                sortBy={sortBy}
                                orderBy={orderBy}
                                onSort={onSort}
                            />
                        </TableHead>

                        <TableHead className="w-fit">
                            <TableSortHeader
                                label="Title"
                                field="title"
                                sortBy={sortBy}
                                orderBy={orderBy}
                                onSort={onSort}
                            />
                        </TableHead>

                        <TableHead className="w-20">
                            <TableSortHeader
                                label="Views"
                                field="views"
                                sortBy={sortBy}
                                orderBy={orderBy}
                                onSort={onSort}
                            />
                        </TableHead>

                        <TableHead className="font-semibold w-48">Categoria</TableHead>
                        <TableHead className="font-semibold w-64">Tags</TableHead>
                        <TableHead className="font-semibold w-48">Autor</TableHead>

                        <TableHead className="font-semibold w-36">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-gray-500 italic">
                                Nenhuma Notícia cadastrada.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((noticia) => (
                            <TableRow key={noticia.id} className="group hover:bg-blue-200/50 transition-colors font-mono">
                                <TableCell className='text-sm text-gray-500 font-mono py-4'>
                                    {noticia.id}
                                </TableCell>
                                <TableCell className='font-medium text-black'>
                                    {noticia.title}
                                </TableCell>
                                <TableCell className='font-medium text-black'>
                                    {noticia.views}
                                </TableCell>
                                <TableCell className='font-medium text-black'>
                                    {noticia.category.name}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {noticia.tags.map((tag) => (
                                            <span key={tag.id} className="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className='font-medium text-black'>
                                    {noticia.user.name}
                                </TableCell>

                                <TableCell className="text-center">
                                    <div className="flex flex-row gap-2 justify-center items-center">
                                        <Button variant="outline" className="h-9 px-4 rounded-lg bg-green-500 text-white font-medium shadow-sm transition-all
                                        duration-200 hover:bg-green-600 hover:shadow-md hover:-translate-y-0.5 hover:text-white active:translate-y-0 active:shadow-sm
                                        flex items-center gap-2"><Pencil size={18} /></Button>
                                        <Button variant="outline" className="h-9 px-4 rounded-lg border-red-300 text-red-600 hover:bg-red-50 hover:border-red-500
                                        hover:text-red-700 transition-all duration-200 flex items-center gap-2"><Trash2 size={16} /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}