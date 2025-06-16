<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariant>
 */
class ProductVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'name' => $this->faker->word(),
            'sku' => $this->faker->unique()->bothify('SKU-###??'),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'discount_price' => $this->faker->optional()->randomFloat(2, 5, 500),
            'stock' => $this->faker->numberBetween(0, 100)
        ];
    }
}
