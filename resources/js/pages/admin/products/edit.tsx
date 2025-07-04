import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import type { BreadcrumbItem, Product } from '@/types';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertCircle,
    Bolt,
    ChartNoAxesCombined,
    Euro, Package,
    Images,
    Warehouse,
    ChevronDownIcon,
    ChevronUpIcon,
    ExternalLink, Eye, Trash2, Upload, Star, ImageIcon, AlertCircleIcon, UploadIcon, CheckIcon, Loader2
} from 'lucide-react';
import { Button as AriaButton, Group, Input as AriaInput, Label as AriaLabel, NumberField } from "react-aria-components"
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog';
import { FormEventHandler, useEffect, useState } from 'react';
import { useFileUpload } from '@/hooks/use-file-upload';
import slugify from 'slugify';
import { toast } from 'sonner';
import { getStorageUrl } from '@/utils/format-storage-url';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { BrandDialog } from '@/components/brand-dialog';
import { CategoryTree } from '@/components/category-tree';
import { ProductGroupDialog } from '@/components/product-group-dialog';
import { calculateMargin, calculateProfit } from '@/utils/product-price-calculating';

interface ProductType {
    breadcrumbs: BreadcrumbItem[];
    product: Product;
    brands: {
        id: number;
        name: string;
    }[];
    groups: {
        id: number;
        name: string;
        products: {
            id: number;
            name: string;
        }[];
    }[]
}

type ProductForm = {
    name: string;
    short_description: string;
    description: string;
    price: number;
    discount_price: number | null;
    cost_price: number;
    stock: number;
    reorder_level: number;
    status: boolean;
    images: {
        id: number | null;
        image_file: File | null;
        image_url?: string;
        alt_text: string;
        is_featured: boolean;
    }[];
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    brand_id: number;
    category_id: string;
    group_id: string;
}

interface FormTabContentProps<T> {
    data: T;
    setData: {
        <K extends keyof T>(field: K, value: T[K]): void;
        (values: T): void;
    };
    errors: Record<string, string>;
    processing?: boolean;
    brands?: { id: number; name: string }[];
    groups?: { id: number; name: string, products: { id: number; name: string }[] }[];
}

export default function Edit({ breadcrumbs, product, brands, groups }: ProductType) {
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

    const { data, setData, post, errors, processing } = useForm<ProductForm>({
        name: product.name ?? '',
        short_description: product.short_description ?? '',
        description: product.description ?? '',
        price: product.price ?? 0,
        discount_price: product.discount_price ?? null,
        cost_price: product.cost_price ?? 0,
        stock: product.stock ?? 0,
        reorder_level: product.reorder_level ?? 0,
        status: Boolean(product.status),
        images: product.images?.map(img => ({
            id: img.id ?? null,
            image_url: img.image_url,
            image_file: null,
            alt_text: img.alt_text ?? '',
            is_featured: Boolean(img.is_featured),
        })) ?? [],
        meta_title: product.meta_title ?? null,
        meta_description: product.meta_description ?? null,
        meta_keywords: product.meta_keywords ?? null,
        brand_id: product.brand.id,
        category_id: product.categories && product.categories.length > 0 ? String(product.categories[0].id) : '',
        group_id: product.group ? String(product.group.id) : '',
    });

    const [initialData, setInitialData] = useState(data);

    useEffect(() => {
        setInitialData(data);
    }, [product]);

    const isDirty = JSON.stringify(data) !== JSON.stringify(initialData);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.products.update', product.id), {
            method: 'put',
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Produit modifié avec succès', {
                    description: data.name + ' a bien été modifié.',
                    icon: <Package className="size-4" />,
                });
            },
            onError: (errors) => {
                const allErrors = Object.values(errors).join('\n') || 'Veuillez vérifier les informations saisies.';

                toast.error('Erreur lors de la modification du produit.', {
                    description: allErrors,
                    icon: <Package className="size-4" />,
                });
            },
        })
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Modification : ${product.name}`} />

            <form className="space-y-6 py-6" onSubmit={submit}>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-foreground">Modifier : {product.name}</h1>
                        <p className="text-muted-foreground">SKU: {product.sku}</p>
                    </div>
                    <Button disabled={processing || !isDirty}>
                        {processing && (
                            <Loader2 className="animate-spin" />
                        )}
                        Enregistrer les modifications
                    </Button>
                </div>

                <Transition
                    show={isDirty}
                    enter="transition ease-in-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0 scale-95"
                >
                    <Alert className="border-orange-800 bg-orange-950">
                        <AlertCircle className="size-4 dark:text-orange-400" />
                        <AlertDescription className="text-orange-200">
                            Vous avez des modifications non enregistrées. N'oubliez pas de sauvegarder vos changements.
                        </AlertDescription>
                    </Alert>
                </Transition>

                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="general">
                            <TabsList className="mb-3">
                                <TabsTrigger value="general">
                                    <Bolt className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                    Général
                                </TabsTrigger>
                                <TabsTrigger value="images" className="group">
                                    <Images className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                    Images
                                </TabsTrigger>
                                <TabsTrigger value="pricing" className="group">
                                    <Euro className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                    Tarification
                                </TabsTrigger>
                                <TabsTrigger value="inventory" className="group">
                                    <Warehouse className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                    Inventaire
                                </TabsTrigger>
                                <TabsTrigger value="seo" className="group">
                                    <ChartNoAxesCombined className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                                    Seo
                                </TabsTrigger>
                            </TabsList>

                            <GeneralTabContent data={data} setData={setData} errors={errors} processing={processing}
                                               brands={brands} groups={groups} />

                            <ImagesTabContent data={data} setData={setData} errors={errors} processing={processing} />

                            <PricingTabContent data={data} setData={setData} errors={errors} />

                            <InventoryTabContent data={data} setData={setData} errors={errors} />

                            <SeoTabContent data={data} setData={setData} errors={errors} processing={processing} />
                        </Tabs>
                    </div>

                    <div className="space-y-4 lg:col-span-1">
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Statut du produit</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="status">Produit actif</Label>
                                    <Switch id="status" defaultChecked={product.status} onCheckedChange={(checked) => setData('status', checked)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Date du produit</Label>
                                    <Label>{product.created_at}</Label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Dernière modification</Label>
                                    <Label>{product.updated_at}</Label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Référence produit</Label>
                                    <Label>{product.sku}</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Aperçu rapide</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Prix de vente:</span>
                                    <span className="font-semibold text-foreground">€{product.price.toFixed(2)}</span>
                                </div>
                                {product.discount_price && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Prix promo:</span>
                                        <span className="font-semibold text-green-600 dark:text-green-400">€{product.discount_price.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Stock:</span>
                                    <span className="font-semibold text-foreground">{product.stock}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Marge:</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">{calculateMargin(data.cost_price, data.discount_price ?? data.price)}%</span>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-1">
                                        {product.status ? <Badge className="bg-green-900 text-green-200">Actif</Badge> : <Badge className="bg-red-900 text-red-200">Inactif</Badge>}
                                        {product.isNew && <Badge className="bg-blue-900 text-blue-200">Nouveau</Badge>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <Link
                                    className={`${buttonVariants({ variant: 'outline' })} justify-start`}
                                    href={route('admin.products.show', product.slug)}
                                >
                                    <Eye />
                                    Voir le produit
                                </Link>
                                <Link
                                    className={`${buttonVariants({ variant: 'outline' })} justify-start`}
                                    href={route('product.show', product.slug)}
                                >
                                    <ExternalLink />
                                    Voir sur le site
                                </Link>
                                <Separator />
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-border bg-background text-red-400 hover:border-red-900 hover:bg-red-950"
                                    type="button"
                                    onClick={() => setDeleteProduct(product)}
                                >
                                    <Trash2 />
                                    Supprimer le produit
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>

            <ConfirmDeleteDialog
                item={deleteProduct}
                open={!!deleteProduct}
                onClose={() => setDeleteProduct(null)}
                itemNameKey="name"
                deleteRoute={(item) => route('admin.products.destroy', item.slug)}
                itemLabel="produit"
                icon={<Package className="size-4" />}
                prefix="Le"
            />
        </AdminLayout>
    );
}

function GeneralTabContent({ data, setData, brands, groups, processing }: FormTabContentProps<ProductForm>) {
    const [openBrand, setOpenBrand] = useState<boolean>(false)
    const [openGroups, setOpenGroups] = useState<boolean>(false)
    const [openBrandDialog, setOpenBrandDialog] = useState<boolean>(false);
    const [openGroupDialog, setOpenGroupDialog] = useState<boolean>(false);
    const [brandInputValue, setBrandInputValue] = useState<string>('')

    return (
        <TabsContent value="general" className="space-y-4">
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-foreground">Informations de base</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor="name">Nom du produit *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                tabIndex={1}
                                disabled={processing}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Nom du produit"
                            />
                        </div>
                        {data.name && (
                            <div className="mt-auto flex h-9 items-center">
                                <code className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{slugify(data.name.toLowerCase())}</code>
                            </div>
                        )}
                    </div>
                    <div className="*:not-first:mt-2">
                        <Label htmlFor="short_description">Courte description *</Label>
                        <Textarea
                            id="short_description"
                            value={data.short_description}
                            onChange={(e) => setData('short_description', e.target.value)}
                            tabIndex={2}
                            disabled={processing}
                            rows={5}
                            placeholder="Courte description du produit..."
                        />
                    </div>
                    <div className="*:not-first:mt-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            tabIndex={3}
                            disabled={processing}
                            rows={5}
                            placeholder="Description détaillée du produit..."
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-foreground">Marques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="brand">Marque du produit *</Label>
                                <Popover open={openBrand} onOpenChange={setOpenBrand}>
                                    <PopoverTrigger asChild tabIndex={4} disabled={processing}>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openBrand}
                                            className="w-full justify-between border-input bg-background px-3 font-normal outline-offset-0
                                                outline-none hover:bg-background focus-visible:outline-[3px]"
                                        >
                                            <span className={cn('truncate', !data.brand_id && 'text-muted-foreground')}>
                                                {data.brand_id
                                                    ? brands?.find(brand => brand.id === data.brand_id)
                                                        ?.name
                                                    : "Sélectionner une marque"}
                                            </span>
                                            <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground/80" aria-hidden="true" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Rechercher une marque..." onValueChange={(e) => setBrandInputValue(e)} />
                                            <CommandList>
                                                <CommandEmpty>
                                                    <BrandDialog
                                                        open={openBrandDialog}
                                                        setOpen={() => {
                                                            setOpenBrandDialog(!openBrandDialog);
                                                        }}
                                                        brand={null}
                                                        inputValue={brandInputValue}
                                                    />
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {brands?.map(brand => (
                                                        <CommandItem
                                                            key={brand.id}
                                                            value={brand.name}
                                                            onSelect={() => {
                                                                setData('brand_id', brand.id);
                                                                setOpenBrand(false);
                                                            }}
                                                        >
                                                            {brand.name}
                                                            {data.brand_id === brand.id && <CheckIcon size={16} className="ml-auto" />}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="*:not-first:mt-2">
                                <Label htmlFor="group">Groupe de produits</Label>
                                <Popover open={openGroups} onOpenChange={setOpenGroups}>
                                    <PopoverTrigger asChild tabIndex={5} disabled={processing}>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openGroups}
                                            className="w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px]"
                                        >
                                            <span className={cn('truncate', (data.group_id === null || data.group_id === undefined) && 'text-muted-foreground')}>
                                                {data.group_id
                                                    ? groups?.find(group => String(group.id) === data.group_id)?.name ?? 'Sélectionner un groupe'
                                                    : 'Aucun groupe'}
                                            </span>
                                            <ChevronDownIcon size={16} className="shrink-0 text-muted-foreground/80" aria-hidden="true" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Rechercher un groupe..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    <ProductGroupDialog open={openGroupDialog} setOpen={() => { setOpenGroupDialog(!openGroupDialog) }} />
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    <CommandItem
                                                        value="none"
                                                        onSelect={() => {
                                                            setData('group_id', '');
                                                            setOpenGroups(false);
                                                        }}
                                                    >
                                                        Aucun groupe
                                                        {!data.group_id && <CheckIcon size={16} className="ml-auto" />}
                                                    </CommandItem>

                                                    {groups?.map(group => (
                                                        <CommandItem
                                                            key={group.id}
                                                            value={group.name}
                                                            onSelect={() => {
                                                                setData('group_id', String(group.id));
                                                                setOpenGroups(false);
                                                            }}
                                                        >
                                                            <span className="flex flex-col gap-1">
                                                                {group.name}
                                                                <span className="text-xs text-muted-foreground text-wrap">
                                                                    {group.products.map((product, index) => (
                                                                        <span key={product.id} className="text-xs text-muted-foreground ml-1">
                                                                            {product.name} {index < group.products.length - 1 ? ',' : ''}
                                                                        </span>
                                                                    ))}
                                                                </span>
                                                            </span>
                                                            {data.group_id === String(group.id) && <CheckIcon size={16} className="ml-auto" />}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="*:not-first:mt-2">
                            <CategoryTree
                                onlyChildren
                                label={{ htmlFor: 'category_id', name: 'Catégorie *' }}
                                field="category_id"
                                setData={setData}
                                initialSelectedItem={String(data.category_id)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}

function ImagesTabContent({ data, setData, processing }: FormTabContentProps<ProductForm>) {
    const maxSizeMB = 2
    const maxSize = maxSizeMB * 1024 * 1024
    const maxFiles = 6

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            getInputProps,
            removeFile
        },
    ] = useFileUpload({
        accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
        maxSize,
        multiple: true,
        maxFiles,
        initialFiles: data.images.map(img => ({
            id: String(img.id),
            name: img.alt_text || `image-${img.id}`,
            size: 0,
            type: '',
            url: img.image_url || '',
        })),
        onFilesAdded: (addedFiles) => {
            const newImages = addedFiles.map(fileWithPreview => {
                const imageUrl = fileWithPreview.preview || '';

                return {
                    id: null,
                    image_url: imageUrl,
                    image_file: fileWithPreview.file instanceof File ? fileWithPreview.file : null,
                    alt_text: fileWithPreview.file instanceof File ? fileWithPreview.file.name : '',
                    is_featured: false,
                };
            });

            setData('images', [...data.images, ...newImages]);
        }
    })

    const handleImageAltChange = (imageIndex: number, altTextValue: string) => {
        const newImages = [...data.images];
        newImages[imageIndex] = {...newImages[imageIndex], alt_text: altTextValue};
        setData('images', newImages);
    };

    const setFeaturedImage = (imageIndex: number) => {
        const newImages = data.images.map((img, index) => ({
            ...img,
            is_featured: index === imageIndex
        }));
        setData('images', newImages);
    }

    const removeImage = (imageIndex: number) => {
        const imageToRemove = data.images[imageIndex];
        const newImages = data.images.filter((_, index) => index !== imageIndex);

        if (imageToRemove && String(imageToRemove.id)) {
            removeFile(String(imageToRemove.id));
        }

        setData('images', newImages);
    }

    return (
        <TabsContent value="images" className="space-y-4">
            <Card className="border-border bg-card">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground">Images du produit</CardTitle>
                        <Button variant="outline" onClick={openFileDialog} type="button" tabIndex={1} disabled={processing}>
                            <Upload />
                            Ajouter des images
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <div
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            data-dragging={isDragging || undefined}
                            data-files={files.length > 0 || undefined}
                            className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
                        >
                            <input
                                {...getInputProps()}
                                className="sr-only"
                                aria-label="Upload image file"
                            />
                            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                <div
                                    className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                    aria-hidden="true"
                                >
                                    <ImageIcon className="size-4 opacity-60" />
                                </div>
                                <p className="mb-1.5 text-sm font-medium">
                                    Glissez-déposez vos images ici ou cliquez pour sélectionner
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                                </p>
                                <Button variant="outline" className="mt-4" onClick={openFileDialog} type="button" tabIndex={2} disabled={processing}>
                                    <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                                    Sélectionner des images
                                </Button>
                            </div>
                        </div>

                        {errors.length > 0 && (
                            <div
                                className="text-destructive flex items-center gap-1 text-xs"
                                role="alert"
                            >
                                <AlertCircleIcon className="size-3 shrink-0" />
                                <span>{errors[0]}</span>
                            </div>
                        )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {data.images.map((image, index) => (
                            <div key={index} className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
                                <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                                    <img src={getStorageUrl(image.image_url)} alt={image.alt_text} className="size-full object-cover" />
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="icon"
                                            onClick={() => setFeaturedImage(index)}
                                            className={
                                                image.is_featured
                                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                    : 'bg-background/80 hover:bg-background'
                                            }
                                        >
                                            <Star />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="icon"
                                            onClick={() => removeImage(index)}
                                            className="bg-red-500 text-white hover:bg-red-600"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                    {image.is_featured && (
                                        <Badge className="absolute bottom-2 left-2 bg-yellow-500 text-white rounded-sm">Image principale</Badge>
                                    )}
                                </div>
                                <div className="*:not-first:mt-2">
                                    <Label htmlFor={`alt_text-${index}`}>Texte alternatif</Label>
                                    <Input
                                        id={`alt_text-${index}`}
                                        value={image.alt_text}
                                        onChange={(e) => handleImageAltChange(index, e.target.value)}
                                        className="bg-background"
                                        placeholder="Produit - Vue de côté"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {data.images.length === 0 && (
                        <div className="py-8 text-center text-muted-foreground">
                            <Upload className="mx-auto mb-4 size-12 opacity-50" />
                            <p>Aucune image ajoutée</p>
                            <p className="text-sm">Cliquez sur "Ajouter des images" pour commencer</p>
                        </div>
                    )}

                    {data.images.length > 0 && (
                        <div className="bg-muted/50 rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-2">💡 Conseils pour vos images</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Utilisez des images de haute qualité (minimum 800x800px)</li>
                                <li>• Ajoutez des descriptions alternatives pour le SEO</li>
                                <li>• Montrez le produit sous différents angles</li>
                                <li>• Évitez les images floues ou mal éclairées</li>
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    );
}

function PricingTabContent({ data, setData }: FormTabContentProps<ProductForm>) {
    return (
        <TabsContent value="pricing" className="space-y-4">
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-foreground">Tarification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <NumberField
                            defaultValue={data.price}
                            formatOptions={{
                                style: "currency",
                                currency: "EUR",
                                currencySign: "accounting",
                            }}
                            onChange={(value) => setData('price', value)}
                        >
                            <div className="*:not-first:mt-2">
                                <AriaLabel className="text-foreground text-sm font-medium">
                                    Prix de vente (€) *
                                </AriaLabel>
                                <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                    <AriaInput className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums" />
                                    <div className="flex h-[calc(100%+2px)] flex-col">
                                        <AriaButton
                                            slot="increment"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronUpIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                        <AriaButton
                                            slot="decrement"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronDownIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                    </div>
                                </Group>
                            </div>
                        </NumberField>
                        <NumberField
                            defaultValue={data.discount_price ?? 0}
                            formatOptions={{
                                style: "currency",
                                currency: "EUR",
                                currencySign: "accounting",
                            }}
                            onChange={(value) => setData('discount_price', value)}
                        >
                            <div className="*:not-first:mt-2">
                                <AriaLabel className="text-foreground text-sm font-medium">
                                    Prix promotionnel (€)
                                </AriaLabel>
                                <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                    <AriaInput className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums" />
                                    <div className="flex h-[calc(100%+2px)] flex-col">
                                        <AriaButton
                                            slot="increment"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronUpIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                        <AriaButton
                                            slot="decrement"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronDownIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                    </div>
                                </Group>
                            </div>
                        </NumberField>
                        <NumberField
                            defaultValue={data.cost_price ?? 0}
                            formatOptions={{
                                style: "currency",
                                currency: "EUR",
                                currencySign: "accounting",
                            }}
                            onChange={(value) => setData('cost_price', value)}
                        >
                            <div className="*:not-first:mt-2">
                                <AriaLabel className="text-foreground text-sm font-medium">
                                    Prix coûtant (€) *
                                </AriaLabel>
                                <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                    <AriaInput className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums" />
                                    <div className="flex h-[calc(100%+2px)] flex-col">
                                        <AriaButton
                                            slot="increment"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronUpIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                        <AriaButton
                                            slot="decrement"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronDownIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                    </div>
                                </Group>
                            </div>
                        </NumberField>
                        <div className="*:not-first:mt-2">
                            <Label>Marge calculée</Label>
                            <div className="p-3 bg-muted rounded-md">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Marge:</span>
                                    <span className="font-semibold text-green-500">{calculateMargin(data.cost_price, data.discount_price ?? data.price)}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Profit:</span>
                                    <span className="font-semibold text-green-500">€{calculateProfit(data.cost_price, data.discount_price ?? data.price)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

function InventoryTabContent({ data, setData }: FormTabContentProps<ProductForm>) {
    return (
        <TabsContent value="inventory" className="space-y-4">
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-foreground">Gestion des stocks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <NumberField
                            defaultValue={data.stock}
                            onChange={(value) => setData('stock', value)}
                        >
                            <div className="*:not-first:mt-2">
                                <AriaLabel className="text-foreground text-sm font-medium">
                                    Stock actuel *
                                </AriaLabel>
                                <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                    <AriaInput className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums" />
                                    <div className="flex h-[calc(100%+2px)] flex-col">
                                        <AriaButton
                                            slot="increment"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronUpIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                        <AriaButton
                                            slot="decrement"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronDownIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                    </div>
                                </Group>
                            </div>
                        </NumberField>
                        <NumberField
                            defaultValue={data.reorder_level}
                            onChange={(value) => setData('reorder_level', value)}
                        >
                            <div className="*:not-first:mt-2">
                                <AriaLabel className="text-foreground text-sm font-medium">
                                    Seuil de réapprovisionnement *
                                </AriaLabel>
                                <Group className="border-input doutline-none data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                    <AriaInput className="bg-background text-foreground flex-1 px-3 py-2 tabular-nums" />
                                    <div className="flex h-[calc(100%+2px)] flex-col">
                                        <AriaButton
                                            slot="increment"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronUpIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                        <AriaButton
                                            slot="decrement"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <ChevronDownIcon size={12} aria-hidden="true" />
                                        </AriaButton>
                                    </div>
                                </Group>
                            </div>
                        </NumberField>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

function SeoTabContent({ data, setData, processing }: FormTabContentProps<ProductForm>) {
    return (
        <TabsContent value="seo" className="space-y-4">
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-foreground">Optimisation SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="*:not-first:mt-2">
                        <Label htmlFor="meta_title">Titre Meta</Label>
                        <Input
                            id="meta_title"
                            tabIndex={1}
                            disabled={processing}
                            value={data.meta_title ?? ''}
                            onChange={(e) => setData('meta_title', e.target.value)}
                            type="text"
                            placeholder="Titre pour les moteurs de recherche"
                        />
                        <p className="text-xs text-muted-foreground">
                            {data.meta_title ? data.meta_title.length : 0}/60 caractères recommandés
                        </p>
                    </div>
                    <div className="*:not-first:mt-2">
                        <Label htmlFor="meta_description">Description Meta</Label>
                        <Textarea
                            id="meta_description"
                            tabIndex={2}
                            disabled={processing}
                            value={data.meta_description ?? ''}
                            onChange={(e) => setData('meta_description', e.target.value)}
                            placeholder="Description pour les moteurs de recherche"
                            rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                            {data.meta_description ? data.meta_description.length : 0}/160 caractères recommandés
                        </p>
                    </div>
                    <div className="*:not-first:mt-2">
                        <Label htmlFor="meta_keywords">Mots-clés</Label>
                        <Input
                            id="meta_keywords"
                            tabIndex={3}
                            disabled={processing}
                            value={data.meta_keywords ?? ''}
                            onChange={(e) => setData('meta_keywords', e.target.value)}
                            placeholder="mot-clé1, mot-clé2, mot-clé3"
                        />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}
