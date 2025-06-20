import { Input } from '@/components/ui/input';
import { Heart, SearchIcon, User } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import Logo from '@/components/logo';
import type { SharedData } from '@/types';
import { UserDropdown } from '@/components/user-dropdown';
import { CartSheet } from '@/components/cart-sheet';

export function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="layout-container py-6 border-b flex items-center justify-between gap-12">
            <Link href="/" className="w-full inline-flex items-center gap-8">
                <Logo />

                <div className="w-full *:not-first:mt-2">
                    <div className="w-full relative">
                        <Input
                            className="peer ps-9 pe-9 min-w-60"
                            placeholder="Tapis de souris..."
                            type="search"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <SearchIcon size={16} />
                        </div>
                    </div>
                </div>
            </Link>

            <div className="inline-flex shrink-0 gap-4">
                <nav>
                    <Link href="/" className={buttonVariants({ variant: 'link' })}>Promotions</Link>
                    <Link href="/" className={buttonVariants({ variant: 'link' })}>Nouveautés</Link>
                    <Link href="/" className={buttonVariants({ variant: 'link' })}>Marques</Link>
                </nav>

                <div className="flex items-center gap-2">
                    {auth.user ? (
                        <UserDropdown user={auth.user} />
                    ) : (
                        <Link prefetch href="/login" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                            <User size={20} />
                        </Link>
                    )}
                    <CartSheet />
                    <Link href="/" className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                        <Heart size={20} />
                    </Link>
                </div>
            </div>
        </header>
    )
}
