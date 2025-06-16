<?php

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;

it('can be created', function () {
    $product = Product::factory()->create();

    expect($product)->toBeInstanceOf(Product::class);
});

it('can be retrieved by its slug', function () {
    $product = Product::factory()->create();

    $retrievedProduct = Product::where('slug', $product->slug)->first();

    expect($retrievedProduct)->toBeInstanceOf(Product::class)
        ->and($retrievedProduct->id)->toBe($product->id);
});

it('can be deleted', function () {
    $product = Product::factory()->create();

    $product->delete();

    expect(Product::find($product->id))->toBeNull();
});

it('can belong to a category', function () {
    $product = Product::factory()->create();
    $category = \App\Models\Category::factory()->create();

    $product->category()->associate($category);

    expect($product)->toBeInstanceOf(Product::class)
        ->and($product->category_id)->toBe($category->id);
});

it('can belong to a brand', function () {
    $product = Product::factory()->create();
    $brand = \App\Models\Brand::factory()->create();

    $product->brand()->associate($brand);

    expect($product)->toBeInstanceOf(Product::class)
        ->and($product->brand_id)->toBe($brand->id);
});

it('can dissociate its category', function () {
    $product = Product::factory()->create();
    $category = \App\Models\Category::factory()->create();

    $product->category()->associate($category);
    $product->category()->dissociate();

    expect($product->category_id)->toBeNull();
});

it('can dissociate its brand', function () {
    $product = Product::factory()->create();
    $brand = \App\Models\Brand::factory()->create();

    $product->brand()->associate($brand);
    $product->brand()->dissociate();

    expect($product->brand_id)->toBeNull();
});

it('can have multiple variants', function () {
    $product = Product::factory()->create();
    $variant1 = ProductVariant::factory()->create(['product_id' => $product->id]);
    $variant2 = ProductVariant::factory()->create(['product_id' => $product->id]);

    expect($product->variants)->toHaveCount(2)
        ->and($product->variants->contains($variant1))->toBeTrue()
        ->and($product->variants->contains($variant2))->toBeTrue();
});

it('can have multiple images', function () {
    $product = Product::factory()->create();
    $image1 = ProductImage::factory()->create(['product_id' => $product->id]);
    $image2 = ProductImage::factory()->create(['product_id' => $product->id]);

    expect($product->images)->toHaveCount(2)
        ->and($product->images->contains($image1))->toBeTrue()
        ->and($product->images->contains($image2))->toBeTrue();
});

it('can dissociate its variants', function () {
    $product = Product::factory()->create();
    $variant = ProductVariant::factory()->create(['product_id' => $product->id]);

    $variant->product()->dissociate();

    expect($variant->product_id)->toBeNull();
});

it('can dissociate its images', function () {
    $product = Product::factory()->create();
    $image = ProductImage::factory()->create(['product_id' => $product->id]);

    $image->product()->dissociate();

    expect($image->product_id)->toBeNull();
});
