
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
import {CategoryActions} from "@/app/actions/category";
import {Loader2} from "lucide-react";
import axios from "axios";
import { Plus, Pencil } from "lucide-react";

interface Props {
    id?: number;
    name?: string
    onSuccess?: () => void;
}

export function CategoryPostDialog({id, name, onSuccess}: Props) {
    const [categoryName, setCategoryName] = useState(name ?? "");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState("");

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", categoryName);

            if(id){
                await CategoryActions.update(id, formData);
            }else{
                await CategoryActions.create(formData);
            }

            onSuccess?.();
            setOpen(false);
            setErrors("");

        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(
                    error.response?.data?.message ??
                    "Erro ao salvar categoria."
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
                    <Button variant={null} className={
                        id
                            ? `put_button`
                            : `post_button`}
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
                                <Input id="name-1" name="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
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
