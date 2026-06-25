<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\News;
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
            'title' => $this->faker->sentence(),
            'content_json' => json_encode([
                'time' => now()->timestamp,
                'blocks' => [
                    [
                        'type' => 'paragraph',
                        'data' => ['text' => $this->faker->paragraph()]
                    ]
                ]
            ]),
            'content_html' => '<p>' . implode('</p><p>', $this->faker->paragraphs(3)) . '</p>',
            'category_id' => fn () => Category::inRandomOrder()->first()?->id ?? Category::factory(),
        ];
    }
}
