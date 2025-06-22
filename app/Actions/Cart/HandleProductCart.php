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

    public function clear($cart = null)
    {
        ($cart ?: CartFactory::make())->items()->delete();

        CartCache::forget();
    }

    public function increase($productId, $cart = null)
    {
        $item = ($cart ?: CartFactory::make())->items->first(function ($cartItem) use ($productId) {
            return $cartItem->product_id === $productId;
        });

        $item?->increment('quantity');

        CartCache::forget();
    }

    public function decrease($productId, $cart = null)
    {
        $item = ($cart ?: CartFactory::make())->items->first(function ($cartItem) use ($productId) {
            return $cartItem->product_id === $productId;
        });

        if ($item && $item->quantity > 1) {
            $item->decrement('quantity');
        } else {
            $item?->delete();
        }

        CartCache::forget();
    }
}
