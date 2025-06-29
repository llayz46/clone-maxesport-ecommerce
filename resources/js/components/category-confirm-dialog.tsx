import { CircleAlertIcon, Folders } from 'lucide-react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Category } from '@/types';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { toast } from 'sonner';

type CategoryForm = {
    name: string;
};

export function CategoryConfirmDialog({ category, open, onClose }: { category: Category | null, open: boolean, onClose: () => void }) {
    const { data, setData, processing, errors, reset, delete: destroy } = useForm<CategoryForm>({
        name: '',
    });

    if (!category) return null;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('admin.categories.destroy', category.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('name');
                onClose();
                toast.success('Catégorie supprimée avec succès', {
                    description: data.name + ' a bien été supprimée.',
                    icon: <Folders className="size-4" />,
                });
            },
            onError: () => {
                toast.error(`Erreur lors de la suppression de la catégorie "${category.name}".`, {
                    description: "Une erreur est survenue lors de la suppression de la catégorie. Veuillez réessayer.",
                    icon: <Folders className="size-4" />,
                });
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={open => !open && onClose()}>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <CircleAlertIcon className="opacity-80" size={16} />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Supprimer la catégorie : <span className="text-foreground">{category.name}</span>
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Cette action est irréversible. Pour confirmer, veuillez saisir le nom de la catégorie <span className="text-foreground">{category.name}</span>.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="*:not-first:mt-2">
                        <Label htmlFor="name">Confirmer le nom</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder={`Saisissez "${category.name}" pour confirmer`}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="flex-1">
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="flex-1"
                            variant="destructive"
                            disabled={data.name !== category.name || processing}
                        >
                            Supprimer
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
