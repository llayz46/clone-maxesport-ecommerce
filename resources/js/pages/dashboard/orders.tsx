import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Order } from '@/types';
import { Filter, RotateCcw, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Commandes',
        href: '/orders',
    },
];

export default function Orders({ orders }: { orders: Order[] }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes commandes" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Mes commandes</h1>
                    <p className="text-muted-foreground">Consultez l'historique de vos commandes et leur statut</p>
                </div>

                <Card className="border bg-card mb-4 py-4">
                    <CardContent className="px-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input placeholder="Rechercher par numéro de commande..." className="pl-10 bg-background border" />
                                </div>
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full sm:w-48 bg-background border">
                                    <Filter />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les statuts</SelectItem>
                                    <SelectItem value="delivered">Livré</SelectItem>
                                    <SelectItem value="shipped">Expédié</SelectItem>
                                    <SelectItem value="processing">En cours</SelectItem>
                                    <SelectItem value="cancelled">Annulé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {orders.map(order => (
                        <Card key={order.id} className="border bg-card">
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-lg font-semibold text-foreground">Commande {order.order_number}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">Passée le {formatDate(order.created_at)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/*{getStatusBadge(order.status)}*/}
                                        <span className="text-lg font-semibold text-foreground">€{(order.amount_total / 100).toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="space-y-3 mb-4">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                                <img
                                                    src={item.product?.featured_image?.image_url}
                                                    alt={item.product?.featured_image?.alt_text}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-foreground truncate">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-foreground">€{(item.price / 100).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                {/*<div className="mb-4">*/}
                                {/*    {order.status === "delivered" && (*/}
                                {/*        <p className="text-sm text-muted-foreground">*/}
                                {/*            <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />*/}
                                {/*            Livré le {formatDate(order.deliveryDate!)} • Suivi: {order.trackingNumber}*/}
                                {/*        </p>*/}
                                {/*    )}*/}
                                {/*    {order.status === "shipped" && (*/}
                                {/*        <p className="text-sm text-muted-foreground">*/}
                                {/*            <Truck className="w-4 h-4 inline mr-1 text-blue-600" />*/}
                                {/*            Expédié • Livraison estimée: {formatDate(order.estimatedDelivery!)} • Suivi:{" "}*/}
                                {/*            {order.trackingNumber}*/}
                                {/*        </p>*/}
                                {/*    )}*/}
                                {/*    {order.status === "processing" && (*/}
                                {/*        <p className="text-sm text-muted-foreground">*/}
                                {/*            <Clock className="w-4 h-4 inline mr-1 text-yellow-600" />*/}
                                {/*            En cours de préparation • Expédition estimée: {formatDate(order.estimatedShipping!)}*/}
                                {/*        </p>*/}
                                {/*    )}*/}
                                {/*    {order.status === "cancelled" && (*/}
                                {/*        <p className="text-sm text-muted-foreground">*/}
                                {/*            <AlertCircle className="w-4 h-4 inline mr-1 text-red-600" />*/}
                                {/*            Annulé le {formatDate(order.cancelledDate!)} • Remboursement:{" "}*/}
                                {/*            {order.refundStatus === "completed" ? "Effectué" : "En cours"}*/}
                                {/*        </p>*/}
                                {/*    )}*/}
                                {/*</div>*/}

                                <div className="flex flex-wrap gap-2">
                                    <Button variant="outline" size="sm">
                                        <RotateCcw /> Commander à nouveau
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}
