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
import {Loader2, Trash2} from "lucide-react";
import {SubmitEventHandler, useState} from "react";
import {NewsActions} from "@/app/actions/news";
import axios from "axios";

interface Props {
    id: number,
    onSuccess?: () => void,
}
export function NewsDeleteDialog({id, onSuccess}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState("");

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()

        try {
            setIsLoading(true);
            await NewsActions.delete(id);


            onSuccess?.();
            setOpen(false);
            setErrors("");

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(
                    error.response?.data?.message ??
                    "Erro ao deletar notícia."
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
        variant={null}
    className="delete_button border-1 border-red-300"
    >
    <Trash2 size={16} />
    </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-sm font-mono">
    <form onSubmit={handleSubmit}>
        <DialogHeader>
            <DialogTitle>Deletar Notícia</DialogTitle>
    <DialogDescription>
    Tem certeza que quer deletar essa notícia? Não tem como voltar atras
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
