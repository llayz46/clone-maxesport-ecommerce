<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Product */
class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'sku' => $this->sku,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->short_description,

            'price' => $this->price,
            'discount_price' => $this->discount_price,
            'stock' => $this->stock,
            'status' => $this->status,

            $this->mergeWhen($request->routeIs('admin.products.*'), [
                'cost_price' => $this->cost_price,
                'reorder_level' => $this->reorder_level,
            ]),

            'isNew' => $this->created_at->diffInDays(now()) <= 7,
            'isWishlisted' => $this->whenLoaded('wishlists', function () {
                return $this->wishlists->isNotEmpty();
            }),
            'brand' => BrandResource::make($this->whenLoaded('brand')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'group' => ProductGroupResource::make($this->whenLoaded('group')),
            'featured_image' => ProductImageResource::make($this->whenLoaded('featuredImage')),
            'images' => ProductImageResource::collection($this->whenLoaded('images')),
            'updated_at' => $this->updated_at->locale('fr')->isoFormat('D MMMM Y à HH:mm:ss'),
            'created_at' => $this->created_at->locale('fr')->isoFormat('D MMMM Y à HH:mm:ss'),
        ];
    }
}
