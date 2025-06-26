import type { Category, PaginatedResponse, Product } from '@/types';
import { ProductListPage } from '@/components/product-list-page';

interface ShowProductProps {
    category: Category;
    data: PaginatedResponse<Product>;
    sort: SortType;
}

type SortType = 'news' | 'price_asc' | 'price_desc';

export default function Show({ category, data, sort = 'news' }: ShowProductProps) {
    return (
        <ProductListPage
            title={`${category.parent?.name} - ${category.name}`}
            products={data}
            sort={sort}
        />
    )
}
