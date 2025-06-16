<?php

use App\Models\Category;

test('a category can be created', function () {
    $category = Category::factory()->create();

    expect($category)->toBeInstanceOf(Category::class);
});

test('a category can have a parent category', function () {
    $parentCategory = Category::factory()->create();
    $childCategory = Category::factory()->create();

    $childCategory->parent()->associate($parentCategory);

    expect($childCategory->parent)->toBeInstanceOf(Category::class)
        ->and($childCategory->parent->id)->toBe($parentCategory->id);
});

test('a children category can dissociate its parent', function () {
    $parentCategory = Category::factory()->create();
    $childCategory = Category::factory()->create(['parent_id' => $parentCategory->id]);

    $childCategory->parent()->dissociate();

    expect($childCategory->parent_id)->toBeNull();
});

test('a parent category can dissociate its children', function () {
    $parentCategory = Category::factory()->create();
    Category::factory()->create(['parent_id' => $parentCategory->id]);

    $parentCategory->children()->delete();

    expect($parentCategory->children)->toBeEmpty();
});

test('a category can have multiple children', function () {
    $parentCategory = Category::factory()->create();
    $childCategory1 = Category::factory()->create(['parent_id' => $parentCategory->id]);
    $childCategory2 = Category::factory()->create(['parent_id' => $parentCategory->id]);

    expect($parentCategory->children)->toHaveCount(2)
        ->and($parentCategory->children->contains($childCategory1))->toBeTrue()
        ->and($parentCategory->children->contains($childCategory2))->toBeTrue();
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
