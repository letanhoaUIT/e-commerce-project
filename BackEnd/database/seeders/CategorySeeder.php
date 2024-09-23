<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            ['name' => 'Formal Shoes', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Casual Shoes', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sports Shoes', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
