<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', AdminController::class)->name('dashboard');

    Route::resource('categories', CategoryController::class)
        ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('brands', BrandController::class)
        ->only(['index', 'store', 'destroy']);
    Route::post('brands/{brand}', [BrandController::class, 'update'])
        ->name('brands.update');
});
