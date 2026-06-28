import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Loader2, Trash2} from "lucide-react";
import {SubmitEventHandler, useState} from "react";
import {CategoryActions} from "@/app/actions/category";
import axios from "axios";

interface Props {
    id: number,
    onSuccess?: () => void,
}
export function CategoryDeleteDialog({id, onSuccess}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState("");

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()

        try {
            setIsLoading(true);
            await CategoryActions.delete(id);


            onSuccess?.();
            setOpen(false);
            setErrors("");

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(
                    error.response?.data?.message ??
                    "Erro ao deletar categoria."
                );
            } else {
                setErrors("Erro inesperado.");
            }
        }finally {
            setIsLoading(false);
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >

                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="
        h-9
        px-4
        rounded-lg
        border-red-300
        text-red-600
        hover:bg-red-50
        hover:border-red-500
        hover:text-red-700
        transition-all
        duration-200
        flex
        items-center
        gap-2
    "
                    >
                        <Trash2 size={16} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm font-mono">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Deletar Categoria</DialogTitle>
                            <DialogDescription>
                                Tem certeza que quer deletar essa categoria? Não tem como voltar atras
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field className='p-4'>
                                {errors&& (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors}
                                    </p>
                                )}
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" disabled={isLoading}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white hover:text-white" disabled={isLoading} >
                                {isLoading && (
                                    <Loader2 size={20} className="animate-spin" />
                                )}
                                Deletar</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
        </Dialog>
    )
}
