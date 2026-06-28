import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"


export function CategorySkeleton() {


    return (
        <div className='border border-gray-200 bg-white shadow-sm rounded-xl'>
            <Table>
                <TableHeader>
                    <TableRow className='bg-gray-50/50  border-b border-gray-200 text-base'>
                        <TableHead className="w-20 font-semibold">ID</TableHead>
                        <TableHead className="font-semibold">Nome</TableHead>
                        <TableHead className=" font-semibold">Criado em</TableHead>
                        <TableHead className="font-semibold">Atualizado</TableHead>
                        <TableHead className="font-semibold">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="group hover:bg-blue-200/50 transition-colors">
                        <TableCell className='py-5'>
                            <Skeleton className="h-2 w-10 bg-gray-400" />
                        </TableCell>
                        <TableCell className='py-5'>
                            <Skeleton className="h-2 w-24 bg-gray-400" />
                        </TableCell>
                        <TableCell className='py-5'>
                            <Skeleton className="h-2 w-24 bg-gray-400" />
                        </TableCell>
                        <TableCell className='py-5'>
                            <Skeleton className="h-2 w-24 bg-gray-400" />
                        </TableCell>
                        <TableCell className="py-5">
                            <Skeleton className="h-2 w-10 bg-gray-400" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}