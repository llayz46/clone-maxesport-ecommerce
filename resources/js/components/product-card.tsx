import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Heart, Blend, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export function ProductCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card className="p-0 gap-0 group rounded-md overflow-hidden transition-all duration-300 hover:shadow-md">
            <div
                className="relative aspect-[4/3] overflow-hidden bg-gray-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src="/lgg-saturn-pro-rouge-placeholder.webp"
                    alt="f"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div
                    className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                    }`}
                >
                    <Button
                        size="sm"
                        variant="secondary"
                        className="size-10 bg-white p-0 shadow-md backdrop-blur-sm hover:bg-gray-100 cursor-pointer"
                    >
                        <Heart className="size-4 text-background" />
                        <span className="sr-only">Ajouter à la wishlist</span>
                    </Button>

                    <Button
                        size="sm"
                        variant="secondary"
                        className="size-10 bg-white p-0 shadow-md backdrop-blur-sm hover:bg-gray-100 cursor-pointer"
                    >
                        <Blend className="size-4 text-background" />
                        <span className="sr-only">Comparer</span>
                    </Button>

                    <Button
                        size="sm"
                        variant="secondary"
                        className="size-10 bg-white p-0 shadow-md backdrop-blur-sm hover:bg-gray-100 cursor-pointer"
                    >
                        <Eye className="size-4 text-background" />
                        <span className="sr-only">Voir les détails</span>
                    </Button>
                </div>
            </div>

            <CardContent className="p-4">
                <Badge variant="secondary" className="flex items-center py-0.75 px-1.5 rounded-sm gap-1.5 w-fit text-[10px] font-semibold text-white">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    NEW
                </Badge>

                <Link href="/" className="mt-3 mb-1 line-clamp-2 text-base leading-tight font-semibold">Lethal Gaming Gear Saturn Pro Soft XL Square Rouge</Link>

                <span className="text-sm font-bold">64,90 €</span>

                <div className="mt-2 flex items-center gap-2">
                    <span className="block size-2 rounded-full bg-green-500/90" />
                    <span className="text-xs font-medium text-muted-foreground">
                        En stock
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
