<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 20, 200),
            'category_id' => \App\Models\Category::factory(),
            'image' => $this->faker->imageUrl(),
            'colors' => $this->faker->numberBetween(1, 4),
        ];
    }
}
