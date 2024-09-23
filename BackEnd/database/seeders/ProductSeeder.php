<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Faker\Factory as Faker;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Lấy tất cả danh mục hiện có
        $categories = Category::all();

        $products = [
            ['name' => 'JAYSHAN BLACK LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => 'Elevate your formal wardrobe with the JAYSHAN dress loafer. The soft tumbled leather and slip-on construction provide comfort, while the metal bit embellishment and almond toe add a touch of sophistication. Make a statement on any occasion with this stylish and versatile piece.'],
            ['name' => 'NATAN BLACK WHITE LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => 'Introducing the effortless style of the NATAN loafer. With a sleek dress design and easy slip-on construction, these shoes offer comfort and sophistication. Perfect for any occasion, step into luxury with this dress shoe.'],
            ['name' => 'ZEV BURGUNDY', 'price' => 149.95, 'colors' => 2, 'description' => '1.5 inch heel height
Leather upper material
Synthetic and textile lining
Synthetic and textile sock
Rubber sole
Imported'],
            ['name' => 'AALON TAN LEATHER', 'price' => 99.95, 'colors' => 2, 'description' => '1.5 inch heel height
Leather upper material
Synthetic and textile lining
Synthetic and textile sock
Rubber sole
Imported'],
            ['name' => 'DAYMIN BROWN LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => '1.5 inch heel height
Leather upper material
Synthetic and textile lining
Synthetic and textile sock
Rubber sole
Imported'],
            ['name' => 'DAYMIN BLACK PATENT', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence],
            ['name' => 'AALON BLACK LEATHER', 'price' => 99.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'FREDERICK TAN LEATHER', 'price' => 129.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'FREDERICK BLACK LEATHER', 'price' => 129.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'DAYMIN TAN LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence],
            ['name' => 'ONDRE BLACK SUEDE', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'JARRIS BLACK LEATHER', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'JAYSHAN WHITE LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'HADAR SILVER', 'price' => 134.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'PERICON BLACK LEATHER', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'LAIGHT BLACK VELVET', 'price' => 99.95, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'ZEV BLACK BOX', 'price' => 149.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'NATAN BROWN MULTI', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence],
            ['name' => 'RONEN BLACK LEATHER', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'ONDRE SAND SUEDE', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'JAMONE TAN EMBOSSED', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'AADI BLACK/SILVER', 'price' => 109.95, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'ONDRE TAN SUEDE', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'JAYSHAN BROWN LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'GEMARI BLACK LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'KOLEMAN TAN LEATHER', 'price' => 129.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'COVET COGNAC LEATHER', 'price' => 124.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'DAYMIN BLACK LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence],
            ['name' => 'JABRIAN TAN LEATHER', 'price' => 124.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'NATAN BLACK LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence],
            ['name' => 'GEMARI TAN LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'COVET BLACK LEATHER', 'price' => 124.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'JABRIAN BLACK LEATHER', 'price' => 124.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'NATAN BLACK MULTI', 'price' => 139.95, 'colors' => 4, 'description' => $faker->sentence],
            ['name' => 'GEMARI BURGUNDY', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence],
            ['name' => 'KOLEMAN BLACK LEATHER', 'price' => 129.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'TROYE BLACK LEATHER', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'HADAR NAVY BOX LEATHER', 'price' => 134.95, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'GADDIS TOBACCO SUEDE', 'price' => 79.99, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'GADDIS NAVY SUEDE', 'price' => 79.99, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'CASHH BLACK', 'price' => 69.97, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'XAVION BLACK LEATHER', 'price' => 59.99, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'BRILLAR BLACK', 'price' => 59.99, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'CUTLER BLACK', 'price' => 59.99, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'CUTLER COGNAC', 'price' => 59.99, 'colors' => 2, 'description' => $faker->sentence],
            ['name' => 'ZYLUS FUR BLACK BOX', 'price' => 79.99, 'colors' => 1, 'description' => $faker->sentence],
            ['name' => 'BRILLAR PEWTER', 'price' => 59.99, 'colors' => 2, 'description' => $faker->sentence],
        ];

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'price' => $product['price'],
                'colors' => $product['colors'],
                'description' => $product['description'],
                'category_id' => 1,
            ]);
        }
    }
}
