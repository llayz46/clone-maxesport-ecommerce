<?php

namespace App\Http\Controllers;

use App\Enums\CategoryStatus;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Category $category
     * @param Request $request
     * @return \Inertia\Response
     */
    public function __invoke(Category $category, Request $request)
    {
        if($category->status->value === CategoryStatus::Inactive->value) abort(404);

        $sort = $request->query('sort', 'news');
        $in = $request->boolean('in');
        $out = $request->boolean('out');

        $query = $category->products()->where('status', true)->with(['featuredImage', 'brand']);

        if ($in && !$out) {
            $query->where('stock', '>', 0);
        } elseif (!$in && $out) {
            $query->where('stock', '=', 0);
        }

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

        return Inertia::render('categories/show', [
            'category' => fn () => CategoryResource::make($category->load('parent')),
            'data' => fn () => ProductResource::collection($query->paginate(12)),
            'sort' => $sort,
            'stock' => [
                'in' => $in,
                'out' => $out,
            ],
        ]);
    }
}

