<?php

use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\NewsController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('tags', TagController::class);
    Route::apiResource('news', NewsController::class);
    Route::apiResource('users', UserController::class);
});

