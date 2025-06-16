import { ReactNode } from 'react';
import { Header } from '@/components/header';
import { NavigationCategories } from '@/components/navigation-categories';
import { InfoBanner } from '@/components/info-banner';

export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <InfoBanner />

            <Header />

            <NavigationCategories />

            {children}
        </>
    )
}
