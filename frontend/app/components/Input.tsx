import { Search } from "lucide-react";
import {Field} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface InputSearchProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
}

export function InputButton({
                                value,
                                onChange,
                            }: InputSearchProps) {
    return (
        <Field className="space-y-2">
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Digite para pesquisar..."
                    className="h-11 rounded-xl border-gray-200 bg-white pl-10 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
            </div>
        </Field>
    );
}