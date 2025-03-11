<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('user/email-verification', [AuthController::class, 'emailVerification']);
Route::get('users', [AuthController::class, 'getUsers']);

// Logout route
// Route::middleware(['auth:sanctum'])->post('/logout', [AuthController::class, 'logout_']);
