import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCartContext } from '@/contexts/cart-context';

export function ProductQuickViewDialog({ product, open, onClose }: { product: Product | null, open: boolean, onClose: () => void }) {
    const { addToCart } = useCartContext();

    if (!product) return null;

    const featuredImage = product.images?.filter(image => image.is_featured)[0] || product.images?.[0];

    return (
        <Dialog open={open} onOpenChange={open => !open && onClose()}>
            <DialogContent className="flex gap-8 !max-w-3xl">
                {featuredImage ? (
                    <img className="block h-72 aspect-square rounded-sm" src={featuredImage.image_url} alt={featuredImage.alt_text} />
                ) : (
                    <span className="block h-72 aspect-square rounded-sm bg-muted"></span>
                )}

                <DialogHeader className="gap-4">
                    <DialogTitle className="mr-4">{product.brand.name} {product.name}</DialogTitle>

                    <span className="text-2xl font-bold text-primary">{product.price.toFixed(2)} €</span>

                    <DialogDescription>
                        {product.short_description}
                    </DialogDescription>

                    <Button
                        className="mt-auto w-full rounded-sm"
                        size="lg"
                        onClick={() => addToCart(product)}
                    >
                        Ajouter au panier
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
