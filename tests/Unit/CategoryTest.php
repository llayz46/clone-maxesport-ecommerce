<?php

use App\Models\Category;

test('a category can be created', function () {
    $category = Category::factory()->create();

    expect($category)->toBeInstanceOf(Category::class);
});

test('a category can be retrieved by its slug', function () {
    $category = Category::factory()->create();

    $retrievedCategory = Category::where('slug', $category->slug)->first();

    expect($retrievedCategory)->toBeInstanceOf(Category::class)
        ->and($retrievedCategory->id)->toBe($category->id);
});

test('a category can be deleted', function () {
    $category = Category::factory()->create();

    $category->delete();

    expect(Category::find($category->id))->toBeNull();
});

test('a category need a unique slug to be created', function () {
    Category::factory()->create(['slug' => 'unique-slug']);

    expect(fn() => Category::factory()->create(['slug' => 'unique-slug']))
        ->toThrow(\Illuminate\Database\QueryException::class);
});

test('a category cannot be deleted if it has products', function () {
    $category = Category::factory()->create();
    \App\Models\Product::factory()->create(['category_id' => $category->id]);

    expect(fn() => $category->delete())
        ->toThrow(\Illuminate\Database\QueryException::class);
});
