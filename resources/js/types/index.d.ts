import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { Dispatch, SetStateAction } from 'react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
    categories: Category[];
    cart: Cart;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    roles: {
        id: number;
        name: string;
        guard_name: string;
        created_at: string;
        updated_at: string;
        pivot: {
            model_type: string;
            model_id: number;
            role_id: number;
        };
    }[];
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    parent_id: number;
    parent?: Category | null;
    children?: Category[] | null;
    products_count?: number | null;
    total_products_count?: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

export interface Cart {
    id: number;
    user_id?: User | null;
    session_id?: string | null;
    created_at: string;
    updated_at: string;
    items: CartItem[];
    total: number;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    logo_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    is_primary: boolean;
    price: number;
    discount_price: number | null;
    stock: number;
    isNew: boolean;
    isWishlisted: boolean;
    brand: Brand;
    categories?: Category[] | null;
    group?: ProductGroup | null;
    images?: ProductImage[] | null;
    image?: ProductImage | null;
    featured_image?: ProductImage;
    created_at: string;
    updated_at: string;
}

export type MetaLink = {
    url: string;
    label: string;
    active: boolean;
}

export interface ProductImage {
    id: number;
    image_url: string;
    alt_text: string;
    is_featured: boolean;
    product_id: number;
    created_at: string;
    updated_at: string;
}

export interface ProductGroup {
    id: number;
    name: string;
    slug: string;
    products: Product[];
    created_at: string;
    updated_at: string;
}

export type WishlistType = [Product[], Dispatch<SetStateAction<Product[]>>];

export interface Order {
    id: number;
    order_number: string;
    stripe_checkout_session_id: string;
    amount_shipping: number;
    amount_discount: number;
    amount_subtotal: number;
    amount_total: number;
    billing_address: {
        name: string;
        email: string;
        city: string;
        country: string;
        line_1: string;
        line_2?: string | null;
        state?: string | null;
        postal_code: string;
    };
    shipping_address: {
        name: string;
        city: string;
        country: string;
        line_1: string;
        line_2?: string | null;
        postal_code: string;
        state?: string | null;
    };
    items: OrderItems[];
    created_at: string;
    updated_at: string;
}

export interface OrderItems {
    id: number;
    order_id: number;
    product_id: number;
    name: string;
    description: string;
    price: number;
    amount_discount: number;
    amount_total: number;
    quantity: number;
    product?: Product | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedLinks {
    first: string | undefined;
    last: string | undefined;
    prev: string | undefined;
    next: string | undefined;
}

export interface PaginatedMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: MetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PaginatedLinks;
    meta: PaginatedMeta;
}
