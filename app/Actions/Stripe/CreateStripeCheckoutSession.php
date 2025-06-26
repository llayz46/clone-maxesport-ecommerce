<?php

namespace App\Actions\Stripe;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Database\Eloquent\Collection;

class CreateStripeCheckoutSession
{
    public function createSessionFromCart(Cart $cart)
    {
        return $cart->user
            ->allowPromotionCodes()
            ->checkout(
                $this->formatCartItems($cart->items),
                [
                    'customer_update' => [
                        'shipping' => 'auto'
                    ],
                    'shipping_address_collection' => [
                        'allowed_countries' => ['FR', 'BE'],
                    ],
                    'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                    'metadata' => [
                        'user_id' => $cart->user->id,
                        'cart_id' => $cart->id,
                    ],
                ]
            );
    }

    private function formatCartItems(Collection $items)
    {
        return $items->loadMissing('product.brand')->map(function (CartItem $item) {
            return [
                'price_data' => [
                    'currency' => 'EUR',
                    'unit_amount' => (int) ($item->product->getPrice * 100),
                    'product_data' => [
                        'name' => $item->product->brand->name . ' ' . $item->product->name,
                        'description' => $item->product->short_description,
                        'metadata' => [
                            'product_id' => $item->product->id
                        ],
                    ],
                ],
                'quantity' => $item->quantity,
            ];
        })->toArray();
    }
}
