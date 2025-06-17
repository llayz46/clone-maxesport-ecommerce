<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\ProductGroup;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $name = $this->faker->word(),
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(),
            'short_description' => $this->faker->sentence(),
            'has_variant' => false,
            'is_primary' => $this->faker->boolean(),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'discount_price' => $this->faker->optional()->randomFloat(2, 5, 500),
            'stock' => $this->faker->numberBetween(0, 100),
            'brand_id' => Brand::factory(),
            'product_group_id' => null,
        ];
    }
}
