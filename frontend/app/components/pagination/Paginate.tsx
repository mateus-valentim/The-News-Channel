import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

export function CrudPagination({currentPage, lastPage, onPageChange,}: Props) {


    const getPages = (): (number | "...")[] => {
        if (lastPage <= 7) {
            return Array.from({ length: lastPage }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [];

        const start = Math.max(2, currentPage - 2);
        const end = Math.min(lastPage - 1, currentPage + 2);

        pages.push(1);

        if (start > 2) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < lastPage - 1) {
            pages.push("...");
        }

        pages.push(lastPage);

        return pages;
    };

    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();

                            if (currentPage > 1) {
                                onPageChange(currentPage - 1);
                            }
                        }}
                    />
                </PaginationItem>

                {getPages().map((item, index) =>
                    item === "..." ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item}>
                            <PaginationLink
                                href="#"
                                isActive={item === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(item);
                                }}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();

                            if (currentPage < lastPage) {
                                onPageChange(currentPage + 1);
                            }
                        }}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}