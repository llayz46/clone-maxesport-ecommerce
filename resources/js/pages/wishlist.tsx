import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product } from '@/types';
import { Head, Link, router, WhenVisible } from '@inertiajs/react';
import { Heart, LoaderCircle, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCartContext } from '@/contexts/cart-context';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wishlist',
        href: '/wishlist',
    },
];

export default function Wishlist({ items }: { items: Product[] }) {
    const { addToCart } = useCartContext();
    const [optimisticWishlist, setOptimisticWishlist] = useState<Product[]>(items);

    const removeItemOfWishlist = (product: Product) => {
        const wishlist = optimisticWishlist

        setOptimisticWishlist((prev) => prev.filter((item) => item.id !== product.id));

        router.post(
            route('wishlist.remove'),
            {
                product_id: product.id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Produit retiré de la wishlist', {
                        description: `${product.brand.name} ${product.name} a été retiré de votre liste de souhaits.`,
                        icon: <Heart className="size-4" />,
                    })
                },
                onError: () => {
                    setOptimisticWishlist(wishlist);
                },
            }
        );
    }

    const removeAllItemsOfWishlist = () => {
        const wishlist = optimisticWishlist

        setOptimisticWishlist([]);

        router.post(
            route('wishlist.clear'),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Wishlist entièrement supprimé', {
                        description: 'Tous les produits de votre wishlist ont été retirés.',
                        icon: <Heart className="size-4" />,
                    })
                },
                onError: () => {
                    setOptimisticWishlist(wishlist);
                },
            }
        );
    }

    const addAllItemsToCart = async () => {
        if (!optimisticWishlist || optimisticWishlist.length === 0) {
            toast.error('Votre wishlist est vide', {
                description: 'Ajoutez des produits à votre wishlist avant de les ajouter au panier.',
                icon: <ShoppingCart className="size-4" />,
            });
            return;
        }

        for (const product of optimisticWishlist) {
            await addToCart(product);
        }

        toast.success('Tous les produits ont été ajoutés au panier', {
            description: 'Tous les produits de votre wishlist ont été ajoutés au panier.',
            icon: <ShoppingCart className="size-4" />,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wishlist" />

            <WhenVisible data="items" fallback={<WishlistFallback />}>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Ma liste de souhaits</h1>
                        {(optimisticWishlist && optimisticWishlist.length > 0) && (
                            <div className="flex justify-center items-center gap-2">
                                <Button variant="outline" onClick={addAllItemsToCart}>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Tout ajouter au panier
                                </Button>

                                <Button variant="destructive" size="icon" onClick={removeAllItemsOfWishlist}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        )}
                    </div>

                    {(optimisticWishlist && optimisticWishlist.length > 0) ? (
                        <div className="space-y-4">
                            {optimisticWishlist.map((product) => (
                                <WishlistItem key={product.id} product={product} onRemove={() => removeItemOfWishlist(product)} onAddToCart={() => addToCart(product)} />
                            ))}
                        </div>
                    ) : (
                        <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border md:min-h-min border-sidebar-border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-100/20" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <h3 className="mb-2 text-xl font-semibold">Votre liste de souhaits est vide</h3>
                                <p className="mb-4 text-muted-foreground">Parcourez notre catalogue et ajoutez des produits à votre wishlist</p>
                                <Link href="/" className={buttonVariants()}>Découvrir nos produits</Link>
                            </div>
                        </div>
                    )}
                </div>
            </WhenVisible>
        </AppLayout>
    );
}

function WishlistItem({ product, onRemove, onAddToCart }: { product: Product, onRemove: () => void, onAddToCart: () => void }) {
    return (
        <div className="flex items-center gap-4 rounded-md border p-3">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-700">
                <img src={product.featured_image?.image_url} alt={product.name} className="size-full object-cover" />
            </div>

            <div className="flex-grow">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-medium">
                            {product.brand.name} {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.short_description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        {product.discount_price ? (
                            <div className="flex items-center gap-2 *:text-nowrap">
                                <span className="text-sm text-gray-400 line-through">{product.price.toFixed(2)} €</span>
                                <span className="font-bold">{product.discount_price.toFixed(2)} €</span>
                            </div>
                        ) : (
                            <span className="font-bold">{product.price.toFixed(2)} €</span>
                        )}

                        <div className="mt-1 flex items-center">
                            <span
                                className={`mr-2 inline-block h-2 w-2 rounded-full ${product.stock === 0 ? 'bg-red-500' : product.stock < 11 ? 'bg-orange-500' : 'bg-green-500'}`}
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {product.stock === 0 ? 'Indisponible' : product.stock < 11 ? `Reste ${product.stock}` : 'En stock'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    {product.isNew && (
                        <Badge variant="secondary" className="text-xs bg-yellow-900 text-yellow-200 rounded-sm">
                            NEW
                        </Badge>
                    )}
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={product.stock === 0} onClick={onAddToCart}>
                            <Plus className="mr-1 h-3.5 w-3.5" /> Panier
                        </Button>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="size-8"
                            onClick={onRemove}
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WishlistFallback() {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Ma liste de souhaits</h1>

                <div className="flex justify-center items-center gap-2">
                    <Button variant="outline">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Tout ajouter au panier
                    </Button>

                    <Button variant="destructive" size="icon">
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>

            <LoaderCircle className="mx-auto animate-spin" size={48} />
        </div>
    )
}
