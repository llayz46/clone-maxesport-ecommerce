<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductGroup;
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

        $categoryTapisDeSouris = Category::where('name', 'Tapis de Souris')->first();

        $laOnda = Brand::create([
            'name' => 'La Onda',
            'slug' => 'la-onda',
        ]);

        $lethalGamingGear = Brand::create([
            'name' => 'Lethal Gaming Gear',
            'slug' => 'lethal-gaming-gear',
        ]);

        $moldenEdgeGroup = ProductGroup::factory()->create([
            'name' => 'Molden Edge',
            'slug' => 'molden-edge',
        ]);

        $sr = Product::create([
            'name' => 'SR SQ',
            'slug' => 'sr-sq',
            'description' => 'Conçu avec une surface en tissu texturée, offrant un maximum de contrôle, ce La Onda SR place dans la gamme des tapis de souris Control, pour un ressenti unique, laissant une bonne liberté de mouvement, et un bon contrôle avec une friction permettant tout de même de bons flickshots grâce à son pouvoir d’arrêt. Il est également équipé de la base en PU signature La Onda, et de leur nouvelle technique de couture pour les bords, permettant un meilleur confort grâce à des coutures sous le tapis, ainsi que des bords rembourrés !',
            'short_description' => 'Un tapis de souris haut de gamme pour les gamers exigeants.',
            'price' => 54.90,
            'discount_price' => null,
            'stock' => 100,
            'brand_id' => $laOnda->id,
            'product_group_id' => $moldenEdgeGroup->id,
        ]);

        $sr->categories()->attach($categoryTapisDeSouris->id);

        ProductImage::factory(3)->create([
            'product_id' => $sr->id,
        ]);
        ProductImage::factory()->create([
            'product_id' => $sr->id,
            'is_featured' => true,
        ]);

        $qcw = Product::create([
            'name' => 'QCW SQ',
            'slug' => 'qcw-sq',
            'description' => 'Conçu avec une surface en tissu micro tissée balanced, mais laissant tout de même du contrôle, ce La Onda QCW se place entre un tapis de souris Balanced et un tapis de souris Control, pour un ressenti unique, laissant une très bonne liberté de mouvement, et un bon contrôle. Il est également équipé de la base en PU signature La Onda, et de leur nouvelle technique de couture pour les bords, permettant un meilleur confort grâce à des coutures sous le tapis, ainsi que des bords rembourrés !',
            'short_description' => 'Un tapis de souris haut de gamme pour les gamers exigeants.',
            'price' => 54.90,
            'discount_price' => 52.00,
            'stock' => 100,
            'brand_id' => $laOnda->id,
            'product_group_id' => $moldenEdgeGroup->id,
        ]);

        $qcw->categories()->attach($categoryTapisDeSouris->id);

        ProductImage::factory(3)->create([
            'product_id' => $qcw->id,
        ]);
        ProductImage::factory()->create([
            'product_id' => $qcw->id,
            'is_featured' => true,
        ]);

        $saturnProGroup = ProductGroup::factory()->create([
            'name' => 'Saturn Pro',
            'slug' => 'saturn-pro',
        ]);

        $saturnProSoftXlSquareRouge = Product::create([
            'name' => 'Saturn Pro Soft XL Square Rouge',
            'slug' => 'saturn-pro-soft-xl-square-rouge',
            'description' => 'Le Saturn Pro est une amélioration du Saturn classique de chez Lethal Gaming Gear, tu y retrouveras une base Soft nouvelle génération te conférant un meilleur pouvoir d’arrêt sur ta souris lorsque que tu l’appuies sur le tapis, sans pour autant détériorer la glisse ! Tu y retrouveras bien sur la Base SlimFlex en PORON® japonais en caoutchouc qui empêchera ton tapis de bouger pendant tes sessions de jeu, et les bords extra fins qui ne te gèneront plus !',
            'short_description' => 'Un tapis de souris haut de gamme pour les gamers exigeants.',
            'price' => 64.90,
            'discount_price' => null,
            'stock' => 100,
            'brand_id' => $lethalGamingGear->id,
            'product_group_id' => $saturnProGroup->id,
        ]);
        $saturnProSoftXlSquareRouge->categories()->attach($categoryTapisDeSouris->id);

        ProductImage::factory(3)->create([
            'product_id' => $saturnProSoftXlSquareRouge->id,
        ]);
        ProductImage::factory()->create([
            'product_id' => $saturnProSoftXlSquareRouge->id,
            'is_featured' => true,
        ]);

        $saturnProSoftXlSquareNoir = Product::create([
            'name' => 'Saturn Pro Soft XL Square Noir',
            'slug' => 'saturn-pro-soft-xl-square-noir',
            'description' => 'Le Saturn Pro est une amélioration du Saturn classique de chez Lethal Gaming Gear, tu y retrouveras une base Soft nouvelle génération te conférant un meilleur pouvoir d’arrêt sur ta souris lorsque que tu l’appuies sur le tapis, sans pour autant détériorer la glisse ! Tu y retrouveras bien sur la Base SlimFlex en PORON® japonais en caoutchouc qui empêchera ton tapis de bouger pendant tes sessions de jeu, et les bords extra fins qui ne te gèneront plus !',
            'short_description' => 'Un tapis de souris haut de gamme pour les gamers exigeants.',
            'price' => 64.90,
            'discount_price' => null,
            'stock' => 100,
            'brand_id' => $lethalGamingGear->id,
            'product_group_id' => $saturnProGroup->id,
        ]);
        $saturnProSoftXlSquareNoir->categories()->attach($categoryTapisDeSouris->id);

        ProductImage::factory(3)->create([
            'product_id' => $saturnProSoftXlSquareNoir->id,
        ]);
        ProductImage::factory()->create([
            'product_id' => $saturnProSoftXlSquareNoir->id,
            'is_featured' => true,
        ]);

        $categoryTapisDeSouris->products()->attach(Product::factory(37)->create([
            'brand_id' => fn() => Brand::inRandomOrder()->first()->id,
        ]));
    }
}
