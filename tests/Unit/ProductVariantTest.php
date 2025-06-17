<?php

use App\Models\Product;
use App\Models\ProductVariant;

it('can create a variant', function () {
    $product = Product::factory()->create();
    $variant = ProductVariant::factory()->create([
        'product_id' => $product->id,
        'name' => 'Variant 1',
        'price_override' => 1000,
    ]);

    expect($variant->product_id)->toBe($product->id)
        ->and($variant->name)->toBe('Variant 1')
        ->and($variant->price_override)->toBe(1000);
});

it('can retrieve a variant by its ID', function () {
    $product = Product::factory()->create();
    $variant = ProductVariant::factory()->create(['product_id' => $product->id]);

    $retrievedVariant = ProductVariant::find($variant->id);

    expect($retrievedVariant)->toBeInstanceOf(ProductVariant::class)
        ->and($retrievedVariant->id)->toBe($variant->id);
});

it('can be deleted', function () {
    $product = Product::factory()->create();
    $variant = ProductVariant::factory()->create(['product_id' => $product->id]);

    $variant->delete();

    expect(ProductVariant::find($variant->id))->toBeNull();
});

it('belongs to a product', function () {
    $product = Product::factory()->create();
    $variant = ProductVariant::factory()->create(['product_id' => $product->id]);

    expect($variant->product)->toBeInstanceOf(Product::class)
        ->and($variant->product->id)->toBe($product->id);
});
