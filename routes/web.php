<?php

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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
