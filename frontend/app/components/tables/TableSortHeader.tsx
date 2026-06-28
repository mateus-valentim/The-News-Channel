import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface SortHeaderProps {
    label: string;
    field: string;
    sortBy: string;
    orderBy: string;
    onSort: (field: string) => void;
}

export function TableSortHeader({label, field, sortBy, orderBy, onSort,}: SortHeaderProps) {
    const isActive = sortBy === field;

    return (
        <button
            onClick={() => onSort(field)}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors font-semibold"
        >
            {label}

            {!isActive && (
                <ArrowUpDown size={16} className="text-gray-400" />
            )}

            {isActive && orderBy === "asc" && (
                <ArrowUp size={16} className="text-blue-600" />
            )}

            {isActive && orderBy === "desc" && (
                <ArrowDown size={16} className="text-blue-600" />
            )}
        </button>
    );
}