<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Variant;
use App\Models\ProductVariantSize;
use App\Models\ImagesVariant;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VariantController extends Controller
{
    public function index(Product $productId)
    {
        $product = $productId->load('variants.sizes', 'variants.images');

        foreach ($product->variants as $variant) {
            foreach ($variant->images as $image) {
                $image->url = config('filesystems.disks.public.url') . $image->url;
            }
        }
        return response()->json($product, 201);
    }
    
    public function delete(Variant $variant)
    {
        $variant_id = $variant->id;
        DB::beginTransaction();
        try {
            ProductVariantSize::where('variant_id', $variant_id)->delete();
            ImagesVariant::where('variant_id', $variant_id)->delete();
            $variant->delete();

            DB::commit();
            return response()->json(['message' => 'Delete variant successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Delete variant failed'], 500);
        }
    }
}
