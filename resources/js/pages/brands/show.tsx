import type { PaginatedResponse, Brand, Product } from '@/types';
import { ProductListPage } from '@/components/product-list-page';

interface BrandProps {
    brand: Brand;
    products: PaginatedResponse<Product>
    sort: SortType;
}

type SortType = 'news' | 'price_asc' | 'price_desc';

export default function Show({ brand, products, sort = 'news' }: BrandProps) {
    return (
        <ProductListPage
            title={brand.name}
            products={products}
            sort={sort}
        />
    )
}
