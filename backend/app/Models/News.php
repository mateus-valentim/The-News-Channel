<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class News extends Model
{
    /** @use HasFactory<\Database\Factories\NewsFactory> */
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'content_json',
        'content_html',
        'category_id',
    ];

    public function category(): BelongsTo{
        return $this->belongsTo(Category::class);
    }
}
