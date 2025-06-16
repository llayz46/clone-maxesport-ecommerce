<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    /** @use HasFactory<\Database\Factories\ProductVariantFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'sku',
        'price',
        'discount_price',
        'stock',
    ];

    public function product(): belongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getPrice(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->discount_price ?? $this->price
        );
    }
}
