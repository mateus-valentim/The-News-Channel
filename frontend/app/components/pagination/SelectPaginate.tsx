import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    value: number;
    text: string;
    options: number[];
    onChange: (value: number) => void;
}

export function SelectPaginate({value, text, options, onChange,}: Props) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 whitespace-nowrap">
                {text}
            </span>

            <Select
                value={String(value)}
                onValueChange={(value) => onChange(Number(value))}
            >
                <SelectTrigger className="w-28">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option}
                            value={String(option)}
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}