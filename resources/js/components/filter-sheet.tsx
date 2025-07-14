import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

export function FilterSheet({ current_page, stock }: { current_page: number, stock: { in: boolean, out: boolean }; }) {
    const [disponibilityFilter, setDisponibilityFilter] = useState<{ in: boolean; out: boolean }>({
        in: stock.in,
        out: stock.out,
    });
    const handleDisponibilityChange = (type: 'in' | 'out', checked: CheckedState) => {
        const updated = {
            ...disponibilityFilter,
            [type]: checked === true,
        };

        setDisponibilityFilter(updated);

        const params: Record<string, string | number> = {
            page: current_page,
        };

        if (updated.in) params.in = 1;
        if (updated.out) params.out = 1;

        router.get(window.location.pathname, params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    Filtrer
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                    <SheetDescription>Affinez votre recherche avec les filtres ci-dessous</SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="w-full *:not-first:mt-2">
                        <Label>Disponibilité</Label>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id="in-stock" onCheckedChange={(e) => handleDisponibilityChange('in', e)} defaultChecked={stock.in} />
                                <Label htmlFor="in-stock">Disponible</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="out-stock" onCheckedChange={(e) => handleDisponibilityChange('out', e)} defaultChecked={stock.out} />
                                <Label htmlFor="out-stock">Indisponible</Label>
                            </div>
                        </div>
                    </div>
                </div>
                <SheetFooter className="flex-row-reverse justify-between">
                    <SheetClose asChild>
                        <Button variant="outline">Fermer</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
