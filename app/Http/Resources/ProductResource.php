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
            'is_primary' => $this->is_primary, // delete
            'price' => $this->getPrice,
            'discount_price' => $this->discount_price,
            'stock' => $this->stock,
            'isNew' => $this->created_at->diffInDays(now()) <= 7,
            'brand' => BrandResource::make($this->whenLoaded('brand')),
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'group' => ProductGroupResource::make($this->whenLoaded('group')),
            'images' => $this->whenLoaded('images'),
        ];
    }
}
