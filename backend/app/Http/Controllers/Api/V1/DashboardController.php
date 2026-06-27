<?php

namespace App\Http\Controllers\api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats()
    {
        $stats = [
            'categories' => Category::count(),
            'users' => User::count(),
            'tags' => Tag::count(),
            'news' => News::count(),
        ];

        return response()->json($stats);
    }
}
