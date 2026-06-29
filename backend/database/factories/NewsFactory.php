<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\News;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(6),

            'content_json' => json_encode([
                'type' => 'doc',
                'content' => [
                    [
                        'type' => 'paragraph',
                        'content' => [
                            [
                                'type' => 'text',
                                'text' => fake()->paragraph(),
                            ],
                        ],
                    ],
                ],
            ]),

            'content_html' => '<p>' . fake()->paragraph() . '</p>',

            'cover_image' => "https://img.magnific.com/free-vector/illustration-gallery-icon_53876-27002.jpg?semt=ais_hybrid&w=740&q=80",

            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),

            'user_id' => 1,

            'views' => fake()->numberBetween(0, 1000),
        ];
    }

}
