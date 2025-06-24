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
            'slug' => $this->slug,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'price' => $this->getPrice,
            'discount_price' => $this->discount_price,
            'stock' => $this->stock,
            'isNew' => $this->created_at->diffInDays(now()) <= 7,
            'isWishlisted' => $this->whenLoaded('wishlists', function () {
                return $this->wishlists->isNotEmpty();
            }),
            'brand' => BrandResource::make($this->whenLoaded('brand')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'group' => ProductGroupResource::make($this->whenLoaded('group')),
            'featured_image' => ProductImageResource::make($this->whenLoaded('featuredImage')),
            'images' => ProductImageResource::collection($this->whenLoaded('images'))
        ];
    }
}
