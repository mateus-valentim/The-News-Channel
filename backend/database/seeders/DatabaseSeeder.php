<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();


        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'profile_image' => 'editor/dFV6logxrIOdjAlVDtVKS438iHPBZUu7f9Fbjh29.jpg',
        ]);

        $this->call([
            CategorySeeder::class,
            TagSeeder::class,
            NewsSeeder::class,
        ]);
    }
}
