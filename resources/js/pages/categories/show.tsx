import { Head } from '@inertiajs/react';
import BaseLayout from '@/layouts/base-layout';

export default function Show({ category }) {
    return (
        <BaseLayout>
            <Head title="ffdfsdsd" />

            <div>
                DATA :
                {JSON.stringify(category, null, 2)}
            </div>
        </BaseLayout>
    )
}
