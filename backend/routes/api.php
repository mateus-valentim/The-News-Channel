<?php

use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\api\V1\DashboardController;
use App\Http\Controllers\api\V1\ImageController;
use App\Http\Controllers\Api\V1\NewsController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\api\V1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::get('/categories/all', [CategoryController::class, 'showAll']);
    Route::get('/tags/all', [TagController::class, 'showAll']);
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
    Route::apiResource('tags', TagController::class)->only(['index', 'show']);
    Route::apiResource('news', NewsController::class)->only(['index', 'show']);

    Route::middleware('auth:sanctum')->group(function () {

        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('tags', TagController::class)->except(['index', 'show']);
        Route::apiResource('news', NewsController::class)->except(['index', 'show']);
        Route::apiResource('users', UserController::class);
        Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
        Route::post('/images/upload', [ImageController::class, 'StoreNewsImage']);

    });
});

