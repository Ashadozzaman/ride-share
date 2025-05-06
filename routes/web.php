<?php

use Illuminate\Support\Facades\Route;

Route::get('/app/{view_page}', function () {
    return view('welcome');
});
Route::get('/test', function () {
    dd('Test');
});
