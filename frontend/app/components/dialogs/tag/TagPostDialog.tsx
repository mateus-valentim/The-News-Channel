
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
import {SubmitEventHandler, useState} from "react";
import {TagActions} from "@/app/actions/tag";
import {Loader2} from "lucide-react";
import axios from "axios";
import { Plus, Pencil } from "lucide-react";

interface Props {
    id?: number;
    name?: string
    onSuccess?: () => void;
}

export function TagPostDialog({id, name, onSuccess}: Props) {
    const [tagName, setTagName] = useState(name ?? "");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState("");

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", tagName);

            if(id){
                await TagActions.update(id, formData);
            }else{
                await TagActions.create(formData);
            }

            onSuccess?.();
            setOpen(false);
            setErrors("");

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(
                    error.response?.data?.message ??
                    "Erro ao salvar tag."
                );
            } else {
                setErrors("Erro inesperado.");
            }
        }finally {
            setIsLoading(false);
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="outline" className={
                    id
                        ? `
                    h-9
                    px-4
                    rounded-lg
                    bg-green-500
                    text-white
                    font-medium
                    shadow-sm
                    transition-all
                    duration-200
                    hover:bg-green-600
                    hover:shadow-md
                    hover:-translate-y-0.5
                    hover:text-white
                    active:translate-y-0
                    active:shadow-sm
                    flex items-center gap-2
                    `
                        : `
                    h-11
                    px-5
                    rounded-xl
                    bg-blue-600
                    text-white
                    font-medium
                    shadow-sm
                    transition-all
                    duration-200
                    hover:bg-blue-500
                    hover:shadow-md
                    hover:text-white
                    hover:-translate-y-0.5
                    active:translate-y-0
                    active:shadow-sm
                    flex items-center gap-2
                    paragraph
                    `}
                >    {id ? <Pencil size={18} /> : <Plus size={18} />}{!id && "Criar Categoria"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm font-mono">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{id?'Editar' : "Criar"} Categoria</DialogTitle>
                        <DialogDescription>
                            {id?"Edite a vategoria selecionada!":"Crie uma nova categoria aqui!"}
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field className='py-10'>
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" value={tagName} onChange={(e) => setTagName(e.target.value)}/>
                            {errors&& (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors}
                                </p>
                            )}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isLoading}>Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={isLoading}>
                            {isLoading && (
                                <Loader2 size={20} className="animate-spin" />
                            )}
                            {id?"Atualizar":"Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
