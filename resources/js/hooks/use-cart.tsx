import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cart, CartItem, Product } from '@/types';
import { router } from '@inertiajs/react';

export function useCart({ initialCart }: { initialCart?: Cart | null } = {}) {
    const [optimisticCart, setOptimisticCart] = useState<Cart | null>(initialCart || null);
    const [loading, setLoading] = useState(!initialCart);

    useEffect(() => {
        if (initialCart) {
            setOptimisticCart(initialCart);
        } else {
            fetchCart();
        }
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/cart');
            setOptimisticCart(data.cart);
        } catch (error) {
            console.error('Erreur fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product: Product, quantity: number = 1) => {
        if (!optimisticCart) return;

        const cart = optimisticCart;

        const existingItem = optimisticCart.items?.find(item => item.product.id === product.id);
        let updatedItems: CartItem[] = [];

        if (existingItem) {
            updatedItems = optimisticCart.items.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            const newItem: CartItem = {
                id: Date.now(),
                cart_id: optimisticCart.id,
                product_id: product.id,
                product: product,
                quantity,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            updatedItems = [...(optimisticCart.items || []), newItem];
        }

        setOptimisticCart(prev => ({ ...prev!, items: updatedItems }));

        router.post(
            route('cart.add'),
            { product_id: product.id, quantity },
            {
                preserveScroll: true,
                onSuccess: (page: { props: { cart: Cart } }) => {
                    setOptimisticCart(page.props.cart);
                },
                onError: () => {
                    setOptimisticCart(cart);
                },
            }
        );
    };

    const removeItemOfCart = (productId: number) => {
        if (!optimisticCart) return;

        const cart = optimisticCart;

        const updatedItems = optimisticCart.items?.filter(item => item.product.id !== productId)

        setOptimisticCart(prev => ({ ...prev!, items: updatedItems }));

        router.post(
            route('cart.remove'),
            { product_id: productId },
            {
                preserveScroll: true,
                onSuccess: (page: { props: { cart: Cart } }) => {
                    setOptimisticCart(page.props.cart);
                },
                onError: () => {
                    setOptimisticCart(cart);
                },
            }
        )
    };

    return {
        optimisticCart,
        loading,
        addToCart,
        removeItemOfCart
    };
}
