<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Product::with(['featuredImage', 'brand'])
            ->whereNotNull('discount_price');
        $in = $request->boolean('in');
        $out = $request->boolean('out');

        if ($query->count() === 0) {
            return redirect()->route('home')->withErrors('Aucune promotion n\'est actuellement disponible.');
        }

        if ($in && !$out) {
            $query->where('stock', '>', 0);
        } elseif (!$in && $out) {
            $query->where('stock', '=', 0);
        }

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

        return Inertia::render('promotions/show', [
            'products' => fn() => ProductResource::collection($query->paginate(12)),
            'stock' => [
                'in' => $in,
                'out' => $out,
            ],
        ]);
    }
}
