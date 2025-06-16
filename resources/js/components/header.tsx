import { Input } from '@/components/ui/input';
import { ArrowRightIcon, Heart, SearchIcon, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import Logo from '@/components/logo';

export function Header() {
    return (
        <header className="flex items-center gap-2">
            <Logo />

            <div className="*:not-first:mt-2">
                <div className="relative">
                    <Input
                        className="peer ps-9 pe-9"
                        placeholder="Tapis de souris..."
                        type="search"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <SearchIcon size={16} />
                    </div>
                </div>
            </div>

            <nav>
                <Link href="/" className={buttonVariants({ variant: 'link' })}>Promotions</Link>
                <Link href="/" className={buttonVariants({ variant: 'link' })}>Nouveautés</Link>
                <Link href="/" className={buttonVariants({ variant: 'link' })}>Marques</Link>
            </nav>

            <div className="flex items-center gap-3">
                <Button size="icon" variant="ghost">
                    <User size={20} />
                </Button>
                <Button size="icon" variant="ghost">
                    <ShoppingBag size={20} />
                </Button>
                <Button size="icon" variant="ghost">
                    <Heart size={20} />
                </Button>
            </div>
        </header>
    )
}
