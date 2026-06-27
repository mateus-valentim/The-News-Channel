<?php

namespace App\Http\Controllers\api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $searchName = $request->query('name');

        $paginateBy = min($request->query('paginate_by',10), 100);

        $sortBy = $request->query('sort_by', 'id');
        $allowedSorts = ['id', 'name', 'email', 'created_at', 'updated_at'];
        if(!in_array($sortBy, $allowedSorts)) {
            $sortBy = 'id';
        }

        $orderBy = strtolower($request->query('order_by', 'desc')) === 'asc' ? 'asc' : 'desc';

        $users = User::query()->when($searchName, function ($query, $searchName) {
            return $query->where('name', 'like', '%' . $searchName . '%');
        })->orderBy($sortBy, $orderBy)->paginate($paginateBy);

        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('profile_image')) {
            $data['profile_image'] = $request->file('profile_image')->store('users', 'public');
        }
        $data['password'] = Hash::make(($data['password']));
        $user = User::create($data);
        return response()->json($user, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUserRequest $request, User $user)
    {
        $data = $request->validated();
        if($request->hasFile('profile_image')) {
            if($user->profile_image){
                Storage::disk('public')->delete($user->profile_image);

                $data['profile_image'] = $request->file('profile_image')->store('users', 'public');

            }
        }
        if(isset($data['password'])) {
            $data['password'] = Hash::make(($data['password']));
        }
        $user->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if($user->profile_image){
            Storage::disk('public')->delete($user->profile_image);
        }
        $user->delete();
        return response()->json(null, 204);
    }
}
