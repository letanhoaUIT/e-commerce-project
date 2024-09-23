<?php

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\VariantController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Mail\OrderConfirmationMail;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\StatisticsController;

// Lấy thông tin user hiện tại sau khi đã xác thực
Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');

// Route để cập nhật email
Route::put('/user/update-email', [UserController::class, 'updateEmail'])->middleware('auth:sanctum');

// Route để cập nhật mật khẩu
Route::put('/user/update-password', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');
// Định nghĩa các API resource routes cho các model
Route::apiResource('products', ProductController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('order-items', OrderItemController::class);

// Route để lấy các bình luận của một sản phẩm
Route::get('products/{productId}/comments', [CommentController::class, 'index']);
Route::post('products/{productId}/comments', [CommentController::class, 'store']);
Route::apiResource('comments', CommentController::class)->except(['index', 'store']);

// Lấy sản phẩm theo category
Route::get('categories/{categoryId}/products', [CategoryController::class, 'get_products_by_category']);

// Lấy các variants của một sản phẩm
Route::get('products/{productId}/variants', [VariantController::class, 'index']);

// Thêm sản phẩm vào giỏ hàng
Route::post('add-to-cart', [CartItemController::class, 'add_item_to_cart']);
Route::get('cart-items', [CartItemController::class, 'get_cart_items']);

// Tăng giảm số lượng sản phẩm trong giỏ hàng
Route::put('cart-items/increase/{id}', [CartItemController::class, 'increaseQuantity']);
Route::put('cart-items/decrease/{id}', [CartItemController::class, 'decreaseQuantity']);

// Xóa sản phẩm khỏi giỏ hàng
Route::delete('cart-items/remove/{id}', [CartItemController::class, 'destroy']);

// Lấy danh sách sản phẩm tùy chỉnh và tạo sản phẩm mới
Route::get('get-list-products', [ProductController::class, 'list']);
Route::post('create-new-product', [ProductController::class, 'create_new_product']);

// Tìm người dùng theo email và password
Route::get('users/{email}/{password}', [UserController::class, 'findUserByEmailAndPassword']);

Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
  Route::get('show-list-product', [ProductController::class, 'list']);
});

Route::get('get-product/{id}', [ProductController::class, 'get_product_information']);

Route::post('create-new-product', [ProductController::class, 'create_new_product']);
Route::post('update-product/{id}', [ProductController::class, 'update_product']);
Route::delete('delete-product/{id}', [ProductController::class, 'destroy']);

// Verify email
Route::post('/users/{id}/verify-email', [UserController::class, 'verifyEmail']);

// Verify password
Route::post('/users/{id}/verify-password', [UserController::class, 'verifyPassword']);
Route::post('/send-order-confirmation', [OrderController::class, 'sendOrderConfirmation']);

Route::post('/google-login', [UserController::class, 'googleLogin']);

//Lấy dữ liệu thống kê
Route::get('/statistics', [StatisticsController::class, 'getStatistics']);
Route::get('orders/{orderId}/items', [OrderItemController::class, 'getOrderItemsByOrderId']);

Route::post('authenticate', [UserController::class, 'authenticate']);

// Đếm số biến thể (variant)
Route::get('/products-with-variant-count', [ProductController::class, 'getProductsWithVariantCount']);
// Manage user
Route::get('/list-users', [UserController::class, 'listUsers']);
Route::get('/get-user/{id}', [UserController::class, 'show']);
Route::put('/update-user/{id}', [UserController::class, 'update']);
Route::delete('/delete-user/{id}', [UserController::class, 'destroy']);

// Đếm số biến thể (variant)
Route::get('/products-with-variant-count', [ProductController::class, 'getProductsWithVariantCount']);
// manage categories
Route::get('/all-categories', [CategoryController::class, 'getAllCategories']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// api.php
Route::get('orders', [OrderController::class, 'index']);
