import BaseLayout from '@/layouts/base-layout';
import { Head } from '@inertiajs/react';
import { Brand, MetaLink } from '@/types';
import { PaginationComponent } from '@/components/pagination-component';

interface IndexProps {
    brands: {
        data: Brand[];
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
}

export default function Index({ brands }: IndexProps) {
    return (
        <BaseLayout>
            <Head title="Marques" />

            <main className="layout-container">
                <h1 className="text-2xl font-bold mb-6">Marques</h1>

                <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {brands.data.map((brand) => (
                        <div key={brand.id} className="border rounded-lg overflow-hidden">
                            <div className="p-4 flex flex-col items-center">
                                <div className="w-32 h-32 flex items-center justify-center mb-4">
                                    <img
                                        src={brand.logo_url}
                                        alt={`Logo ${brand.name}`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <h2 className="text-lg font-semibold text-center">{brand.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <PaginationComponent
                    pagination={{ links: brands.links, meta: brands.meta }}
                    preserveQuery={['sort']}
                />
            </main>
        </BaseLayout>
    );
}
