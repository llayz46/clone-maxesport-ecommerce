<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = BrandResource::collection(Brand::paginate(12));

        return Inertia::render('brands/index', [
            'brands' => fn () => $brands,
        ]);
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
    public function show(Brand $brand, Request $request)
    {
        $sort = $request->query('sort', 'news');

        $query = $brand->products()->with(['featuredImage', 'brand']);

        switch ($sort) {
            case 'price_asc':
                $query->orderByRaw('COALESCE(discount_price, price) ASC');
                break;
            case 'price_desc':
                $query->orderByRaw('COALESCE(discount_price, price) DESC');
                break;
            case 'news':
            default:
                $query->latest();
                break;
        }

        return Inertia::render('brands/show', [
            'brand' => fn () => BrandResource::make($brand),
            'products' => fn () => ProductResource::collection($query->paginate(12)),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        //
    }
}
