<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $cacheKey = "product:{$product->id}:details";

        $productResource = Cache::remember($cacheKey, now()->addHour(), function () use ($product) {
            return ProductResource::make(
                $product->load([
                    'brand',
                    'group.products',
                    'images',
                    'categories'
                ])
            );
        });

        $similarProducts = Cache::remember("product:{$product->id}:similar", now()->addHour(), function () use ($product) {
            return ProductResource::collection(
                Category::find($product->categories->pluck('id'))
                    ->load(['products' => function ($query) use ($product) {
                        $query->where('id', '!=', $product->id)
                            ->orderBy('created_at', 'desc')
                            ->with('brand')
                            ->take(4);
                    }])
                    ->flatten()
            );
        });

        return Inertia::render('products/show', [
            'product' => fn () => $productResource,
            'similarProducts' => fn () => $similarProducts[0]->products,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
