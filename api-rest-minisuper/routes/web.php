<?php
/*Import user controller*/

use App\Http\Controllers\Pruebas;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('pruebas/{num}', [Pruebas::class, 'testOrm']);

//User controller routes
Route::get('api/userTests', [UserController::class, 'test']);
//Register user
Route::post('api/userRegister', [UserController::class, 'registerUser']);
//SignIn
Route::post('api/signIn', [UserController::class, 'signIn']);
//login
Route::post('api/login', [UserController::class, 'login']);
//user update
Route::put('api/user/update', [UserController::class, 'updateUser']);