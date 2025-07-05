import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { BreadcrumbItem } from '@/types';
import { ProductFormPage } from '@/components/product-form-page';

interface ProductCreateType {
    breadcrumbs: BreadcrumbItem[];
    brands: { id: number; name: string }[];
    groups: { id: number; name: string, products: { id: number; name: string; product_group_id: number }[] }[];
}

export default function Create({ breadcrumbs, brands, groups }: ProductCreateType) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un produit" />

            <ProductFormPage
                brands={brands}
                groups={groups}
            />
        </AdminLayout>
    )
}
