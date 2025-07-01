<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', AdminController::class)->name('dashboard');

    Route::resource('categories', CategoryController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names([
            'index' => 'categories.index',
            'store' => 'categories.store',
            'update' => 'categories.update',
            'destroy' => 'categories.destroy',
        ]);

    Route::resource('brands', BrandController::class)
        ->only(['index', 'store', 'destroy']);

    //    Route::resource('products', 'ProductController');
//    Route::resource('categories', 'CategoryController');
//    Route::resource('orders', 'OrderController');
//    Route::resource('users', 'UserController');
});
