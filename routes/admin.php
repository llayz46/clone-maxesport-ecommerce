<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/', AdminController::class)->name('admin.dashboard');

    Route::get('/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

//    Route::resource('products', 'ProductController');
//    Route::resource('categories', 'CategoryController');
//    Route::resource('orders', 'OrderController');
//    Route::resource('users', 'UserController');
});
