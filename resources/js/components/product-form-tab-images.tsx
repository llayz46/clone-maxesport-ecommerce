import { useFileUpload } from '@/hooks/use-file-upload';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircleIcon, ImageIcon, Star, Trash2, Upload, UploadIcon } from 'lucide-react';
import { getStorageUrl } from '@/utils/format-storage-url';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormTabContentProps, ProductForm } from '@/types';

export function ImagesTabContent({ data, setData, processing }: FormTabContentProps<ProductForm>) {
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
        accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/webp,image/gif",
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
                                    SVG, PNG, JPG, WEBP ou GIF (max. {maxSizeMB}MB)
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
