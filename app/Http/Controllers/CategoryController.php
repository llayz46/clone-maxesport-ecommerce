<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
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
    public function show(Category $category, Request $request)
    {
        $sort = $request->query('sort', 'news');

        $query = $category->products()->with(['images', 'brand']);

        switch ($sort) {
            case 'price_asc':
                $query->orderByRaw('COALESCE(discount_price, price) ASC');
                break;
            case 'price_desc':
                $query->orderByRaw('COALESCE(discount_price, price) DESC');
                break;
            case 'news':
            default:
                $query->latest(); // Tri par date de création décroissante
                break;
        }

        return Inertia::render('categories/show', [
            'category' => CategoryResource::make($category->load('parent')),
            'data' => ProductResource::collection($query->paginate(12)),
            'sort' => $sort,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}

