import { WordRotate } from '@/components/ui/word-rotate';

export function InfoBanner() {
    return (
        <div className="w-full bg-background dark:bg-white">
            <WordRotate duration={4000} className="font-bold text-center text-white dark:text-black" words={["Expédition le jour même", "Livraison offerte sur +1000 produits", "Découvre nos +4000 avis clients", "100% Gaming & Esport"]} />
        </div>
    )
}
