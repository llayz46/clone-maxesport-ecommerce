<?php

namespace App\Http\Resources;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Order */
class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
//            'stripe_checkout_session_id' => $this->stripe_checkout_session_id,
            'amount_discount' => $this->amount_discount,
            'items' => $this->whenLoaded('items'),
            'amount_total' => $this->amount_total,
//            'billing_address' => $this->billing_address,
//            'shipping_address' => $this->shipping_address,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
