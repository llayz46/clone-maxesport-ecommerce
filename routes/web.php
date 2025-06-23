<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::prefix('categories')->group(function () {
    Route::get('/{category:slug}', [CategoryController::class, 'show'])->name('category.show');
});

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/add', [CartController::class, 'addItem'])->name('cart.add');
    Route::post('/remove', [CartController::class, 'removeItem'])->name('cart.remove');
    Route::post('/clear/{cart}', [CartController::class, 'clear'])->name('cart.clear');
    Route::put('/update', [CartController::class, 'handleItemQuantity'])->name('cart.update');
});

Route::get('/brands', [BrandController::class, 'index'])->name('brands.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
