<?php

use App\Models\Product;
use App\Models\ProductGroup;

it('can create a product group', function () {
    $productGroup = ProductGroup::factory()->create([
        'name' => 'Electronics',
        'slug' => 'electronics',
        'description' => 'All electronic products',
    ]);

    expect($productGroup)->toBeInstanceOf(ProductGroup::class)
        ->and($productGroup->name)->toBe('Electronics')
        ->and($productGroup->slug)->toBe('electronics')
        ->and($productGroup->description)->toBe('All electronic products');
});

it('can retrieve a product group by its slug', function () {
    $productGroup = ProductGroup::factory()->create([
        'name' => 'Home Appliances',
        'slug' => 'home-appliances',
    ]);

    $retrievedGroup = ProductGroup::where('slug', $productGroup->slug)->first();

    expect($retrievedGroup)->toBeInstanceOf(ProductGroup::class)
        ->and($retrievedGroup->id)->toBe($productGroup->id);
});

it('can delete a product group', function () {
    $productGroup = ProductGroup::factory()->create();

    $productGroup->delete();

    expect(ProductGroup::find($productGroup->id))->toBeNull();
});

it('deletes associated products when deleted', function () {
    $productGroup = ProductGroup::factory()->create();
    $product = Product::factory()->create(['product_group_id' => $productGroup->id]);

    $productGroup->delete();

    expect(Product::find($product->id))->toBeNull();
});

it('can have products associated with it', function () {
    $productGroup = ProductGroup::factory()->create();
    $product1 = Product::factory()->create(['product_group_id' => $productGroup->id]);
    $product2 = Product::factory()->create(['product_group_id' => $productGroup->id]);

    expect($productGroup->products)
        ->toBeInstanceOf(\Illuminate\Database\Eloquent\Collection::class)
        ->and($productGroup->products->count())->toBe(2)
        ->and($productGroup->products->contains($product1))->toBeTrue()
        ->and($productGroup->products->contains($product2))->toBeTrue()
        ->and($product1->group->id)->toBe($productGroup->id);
});

it('can retrieve products associated with it', function () {
    $productGroup = ProductGroup::factory()->create();
    $product1 = Product::factory()->create(['product_group_id' => $productGroup->id]);
    $product2 = Product::factory()->create(['product_group_id' => $productGroup->id]);

    $products = $productGroup->products;

    expect($products)->toBeInstanceOf(\Illuminate\Database\Eloquent\Collection::class)
        ->and($products->count())->toBe(2)
        ->and($products->contains($product1))->toBeTrue()
        ->and($products->contains($product2))->toBeTrue();
});

it('can retrieve the primary product', function () {
    $productGroup = ProductGroup::factory()->create();
    $primaryProduct = Product::factory()->create([
        'product_group_id' => $productGroup->id,
        'is_primary' => true,
    ]);
    Product::factory()->create([
        'product_group_id' => $productGroup->id,
        'is_primary' => false,
    ]);

    expect($productGroup->primaryProduct)->toBeInstanceOf(Product::class)
        ->and($productGroup->primaryProduct->id)->toBe($primaryProduct->id);
});
