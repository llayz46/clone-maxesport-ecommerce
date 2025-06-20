<?php

namespace App\Http\Controllers;

use App\Actions\Cart\HandleProductCart;
use App\Factories\CartFactory;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        return response()->json([
            'cart' => CartResource::make(CartFactory::make()->load('items.product')),
        ]);
    }

    public function addItem(Request $request, HandleProductCart $handleProductCart)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $handleProductCart->add(
            $request->product_id,
            $request->quantity ?? 1,
            $request->user()?->cart
        );

        return redirect()->back();
    }

    public function removeItem(Request $request, HandleProductCart $handleProductCart)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $handleProductCart->remove(
            $request->product_id,
            $request->user()?->cart
        );

        return redirect()->back();
    }

    public function destroy(Cart $cart)
    {
        $cart->items()->delete();

        return response()->json([
            'success' => true,
        ]);
    }
}
