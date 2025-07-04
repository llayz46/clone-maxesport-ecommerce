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
    public function index(Request $request)
    {
        $search = $request->input('search');

        if ($search) {
            $products = Product::search($search)
                ->query(function ($query) {
                    $query->where('status', true)
                        ->with('featuredImage', 'brand');
                })->paginate(16)->withQueryString();
        } else {
            $query = Product::query()
                ->where('status', true)
                ->with('featuredImage', 'brand');

            $products = $query->paginate(16)->withQueryString();
        }

        return Inertia::render('products/index', [
            'search' => fn () => $search,
            'data' => fn () => ProductResource::collection($products)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        if(!$product->status) abort(404);

        $cacheKey = "product:{$product->id}:details";

        $productResource = Cache::remember($cacheKey, now()->addHour(), function () use ($product) {
            return ProductResource::make(
                $product->load([
                    'brand',
                    'group.products.featuredImage',
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
                            ->with('brand', 'featuredImage')
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
}
