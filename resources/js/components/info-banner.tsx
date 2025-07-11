import { WordRotate } from '@/components/ui/word-rotate';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export function InfoBanner() {
    const { infoBanner } = usePage<SharedData>().props;

    return (
        <div className="w-full bg-black dark:bg-white">
            <WordRotate
                duration={4000}
                className="font-bold text-center text-white dark:text-black"
                words={infoBanner.map(item => item.message)}
            />
        </div>
    )
}
