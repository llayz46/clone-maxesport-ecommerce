import { Head, router } from '@inertiajs/react';
import BaseLayout from '@/layouts/base-layout';
import { Category, MetaLink, Product } from '@/types';
import { FilterSheet } from '@/components/filter-sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/product-card';
import { PaginationComponent } from '@/components/pagination-component';
import { useEffect, useState } from 'react';

interface ShowProductProps {
    category: Category;
    data: {
        data: Product[];
        links: {
            first: string | undefined;
            last: string | undefined;
            prev: string | undefined;
            next: string | undefined;
        };
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: MetaLink[];
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
    sort: SortType;
}

type SortType = 'news' | 'price_asc' | 'price_desc';

export default function Show({ category, data, sort = 'news' }: ShowProductProps) {
    const [selectedSort, setSelectedSort] = useState<SortType>(sort);

    useEffect(() => {
        setSelectedSort(sort);
    }, [sort]);

    const handleSortChange = (value: SortType) => {
        setSelectedSort(value);
        router.get(window.location.pathname, {
            sort: value,
            page: data.meta.current_page
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <BaseLayout>
            <Head title={`${category.parent?.name} - ${category.name}`} />

            <main className="layout-container">
                <div className="flex items-center justify-between">
                    <FilterSheet />

                    <Select
                        onValueChange={handleSortChange}
                        defaultValue={sort}
                        value={selectedSort}
                    >
                        <SelectTrigger className="w-52">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="news">Nouveautés</SelectItem>
                            <SelectItem value="price_asc">Prix ordre croissant</SelectItem>
                            <SelectItem value="price_desc">Prix ordre décroissant</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <section className="space-y-6 mb-8">
                    <ul className="mt-4 grid grid-cols-4 gap-4">
                        {data.data.map(product => (
                            <li key={product.id}>
                                <ProductCard product={product} />
                            </li>
                        ))}
                    </ul>

                    <PaginationComponent
                        pagination={{ links: data.links, meta: data.meta }}
                        preserveQuery={['sort']}
                    />
                </section>
            </main>
        </BaseLayout>
    )
}
