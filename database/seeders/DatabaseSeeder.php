<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
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
            'Razer',
            'Corsair',
            'Asus',
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
            'password' => bcrypt('test'),
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
                    'parent_id' => $menu->id,
                ]);
            }
        }

        foreach ($brands as $brand) {
            $brand = Brand::factory()->create([
                'name' => $brand,
                'slug' => Str::slug($brand),
            ]);

            $product = Product::factory()->create([
                'brand_id' => $brand->id,
                'category_id' => Category::inRandomOrder()->first()->id,
            ]);

            ProductVariant::factory()
                ->count(rand(1, 3))
                ->create([
                    'product_id' => $product->id,
                ]);

            ProductImage::factory()
                ->count(rand(1, 5))
                ->create([
                    'product_id' => $product->id,
                ]);
        }

        $categoryTapisDeSouris = Category::where('name', 'Tapis de Souris')->first();

        $laOnda = Brand::create([
            'name' => 'La Onda',
            'slug' => 'la-onda',
        ]);

        $lethalGamingGear = Brand::create([
            'name' => 'Lethal Gaming Gear',
            'slug' => 'lethal-gaming-gear',
        ]);

        $moldenEdge = Product::create([
            'name' => 'Molden Edge Mousepad',
            'slug' => 'molden-edge-mousepad',
            'description' => 'Conçu pour un ressenti pûrement orienté contrôle, ce La Onda QCW correspondra à tes besoins si tu recherches un tapis avec un bon contrôle, une friction parfaite pour les flickshots et un confort parfait avec ses bords rembourrés et cousus sous la surface !',
            'short_description' => 'Un tapis de souris haut de gamme pour les gamers exigeants.',
            'brand_id' => $laOnda->id,
            'category_id' => $categoryTapisDeSouris->id,
        ]);

        ProductVariant::create([
            'product_id' => $moldenEdge->id,
            'name' => 'SR',
            'sku' => 'SR-5874514',
            'price' => 54.90,
            'discount_price' => null,
            'stock' => 100,
        ]);

        ProductVariant::create([
            'product_id' => $moldenEdge->id,
            'name' => 'QCW',
            'sku' => 'QCW-6378714',
            'price' => 54.90,
            'discount_price' => null,
            'stock' => 89,
        ]);

        ProductImage::factory(4)->create([
            'product_id' => $moldenEdge->id,
        ]);

        $saturnPro = Product::create([
            'name' => 'Saturn Pro Soft',
            'slug' => 'saturn-pro-soft',
            'description' => 'Lethal Gaming Gear renforce sa base solide avec le Saturn Pro, une amélioration du Saturn, tant sur la glisse que sur la matière antidérapante, pour une glisse lente et contrôlée avec la Base SlimFlex en PORON® japonais XSoft !',
            'short_description' => 'Un tapis de souris haut de gamme pour les gamers exigeants.',
            'brand_id' => $lethalGamingGear->id,
            'category_id' => $categoryTapisDeSouris->id,
        ]);

        ProductVariant::create([
            'product_id' => $saturnPro->id,
            'name' => 'XL Square',
            'sku' => 'XL-Square-1234567',
            'price' => 54.90,
            'discount_price' => null,
            'stock' => 50,
        ]);

        ProductVariant::create([
            'product_id' => $saturnPro->id,
            'name' => 'L',
            'sku' => 'L-7654321',
            'price' => 44.90,
            'discount_price' => null,
            'stock' => 75,
        ]);

        ProductImage::factory(4)->create([
            'product_id' => $saturnPro->id,
        ]);

        $jupiterPro = Product::create([
            'name' => 'Jupiter Pro Firm',
            'slug' => 'jupiter-pro-firm',
            'description' => 'Le contrôle et le confort du tapis Jupiter de chez LGG, dans une version Pro, en XL Square, avec une base en Poron Slimflex Firm et une surface en tissu lisse et douce conçue pour un contrôle absolu, et avec des bords cousus sous la surface confortables !',
            'short_description' => 'Un tapis de souris haut de gamme pour les gamers exigeants.',
            'brand_id' => $lethalGamingGear->id,
            'category_id' => $categoryTapisDeSouris->id,
        ]);

        ProductVariant::create([
            'product_id' => $jupiterPro->id,
            'name' => 'XL Square',
            'sku' => 'XL-Square-7654321',
            'price' => 54.90,
            'discount_price' => null,
            'stock' => 50,
        ]);

        ProductImage::factory(4)->create([
            'product_id' => $jupiterPro->id,
        ]);
    }
}
