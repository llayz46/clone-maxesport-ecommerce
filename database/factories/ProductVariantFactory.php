<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ProductVariantFactory extends Factory
{
    protected $model = ProductVariant::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'attributes' => json_encode([
                'color' => $this->faker->colorName(),
                'size' => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
            ]),
            'price_override' => $this->faker->randomFloat(),
            'stock' => $this->faker->randomNumber(),
            'product_id' => Product::factory(),
        ];
    }
}
