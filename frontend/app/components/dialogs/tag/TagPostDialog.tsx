
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
                <Button variant={null} className={
                    id
                        ? `put_button`
                        : `post_button`}
                >    {id ? <Pencil size={18} /> : <Plus size={18} />}{!id && "Criar tag"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm font-mono">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{id?'Editar' : "Criar"} Tag</DialogTitle>
                        <DialogDescription>
                            {id?"Edite a vategoria selecionada!":"Crie uma nova tag aqui!"}
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
