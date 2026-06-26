<?php

use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\NewsController;
use App\Http\Controllers\Api\V1\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return ['message' => 'Hello World!'];
});

Route::prefix('v1')->group(function () {
   Route::apiResource('categories', CategoryController::class);
   Route::apiResource('tags', TagController::class);
   Route::apiResource('news', NewsController::class);
});
