import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

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
    brand: Brand;
    category: Category | null;
    // group: string | null;
    images?: ProductImage[] | null;
    image: ProductImage | null;
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
