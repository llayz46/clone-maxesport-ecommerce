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
import { BoltIcon, BookOpenIcon, Layers2Icon, LogOutIcon, PinIcon, UserIcon, UserPenIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';
import { Link, router } from '@inertiajs/react';

export function UserDropdown({ user }: { user: User }) {
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
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-foreground">{user.name}</span>
                        <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/wishlist" className="flex items-center gap-2">
                            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Option 1</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
                        <span>Option 2</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
                        <span>Option 3</span>
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
