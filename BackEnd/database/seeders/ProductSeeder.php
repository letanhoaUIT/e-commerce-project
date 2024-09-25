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
            ['name' => 'JAYSHAN BLACK LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => 'Elevate your formal wardrobe with the JAYSHAN dress loafer. The soft tumbled leather and slip-on construction provide comfort, while the metal bit embellishment and almond toe add a touch of sophistication. Make a statement on any occasion with this stylish and versatile piece.', 'image' => 'STEVEMADDEN_MENS_JAYSHAN_BLACK_grande.png'],
            ['name' => 'NATAN BLACK WHITE LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => 'Introducing the effortless style of the NATAN loafer. With a sleek dress design and easy slip-on construction, these shoes offer comfort and sophistication. Perfect for any occasion, step into luxury with this dress shoe.', 'image' => 'STEVEMADDEN_MENS_NATAN_BLACK-LEATHER.png'],
            ['name' => 'ZEV BURGUNDY', 'price' => 149.95, 'colors' => 2, 'description' => '1.5 inch heel height Leather upper material Synthetic and textile lining Synthetic and textile sock Rubber sole Imported', 'image' => 'STEVEMADDEN_SHOES_ZEV_BURGANDY.png'],
            ['name' => 'AALON TAN LEATHER', 'price' => 99.95, 'colors' => 2, 'description' => '1.5 inch heel height Leather upper material Synthetic and textile lining Synthetic and textile sock Rubber sole Imported', 'image' => 'STEVEMADDEN_MENS_AALON_TAN-LEATHER.png'],
            ['name' => 'DAYMIN BROWN LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => '1.5 inch heel height Leather upper material Synthetic and textile lining Synthetic and textile sock Rubber sole Imported', 'image' => 'STEVEMADDEN_MENS_DAYMIN_BROWN-LEATHER_01.png'],
            ['name' => 'DAYMIN BLACK PATENT', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_DAYMIN_BLACK-PATENT_01.png'],
            ['name' => 'AALON BLACK LEATHER', 'price' => 99.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_AALON_BLACK-LEATHER.png'],
            ['name' => 'FREDERICK TAN LEATHER', 'price' => 129.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_FREDERICK_TAN.png'],
            ['name' => 'FREDERICK BLACK LEATHER', 'price' => 129.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_FREDERICK_BLACK.png'],
            ['name' => 'DAYMIN TAN LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_DAYMIN_TAN-LEATHER.png'],
            ['name' => 'ONDRE BLACK SUEDE', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_ONDRE_BLACK-SUEDE.png'],
            ['name' => 'JARRIS BLACK LEATHER', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_JARRIS_BLACK-LEATHER.png'],
            ['name' => 'JAYSHAN WHITE LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_JAYSHAN_WHITE-LEATHER.png'],
            ['name' => 'HADAR SILVER', 'price' => 134.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_HADAR_SILVER_01.png'],
            ['name' => 'PERICON BLACK LEATHER', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_PERICON_BLACK-DISTRESS_01.png'],
            ['name' => 'LAIGHT BLACK VELVET', 'price' => 99.95, 'colors' => 1, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_LAIGHT_BLACK-VELVET.png'],
            ['name' => 'ZEV BLACK BOX', 'price' => 149.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_SHOES_ZEV_BLACK_BOX.png'],
            ['name' => 'NATAN BROWN MULTI', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_NATAN_BROWN-MULTI_01.png'],
            ['name' => 'RONEN BLACK LEATHER', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_RONEN_BLACK-LEATHER.png'],
            ['name' => 'ONDRE SAND SUEDE', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_ONDRE_SAND.png'],
            ['name' => 'JAMONE TAN EMBOSSED', 'price' => 129.95, 'colors' => 1, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_JAMONE_TAN_01.png'],
            ['name' => 'AADI BLACK/SILVER', 'price' => 109.95, 'colors' => 1, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_AADI_BLACK.png'],
            ['name' => 'ONDRE TAN SUEDE', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_ONDRE_TAN.png'],
            ['name' => 'JAYSHAN BROWN LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_JAYSHAN_BROWN.png'],
            ['name' => 'GEMARI BLACK LEATHER', 'price' => 129.95, 'colors' => 3, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_GEMARI_BLACK-LEATHER.png'],
            ['name' => 'KOLEMAN TAN LEATHER', 'price' => 129.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_KOLEMAN_TAN-LEATHER.png'],
            ['name' => 'COVET COGNAC LEATHER', 'price' => 124.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_COVET_COGNAC-LEATHER.png'],
            ['name' => 'DAYMIN BLACK LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_DAYMIN_BLACK-LEATHER.png'],
            ['name' => 'JABRIAN BLACK LEATHER', 'price' => 124.95, 'colors' => 2, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_JABRIAN_BLACK-LEATHER.png'],
            ['name' => 'KOLEMAN TAN LEATHER', 'price' => 129.95, 'colors' => 4, 'description' => $faker->sentence, 'image' => 'STEVEMADDEN_MENS_KOLEMAN_TAN-LEATHER_01.png'],
        ];

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'price' => $product['price'],
                'colors' => $product['colors'],
                'description' => $product['description'],
                'category_id' => 1, 
                'image' => 'storage/images/' . $product['image'], 
            ]);
        }
    }
}
