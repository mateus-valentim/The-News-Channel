<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchName = $request->query('name');

        $paginateBy = min($request->query('paginate_by',10), 100);

        $sortBy = $request->query('sort_by','id');
        $allowedSorts = ['id', 'name', 'created_at', 'updated_at'];
        if(!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'id';
        }

        $orderBy = strtolower($request->query('order_by', 'desc')) === 'asc' ? 'asc' : 'desc';

        $tags = Tag::query()->when($searchName, function ($query, $searchName) {
            return $query->where('name', 'like', '%'.$searchName.'%');
        })->orderBy($sortBy, $orderBy)->paginate($paginateBy);


        return response()->json($tags, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagRequest $request)
    {
        $data = $request->validated();
        $tag = Tag::create($data);
        return response()->json($tag, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        return response()->json($tag, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTagRequest $request, Tag $tag)
    {
        $data = $request->validated();
        $tag->update($data);
        return response()->json($tag, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();
        return response()->json(null, 204);
    }
}
