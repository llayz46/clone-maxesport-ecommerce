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
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'brand_id' => BrandResource::make($this->whenLoaded('brand')),
            'category_id' => CategoryResource::make($this->whenLoaded('category')),
        ];
    }
}
