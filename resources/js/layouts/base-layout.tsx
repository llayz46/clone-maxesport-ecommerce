import { CookieBanner } from '@/components/cookie-banner';
import { Header } from '@/components/header';
import { InfoBanner } from '@/components/info-banner';
import { NavigationCategories } from '@/components/navigation-categories';
import { ReactNode } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <InfoBanner />

            <Header />

            <NavigationCategories />

            {children}

            <CookieBanner />
        </>
    );
}
