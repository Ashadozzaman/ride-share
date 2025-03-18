<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Vehicle\VehicleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('user/email-verification', [AuthController::class, 'emailVerification']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::get('users', 'getUsers');
        Route::post('users/role-modify', 'updateRole');
    });
    Route::controller(VehicleController::class)->group(function () {
        Route::get('vehicles', 'getVehicles');
        Route::post('vehicles', 'store');
        Route::post('vehicles/images', 'addImages');
        Route::put('vehicles', 'update');
        Route::delete('vehicles', 'destroy');
    });
});
