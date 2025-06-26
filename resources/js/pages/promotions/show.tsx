import type { PaginatedResponse, Product } from '@/types';
import { ProductListPage } from '@/components/product-list-page';

interface PromotionsProps {
    products: PaginatedResponse<Product>;
    sort: SortType;
}

type SortType = 'news' | 'price_asc' | 'price_desc';

export default function Show({ products, sort = 'news' }: PromotionsProps) {
    return (
        <ProductListPage
            title="Promotions"
            products={products}
            sort={sort}
        />
    )
}
