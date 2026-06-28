<?php

namespace App\Http\Controllers\api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function StoreNewsImage(request $request){

        $data = $request->validate([
            'image' => 'required|image|max:2048',
        ]);
        $path = $request->file('image')->store('editor', 'public');
        return response()->json(['url' => Storage::url($path)]);


    }
}
