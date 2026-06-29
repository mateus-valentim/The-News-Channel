<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchName = $request->query('name');

        $paginateBy = min($request->query('paginate_by', 10), 50);

        $sortBy = $request->query('sort_by', 'id');
        $allowedSorts = ['id', 'name', 'created_at', 'updated_at'];
        if(!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'id';
        }

        $sortOrder = strtolower($request->query('sort_order', 'desc')) === 'asc' ? 'asc' : 'desc';

        $categories = Category::query()->when($searchName, function ($q, $searchName) {
            return $q->where('name', 'like', '%' . $searchName . '%');
        })->orderBy($sortBy, $sortOrder)->paginate($paginateBy);



        return response()->json($categories, 200);
    }
    public function showAll(Request $request)
    {
        $searchName = $request->query('name');


        $categories = Category::query()->when($searchName, function ($q, $searchName) {
            return $q->where('name', 'like', '%' . $searchName . '%');
        })->get();



        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        $category = Category::create($data);

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        $category->update($data);
        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
