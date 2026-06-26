<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        News::factory()
            ->count(10)
            ->create()
            ->each(function ($news) {
                $news->tags()->attach(
                    Tag::inRandomOrder()
                        ->limit(rand(1, 5))
                        ->pluck('id')
                );
            });
    }
}
