<?php

namespace App\Actions\Cart;

use App\Factories\CartFactory;

class HandleProductCart
{
    public function add($productId, $quantity = 1, $cart = null)
    {
        ($cart ?: CartFactory::make())->items()->firstOrCreate([
            'product_id' => $productId,
        ], [
            'quantity' => 0,
        ])->increment('quantity', $quantity);

        CartCache::forget();
    }

    public function remove($productId, $cart = null)
    {
        $cart = $cart ?: CartFactory::make();

        $item = $cart->items->first(function ($cartItem) use ($productId) {
            return $cartItem->product_id === $productId;
        });

        $item->delete();

        CartCache::forget();
    }
}
