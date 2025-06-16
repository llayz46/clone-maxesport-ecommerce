<?php

use App\Models\ProductVariant;
use App\Models\Product;

it('can create a product variant associate to a product', function () {
    $product = Product::factory()->create();
    $productVariant = ProductVariant::factory()->create([
        'product_id' => $product->id,
    ]);

    expect($productVariant)->toBeInstanceOf(ProductVariant::class)
        ->and($productVariant->product_id)->toBe($product->id);
});

it('give the correct discounted price when discount_price is set', function () {
    $productVariant = ProductVariant::factory()->create([
        'price' => 100.00,
        'discount_price' => 80.00,
    ]);

    expect($productVariant->getPrice)->toBe(80.00);
});

it('give the correct price when discount_price is not set', function () {
    $productVariant = ProductVariant::factory()->create([
        'price' => 100.00,
        'discount_price' => null,
    ]);

    expect($productVariant->getPrice)->toBe(100.00);
});

it('can retrieve the associated product', function () {
    $product = Product::factory()->create();
    $productVariant = ProductVariant::factory()->create([
        'product_id' => $product->id,
    ]);

    expect($productVariant->product)->toBeInstanceOf(Product::class)
        ->and($productVariant->product->id)->toBe($product->id);
});
