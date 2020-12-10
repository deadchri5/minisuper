<?php
/*Import user controller*/

use App\Http\Controllers\Pruebas;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('pruebas/{num}', [Pruebas::class, 'testOrm']);

//User routes
Route::get('api/userTests', [UserController::class, 'test']);
Route::post('api/userRegister', [UserController::class, 'registerUser']);
Route::post('api/signIn', [UserController::class, 'signIn']);
Route::post('api/login', [UserController::class, 'login']);
Route::put('api/user/update', [UserController::class, 'updateUser']);
Route::get('api/user/getData', [UserController::class, 'getUserData']);

//Products routes
Route::get('api/products/show/{category?}', [ProductController::class, 'showProducts']);
Route::post('api/products/search', [ProductController::class, 'search']);
Route::put('api/products/insert', [ProductController::class, 'addProduct'])->middleware('checkPermissions');
Route::put('api/products/update', [ProductController::class, 'updateProduct'])->middleware('checkPermissions');
Route::delete('api/products/delete', [ProductController::class, 'deleteProduct'])->middleware('checkPermissions');