import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes commandes" />

            dashboard admin
        </AdminLayout>
    )
}
