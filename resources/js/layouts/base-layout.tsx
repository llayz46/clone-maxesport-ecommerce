import { CookieBanner } from '@/components/cookie-banner';
import { Header } from '@/components/header';
import { InfoBanner } from '@/components/info-banner';
import { NavigationCategories } from '@/components/navigation-categories';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <InfoBanner />

            <Header />

            <NavigationCategories />

            {children}

            <Toaster
                theme="dark"
                toastOptions={{
                    classNames: {
                        toast: '!bg-background !border !border-border !text-sm !font-medium !font-sans',
                        description: '!text-sm !text-muted-foreground !font-sans',
                    },
                }}
            />

            <CookieBanner />
        </>
    );
}
