import { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Cart, Product } from '@/types';

type CartContextType = {
    optimisticCart: Cart | null;
    setOptimisticCart: (cart: Cart | null) => void;
    loading: boolean;
    addToCart: (product: Product, quantity?: number) => void;
    removeItemOfCart: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
    initialCart: Cart | null;
};

export function CartProvider({ children, initialCart }: CartProviderProps) {
    const {
        optimisticCart,
        setOptimisticCart,
        loading,
        addToCart,
        removeItemOfCart
    } = useCart({ initialCart });

    return (
        <CartContext.Provider value={{
            optimisticCart,
            setOptimisticCart,
            loading,
            addToCart,
            removeItemOfCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext doit être utilisé dans un CartProvider');
    }

    return context;
};
