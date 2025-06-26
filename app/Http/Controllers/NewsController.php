<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Product::with(['featuredImage', 'brand'])
            ->where('created_at', '>=', now()->subDays(7));

        $sort = $request->query('sort', 'news');

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

        return Inertia::render('news/show', [
            'products' => fn() => ProductResource::collection($query->paginate(12)),
        ]);
    }
}
