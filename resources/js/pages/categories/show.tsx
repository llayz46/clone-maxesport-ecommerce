import { Head } from '@inertiajs/react';
import BaseLayout from '@/layouts/base-layout';
import type { Category } from '@/types';
import { FilterSheet } from '@/components/filter-sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/product-card';

export default function Show({ category }: { category: Category }) {
    return (
        <BaseLayout>
            <Head title={`${category.parent?.name} - ${category.name}`} />

            <main className="layout-container">
                <div className="flex items-center justify-between">
                    <FilterSheet />

                    <Select>
                        <SelectTrigger className="w-52">
                            <SelectValue defaultValue="news" placeholder="Nouveautés" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="news">Nouveautés</SelectItem>
                            <SelectItem value="popular">Popularité</SelectItem>
                            <SelectItem value="price_asc">Prix ordre croissant</SelectItem>
                            <SelectItem value="price_desc">Prix ordre décroissant</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <ul className="mt-4 grid grid-cols-4 gap-4">
                    {Array.from({ length: 16 }).map((_, index) => (
                        <li key={index}>
                            <ProductCard />
                        </li>
                    ))}
                </ul>
            </main>
        </BaseLayout>
    )
}
