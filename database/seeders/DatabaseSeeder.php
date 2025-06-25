<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductGroup;
use App\Models\ProductImage;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $menus = [
            'Périphériques' => [
                'Souris',
                'Tapis de Souris',
                'Claviers',
                'Casques'
            ],
            'PC & Écrans' => [
                'PC Gamers',
                'Écrans',
            ],
            'Sièges & Bureaux' => [
                'Sièges Gamers',
                'Bureaux',
                'Sièges Ergonomiques',
                'Bureaux Assis Debout',
            ],
        ];

        $brands = [
            'Logitech',
            'Corsair',
            'Asus',
            'Razer',
            'MSI',
            'SteelSeries',
            'AOC',
            'Samsung',
            'Secretlab',
            'Herman Miller',
            'Pulsar'
        ];

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.fr',
            'password' => bcrypt('testtest'),
        ]);

        foreach ($menus as $menu => $menuItems) {
            $menu = Category::factory()->create([
                'name' => $menu,
                'slug' => Str::slug($menu),
            ]);

            foreach ($menuItems as $menuItem) {
                Category::factory()->create([
                    'name' => $menuItem,
                    'slug' => Str::slug($menuItem),
                    'parent_id' => $menu,
                ]);
            }
        }

        foreach ($brands as $brand) {
            $brand = Brand::factory()->create([
                'name' => $brand,
                'slug' => Str::slug($brand),
            ]);

            $product = Product::factory()->create([
                'brand_id' => $brand->id
            ]);
            $product->categories()->attach(Category::inRandomOrder()->take(rand(1, 3))->pluck('id'));

            ProductImage::factory()
                ->count(rand(1, 5))
                ->create([
                    'product_id' => $product->id,
                ]);
        }

        $this->call(ProductSeeder::class);
    }
}
