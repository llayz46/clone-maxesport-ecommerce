import type { PaginatedResponse, Product } from '@/types';
import { ProductListPage } from '@/components/product-list-page';

interface IndexProductProps {
    data: PaginatedResponse<Product>;
    sort: SortType;
    search: string;
}

type SortType = 'news' | 'price_asc' | 'price_desc';

export default function Index({ data, sort = 'news', search }: IndexProductProps) {
    return (
        <ProductListPage
            title={search ? `Résultats de recherche pour "${search}"` : 'Tous les produits'}
            products={data}
            sort={sort}
        />
    )
}
