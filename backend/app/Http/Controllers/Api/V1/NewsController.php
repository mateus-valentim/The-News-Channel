<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchTitle = $request->query('title');
        $seachCategory = $request->query('category_id');
        $seachUser = $request->query('user_id');
        $seachTag = $request->query('tag_id', []);

        $paginateBy = min($request->query('paginate_by',10), 100);

        $sortBy = $request->query('sort_by','id');
        $allowedSorts = ['id', 'title', 'created_at', 'updated_at', 'views'];
        if(!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'id';
        }

        $orderBy = strtolower($request->query('order_by', 'desc')) === 'asc' ? 'asc' : 'desc';

        $news = News::query()->with(['category:id,name', 'user:id,name,profile_image', 'tags:id,name'])
        ->when($searchTitle, function ($query, $searchTitle) {
            return $query->where('title', 'like', '%'.$searchTitle.'%');
        })
        ->when($seachCategory, function ($query, $searchCategory) {
            return $query->where('category_id', $searchCategory);
        })
        ->when($seachUser, function ($query, $searchUser) {
            return $query->where('user_id', $searchUser);
        })
        ->when($seachTag, function ($query, $searchTag) {
            foreach ($searchTag as $tagId) {
                $query->whereHas('tags', function ($query) use ($tagId) {
                    $query->where('tags.id', $tagId);
                });
            }
        })
        ->orderBy($sortBy, $orderBy)->paginate($paginateBy);


        return response()->json($news, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNewsRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('news', 'public');
        }
        $data['user_id'] = auth()->id();
        $news = News::create($data);


        if(!empty($data['tags'])) {
            $news->tags()->sync($data['tags']);
        }

        return response()->json(
            $news->load([
                'tags:id,name',
                'user:id,name',
                'category:id,name',
            ]),
        201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $news->increment('views');

        return response()->json($news->fresh()->load([
            'tags:id,name',
            'user:id,name,profile_image',
            'category:id,name',
        ]), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreNewsRequest $request, News $news)
    {
        $data = $request->validated();

        if($request->hasFile('cover_image')) {
            if($news->cover_image){
                Storage::disk('public')->delete($news->cover_image);

                $data['cover_image'] = $request->file('cover_image')->store('news', 'public');

            }
        }

        $news->update($data);

        $news->tags()->sync($data['tags'] ?? []);

        return response()->json(
            $news->load([
                'tags:id,name',
                'user:id,name',
                'category:id,name',
            ]),
            201
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        if($news->cover_image){
            Storage::disk('public')->delete($news->cover_image);
        }
        $news->delete();

        return response()->json(null, 204);
    }
}
