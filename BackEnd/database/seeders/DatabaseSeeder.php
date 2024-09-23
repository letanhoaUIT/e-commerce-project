<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CreateAdminSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            UpdateProductImagesSeeder::class,
            VariantSeeder::class,
            SizeSeeder::class,
            ProductVariantSizeSeeder::class,
            ImageSeeder::class,
            ImageVariantSeeder::class,
        ]);
    }
}

class VariantSeeder extends Seeder
{
    public function run()
    {
        $colors = ['Black', 'White', 'Brown'];
        $productIds = DB::table('products')->pluck('id');

        foreach ($productIds as $productId) {
            $availableColors = $colors;

            $variantCount = rand(1, count($availableColors));

            for ($j = 1; $j <= $variantCount; $j++) {
                if (empty($availableColors)) {
                    break;
                }

                $colorIndex = array_rand($availableColors);
                $selectedColor = $availableColors[$colorIndex];
                DB::table('variants')->insert([
                    'product_id' => $productId,
                    'name' => $selectedColor,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);


                unset($availableColors[$colorIndex]);
                $availableColors = array_values($availableColors);
            }
        }
    }
}
class SizeSeeder extends Seeder
{
    public function run()
    {
        $sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14', '15'];

        foreach ($sizes as $size) {
            DB::table('sizes')->insert([
                'name' => $size,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

class ProductVariantSizeSeeder extends Seeder
{
    public function run()
    {
        $variantIds = DB::table('variants')->pluck('id');
        $sizeIds = DB::table('sizes')->pluck('id');

        foreach ($variantIds as $variantId) {
            foreach ($sizeIds as $sizeId) {
                DB::table('product_variant_size')->insert([
                    'variant_id' => $variantId,
                    'size_id' => $sizeId,
                    'stock_quantity' => rand(1, 100),
                    'price' => rand(50, 200),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

class ImageSeeder extends Seeder
{
    public function run()
    {
        $products = DB::table('products')->get();

        foreach ($products as $product) {
            if ($product->image) {
                // Chèn URL vào bảng images và lấy ID
                $imageId = DB::table('images')->insertGetId([
                    'url' => $product->image,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

class ImageVariantSeeder extends Seeder
{
    public function run()
    {
        $variantIds = DB::table('variants')->pluck('id');
        $imageIds = DB::table('images')->pluck('id');

        foreach ($variantIds as $variantId) {
            $imageId = $imageIds->random();
            DB::table('images_variants')->insert([
                'image_id' => $imageId,
                'variant_id' => $variantId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
