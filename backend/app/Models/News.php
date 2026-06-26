<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class News extends Model
{
    /** @use HasFactory<\Database\Factories\NewsFactory> */
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'cover_image',
        'content_json',
        'content_html',
        'category_id',
        'user_id',
    ];

    public function category(): BelongsTo{
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function tags(): BelongsToMany{
        return $this->belongsToMany(Tag::class);
    }
}
