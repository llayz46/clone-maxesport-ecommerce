import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { AppHeader } from '@/components/app-header';
import { Toaster } from 'sonner';

export default function AdminLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>
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
            </AppContent>
        </AppShell>
    );
}
