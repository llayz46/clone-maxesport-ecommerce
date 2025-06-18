<?php

namespace App\Http\Resources;

use App\Models\ProductGroup;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin ProductGroup */
class ProductGroupResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'products_count' => $this->products_count,

            'primaryProduct' => ProductResource::make($this->whenLoaded('primaryProduct')),
            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
