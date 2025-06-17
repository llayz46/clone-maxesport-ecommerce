'use client';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { ComponentPropsWithoutRef } from 'react';

export function NavigationCategories() {
    const { categories } = usePage<SharedData>().props;

    return (
        <NavigationMenu className="mt-4 mb-8 max-w-full *:w-full" viewport={false}>
            <NavigationMenuList className="layout-container flex justify-start">
                {categories.map(mainCategory => (
                    <NavigationMenuItem key={mainCategory.id}>
                        <NavigationMenuTrigger>{mainCategory.name}</NavigationMenuTrigger>
                        <NavigationMenuContent className="z-40">
                            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                {mainCategory.children?.map((category) => (
                                    <ListItem
                                        key={category.id}
                                        title={category.name}
                                        href={`/categories/${category.slug}`}
                                    >
                                        {category.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

function ListItem({ title, children, href, ...props }: ComponentPropsWithoutRef<'li'> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
