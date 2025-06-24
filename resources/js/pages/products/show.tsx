import { Product, ProductImage } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Heart, RotateCcw, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import BaseLayout from '@/layouts/base-layout';
import { useState } from 'react';
import { useWishlist } from '@/hooks/use-wishlist';

interface ShowProductProps {
    product: Product;
}

export default function Show({ product }: ShowProductProps) {
    const featuredImage: ProductImage | undefined = product.images?.find(image => image.is_featured)
    const [imageToShow, setImageToShow] = useState<ProductImage | undefined>(featuredImage || product.images?.[0]);
    const { addItem } = useWishlist();

    return (
        <BaseLayout>
            <Head title={`${product.brand.name} ${product.name}`} />

            {/*<WhenVisible data="items" fallback={<WishlistFallback />}>*/}
            {/*</WhenVisible>*/}

            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                    <div className="space-y-4">
                        <div className="border bg-card rounded-md overflow-hidden relative aspect-square">
                            <img
                                src="/lgg-saturn-pro-rouge-placeholder.webp"
                                alt={imageToShow?.alt_text || product.name}
                                className="object-cover"
                            />
                            {product.isNew && (
                                <Badge className="rounded-sm absolute top-4 left-4 bg-orange-400/90 text-primary-foreground">Nouveau</Badge>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {product.images?.map(image => (
                                <div key={image.id} className="border bg-card rounded-md overflow-hidden aspect-square">
                                    <img
                                        src="/lgg-saturn-pro-rouge-placeholder.webp"
                                        alt={image.alt_text}
                                        className="object-cover"
                                        onClick={() => setImageToShow(image)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground font-medium">{product.brand.name}</p>
                            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">(24 avis)</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-baseline gap-2">
                                {product.discount_price ? (
                                    <>
                                        <span className="text-3xl font-bold text-foreground">€{product.discount_price.toFixed(2)}</span>
                                        <span className="text-lg text-muted-foreground line-through">€{product.price.toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-foreground">€{product.price.toFixed(2)}</span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">TVA incluse, frais de port calculés à la caisse</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-foreground">
                                {product.stock === 0 ? 'Indisponible' : product.stock < 11 ? `Reste ${product.stock}` : 'En stock'}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <Button size="lg" className="flex-1">
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Ajouter au panier
                                </Button>
                                <Button size="lg" variant="outline" className="bg-background text-foreground border" onClick={() => addItem(product)}>
                                    <Heart className="w-4 h-4" />
                                </Button>
                            </div>

                            <Button variant="outline" size="lg" className="w-full bg-background text-foreground border">
                                Acheter maintenant
                            </Button>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="grid gap-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Truck className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground">Livraison gratuite dès 50€</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground">Garantie 2 ans</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <RotateCcw className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-foreground">Retour gratuit sous 30 jours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Product Information */}
                {/*<div className="mt-16 max-w-7xl mx-auto">*/}
                {/*    <div className="grid md:grid-cols-3 gap-8">*/}
                {/*        <Card className="border bg-card">*/}
                {/*            <CardContent className="p-6">*/}
                {/*                <h3 className="font-semibold text-foreground mb-3">Spécifications</h3>*/}
                {/*                <div className="space-y-2 text-sm">*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Marque:</span>*/}
                {/*                        <span className="text-foreground">{product.brand.name}</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Modèle:</span>*/}
                {/*                        <span className="text-foreground">{product.name}</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Type:</span>*/}
                {/*                        <span className="text-foreground">Tapis de souris</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Surface:</span>*/}
                {/*                        <span className="text-foreground">Tissu texturé</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}

                {/*        <Card className="border bg-card">*/}
                {/*            <CardContent className="p-6">*/}
                {/*                <h3 className="font-semibold text-foreground mb-3">Livraison</h3>*/}
                {/*                <div className="space-y-2 text-sm">*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Standard:</span>*/}
                {/*                        <span className="text-foreground">3-5 jours</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Express:</span>*/}
                {/*                        <span className="text-foreground">1-2 jours</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Gratuite dès:</span>*/}
                {/*                        <span className="text-foreground">50€</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}

                {/*        <Card className="border bg-card">*/}
                {/*            <CardContent className="p-6">*/}
                {/*                <h3 className="font-semibold text-foreground mb-3">Support</h3>*/}
                {/*                <div className="space-y-2 text-sm">*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Garantie:</span>*/}
                {/*                        <span className="text-foreground">2 ans</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Retours:</span>*/}
                {/*                        <span className="text-foreground">30 jours</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="flex justify-between">*/}
                {/*                        <span className="text-muted-foreground">Support:</span>*/}
                {/*                        <span className="text-foreground">24/7</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </CardContent>*/}
                {/*        </Card>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </BaseLayout>
    )
}
