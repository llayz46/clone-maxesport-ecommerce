import { useEffect, useState } from 'react';
import { MetaLink, Product } from '@/types';
import { PaginationComponent } from '@/components/pagination-component';
import BaseLayout from '@/layouts/base-layout';
import { Head, router } from '@inertiajs/react';
import { FilterSheet } from '@/components/filter-sheet';
import { ProductQuickViewModal } from '@/components/product-quick-view-modal';
import { ProductCard } from '@/components/product-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShowPromotionsProps {
    products: {
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

export default function Show({ products, sort = 'news' }: ShowPromotionsProps) {
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [selectedSort, setSelectedSort] = useState<SortType>(sort);

    useEffect(() => {
        setSelectedSort(sort);
    }, [sort]);

    const handleSortChange = (value: SortType) => {
        setSelectedSort(value);
        router.get(window.location.pathname, {
            sort: value,
            page: products.meta.current_page
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <BaseLayout>
            <Head title="Promotions" />

            <main className="layout-container">
                <div className="flex items-center justify-between">
                    <FilterSheet/>

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
                        {products.data.map(product => (
                            <li key={product.id}>
                                <ProductCard
                                    product={product}
                                    onQuickView={() => setQuickViewProduct(product)}
                                />
                            </li>
                        ))}
                    </ul>

                    <PaginationComponent
                        pagination={{ links: products.links, meta: products.meta }}
                        preserveQuery={['sort']}
                    />
                </section>

                <ProductQuickViewModal
                    product={quickViewProduct}
                    open={!!quickViewProduct}
                    onClose={() => setQuickViewProduct(null)}
                />
            </main>
        </BaseLayout>
    )
}
