import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    HeartIcon,
    LayoutGridIcon,
    LogOutIcon,
    PinIcon,
    UserIcon,
    UserPenIcon,
    CalendarIcon
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useInitials } from '@/hooks/use-initials';

export function UserDropdown({ user }: { user: User }) {
    const getInitials = useInitials();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" aria-label="Open account menu">
                    <UserIcon size={20} />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex items-start gap-3">
                    <Avatar>
                        <AvatarImage src={`../storage/${user.avatar}`} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">{user.name}</span>
                        <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <LayoutGridIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/wishlist" className="flex items-center gap-2">
                            <HeartIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Wishlist</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/orders" className="flex items-center gap-2">
                            <CalendarIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Commandes</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <PinIcon size={16} className="opacity-60" aria-hidden="true" />
                        <span>Option 4</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
                        <span>Option 5</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link className="flex items-center gap-2" method="post" href={route('logout')} as="button" onClick={() => router.flushAll()}>
                        <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                        <span>Se déconnecter</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
