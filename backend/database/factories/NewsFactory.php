<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
    public function definition(): array
    {
        $paragraphs = fake()->paragraphs(rand(3, 8));

        $jsonContent = [];
        $htmlContent = '';

        foreach ($paragraphs as $paragraph) {
            $jsonContent[] = [
                'type' => 'paragraph',
                'content' => [
                    [
                        'type' => 'text',
                        'text' => $paragraph,
                    ],
                ],
            ];

            $htmlContent .= "<p>{$paragraph}</p>";
        }

        return [
            'title' => fake()->sentence(6),

            'content_json' => json_encode([
                'type' => 'doc',
                'content' => $jsonContent,
            ]),

            'content_html' => $htmlContent,

            'cover_image' => 'https://images.unsplash.com/photo-1513438205128-16af16280739?ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80',

            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),

            'user_id' => 1,

            'views' => fake()->numberBetween(0, 1000),
        ];
    }
}
