<?php

use App\Models\Product;
use Inertia\Testing\AssertableInertia;

test('show method uses cache for product details', function () {
    $product = Product::factory()->create();

    $this->get(route('product.show', $product))
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('products/show')
            ->has('product', fn (AssertableInertia $page) => $page
                ->where('id', $product->id)
                ->where('name', $product->name)
                ->etc()
            )
        );

    $cacheKey = "product:{$product->id}:details";
    $this->assertTrue(Cache::has($cacheKey));
});
