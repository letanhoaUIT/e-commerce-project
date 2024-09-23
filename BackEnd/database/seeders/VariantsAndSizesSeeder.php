<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Variant;
use App\Models\Size;
use App\Models\ProductVariantSize;
use App\Models\Image;
use App\Models\ImagesVariant;
use App\Models\Category;

class VariantsAndSizesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!Category::where('id', '1')->exists()) {
            Category::create([
                'name' => 'Shoes',
            ]);
        }
        
        Product::create([
            'name' => 'JAYSHAN LEATHER',
            'description' => 'Elevate your formal wardrobe with the JAYSHAN dress loafer. The soft tumbled leather and slip-on construction provide comfort, while the metal bit embellishment and almond toe add a touch of sophistication. Make a statement on any occasion with this stylish and versatile piece.',
            'price' => 129.95,
            'category_id' => 1,
            'colors' => 3,
        ]);

        $product_id = Product::where('name', 'JAYSHAN LEATHER')->first()->id;

        $variants = [
            ['product_id' => $product_id, 'name' => 'Black'],
            ['product_id' => $product_id, 'name' => 'White']
        ];

        Variant::insert($variants);

        $variant_black_id = Variant::where('name', 'Black')->first()->id;
        $variant_white_id = Variant::where('name', 'White')->first()->id;

        $sizes = [
            ['name' => '7'],
            ['name' => '8'],
            ['name' => '9']
        ];

        Size::insert($sizes);

        $size_7_id = Size::where('name', '7')->first()->id;
        $size_8_id = Size::where('name', '8')->first()->id;
        $size_9_id = Size::where('name', '9')->first()->id;

        $product_variant_sizes = [
            ['variant_id' => $variant_black_id, 'size_id' => $size_7_id, 'stock_quantity' => 10, 'price' => 129.95],
            ['variant_id' => $variant_black_id, 'size_id' => $size_8_id, 'stock_quantity' => 10, 'price' => 129.95],
            ['variant_id' => $variant_black_id, 'size_id' => $size_9_id, 'stock_quantity' => 10, 'price' => 129.95],
            ['variant_id' => $variant_white_id, 'size_id' => $size_7_id, 'stock_quantity' => 10, 'price' => 129.95],
            ['variant_id' => $variant_white_id, 'size_id' => $size_8_id, 'stock_quantity' => 10, 'price' => 129.95],
            ['variant_id' => $variant_white_id, 'size_id' => $size_9_id, 'stock_quantity' => 10, 'price' => 129.95],
        ];

        ProductVariantSize::insert($product_variant_sizes);

        $images = [
            ['url' => 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_grande.jpg?v=1701468141'],
            ['url' => 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_01_grande.jpg?v=1701468141'],
            ['url' => 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_04_grande.jpg?v=1701468141'],
            ['url' => 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER_01_grande.jpg?v=1718296202'],
            ['url' => 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER_02_grande.jpg?v=1718296202'],
            ['url' => 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER_05_grande.jpg?v=1718296202'],
        ];

        Image::insert($images);

        $image_1_id = Image::where('url', 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_grande.jpg?v=1701468141')->first()->id;
        $image_2_id = Image::where('url', 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_01_grande.jpg?v=1701468141')->first()->id;
        $image_3_id = Image::where('url', 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_04_grande.jpg?v=1701468141')->first()->id;
        $image_4_id = Image::where('url', 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER_01_grande.jpg?v=1718296202')->first()->id;
        $image_5_id = Image::where('url', 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER_02_grande.jpg?v=1718296202')->first()->id;
        $image_6_id = Image::where('url', 'https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER_05_grande.jpg?v=1718296202')->first()->id;

        $images_variants = [
            ['image_id' => $image_1_id, 'variant_id' => $variant_black_id],
            ['image_id' => $image_2_id, 'variant_id' => $variant_black_id],
            ['image_id' => $image_3_id, 'variant_id' => $variant_black_id],
            ['image_id' => $image_4_id, 'variant_id' => $variant_white_id],
            ['image_id' => $image_5_id, 'variant_id' => $variant_white_id],
            ['image_id' => $image_6_id, 'variant_id' => $variant_white_id],
        ];

        ImagesVariant::insert($images_variants);
    }
}
