<?php

namespace App\Http\Controllers;

use App\Models\ImagesVariant;
use App\Models\Product;
use App\Models\Variant;
use App\Models\Size;
use App\Models\ProductVariantSize;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Get all products
    public function index(Request $request)
    {
        $sort = $request->query('sort', '');
        $search = $request->query('search', '');
        $products = Product::query();

        if ($search) {
            $products->where('name', 'like', "%$search%");
        }
        switch ($sort) {
            case 'price_low_to_high':
                $products->orderBy('price', 'asc');
                break;
            case 'price_high_to_low':
                $products->orderBy('price', 'desc');
                break;
            case 'newest_to_oldest':
                $products->orderBy('created_at', 'desc');
                break;
            case 'ranking':
                // có một cột `ranking` trong bảng products
                $products->orderBy('ranking', 'desc');
                break;
            default:
                $products->orderBy('created_at', 'asc');
                break;
        }

        $products = $products->get();

        // Thêm URL đầy đủ cho hình ảnh
        foreach ($products as $product) {
            $product->image_url = asset($product->image);
        }

        return response()->json($products);
    }


    // Get a single product
    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    // Create a new product
    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    // Update an existing product
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->update($request->all());
            return response()->json($product);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::find($id);
        $variants = Variant::where('product_id', $id)->get();
        if ($product) {
            foreach ($variants as $variant) {
                $variant->sizes()->delete();
                $variant->images()->delete();
            }
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully']);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    // List products for admin
    public function list(Request $request)
    {
        $limit = $request->query('limit', 10);
        $products = Product::has('variants')
            ->with('variants', 'variants.sizes')
            ->paginate($limit);
        return response()->json($products);
    }

    public function get_product_information($id)
    {
        try {
            $product = Product::with([
                'variants.sizes',
                'variants.images'
            ])->findOrFail($id);

            // Tạo đường dẫn đầy đủ cho URL hình ảnh
            foreach ($product->variants as $variant) {
                foreach ($variant->images as $image) {
                    $image->url = config('filesystems.disks.public.url') . $image->url;
                }
            }

            return response()->json($product, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Product not found', 'details' => $e->getMessage()], 404);
        }
    }

    public function create_new_product(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'variants' => 'required|array',
            'variants.*.name' => 'required|string',
            'variants.*.sizes' => 'required|array',
            'variants.*.sizes.*.name' => 'required|string',
            'variants.*.sizes.*.stock_quantity' => 'required|integer',
            'variants.*.sizes.*.price' => 'required|numeric',
            'variants.*.images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            $product = Product::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category_id' => $request->input('category_id'),
            ]);

            $firstImagePath = null;

            foreach ($request->input('variants') as $variantIndex => $variantData) {
                $variant = Variant::create([
                    'product_id' => $product->id,
                    'name' => $variantData['name'],
                ]);

                foreach ($variantData['sizes'] as $sizeData) {
                    $size = Size::firstOrCreate(['name' => $sizeData['name']]);
                    ProductVariantSize::create([
                        'variant_id' => $variant->id,
                        'size_id' => $size->id,
                        'stock_quantity' => $sizeData['stock_quantity'],
                        'price' => $sizeData['price'],
                    ]);
                }

                if ($request->hasFile("variants.$variantIndex.images")) {
                    foreach ($request->file("variants.$variantIndex.images") as $image) {
                        $path = $image->store('images', 'public');
                        $storagePath = Storage::url($path);

                        $imageModel = Image::create([
                            'variant_id' => $variant->id,
                            'url' => Storage::url($path),
                        ]);

                        // Liên kết hình ảnh với biến thể
                        $variant->images()->attach($imageModel->id);


                        if ($firstImagePath === null) {
                            $firstImagePath = $storagePath; // Lưu đường dẫn của hình ảnh đầu tiên
                        }
                    }
                }
            }

            if ($firstImagePath) {
                $product->image = $firstImagePath;
                $product->save();
            }

            DB::commit();

            $response = $product->load('variants.sizes', 'variants.images');
            foreach ($response->variants as $variant) {
                foreach ($variant->images as $image) {
                    $image->url = config('filesystems.disks.public.url') . '/' . $image->url;
                }
            }

            return response()->json($response, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create product', 'details' => $e->getMessage()], 500);
        }
    }

    public function update_product(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'variants' => 'required|array',
            'variants.*.id' => 'nullable|exists:variants,id',
            'variants.*.name' => 'required|string',
            'variants.*.sizes' => 'required|array',
            'variants.*.sizes.*.id' => 'nullable|exists:sizes,id',
            'variants.*.sizes.*.name' => 'required|string',
            'variants.*.sizes.*.stock_quantity' => 'required|integer',
            'variants.*.sizes.*.price' => 'required|numeric',
            'variants.*.delete_images_id' => 'nullable|array',
            'variants.*.new_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();

        try {
            $product = $this->updateProductDetails($request, $id);
            $this->handleVariants($request, $product);

            DB::commit();

            return response()->json($this->formatProductResponse($product), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update product', 'details' => $e->getMessage()], 500);
        }
    }

    private function updateProductDetails($request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'category_id' => $request->input('category_id'),
        ]);
        return $product;
    }

    private function handleVariants($request, $product)
    {
        $existingVariantIds = $product->variants->pluck('id')->toArray();
        $newVariantIds = [];

        foreach ($request->input('variants') as $variantIndex => $variantData) {
            $variant = Variant::updateOrCreate(
                ['id' => $variantData['id'] ?? null, 'product_id' => $product->id],
                ['name' => $variantData['name']]
            );
            $newVariantIds[] = $variant->id;

            $this->handleSizes($variantData, $variant);
            $this->handleImages($request, $variant, $variantIndex, $variantData);
        }

        $this->deleteOldVariants($existingVariantIds, $newVariantIds);
    }

    private function handleSizes($variantData, $variant)
    {
        $existingSizeIds = $variant->sizes->pluck('id')->toArray();
        $newSizeIds = [];

        foreach ($variantData['sizes'] as $sizeData) {
            $size = Size::firstOrCreate(['name' => $sizeData['name']]);
            ProductVariantSize::updateOrCreate(
                ['variant_id' => $variant->id, 'size_id' => $size->id],
                ['stock_quantity' => $sizeData['stock_quantity'], 'price' => $sizeData['price']]
            );
            $newSizeIds[] = $size->id;
        }

        foreach (array_diff($existingSizeIds, $newSizeIds) as $sizeId) {
            ProductVariantSize::where('variant_id', $variant->id)->where('size_id', $sizeId)->delete();
        }
    }

    private function handleImages($request, $variant, $variantIndex, $variantData)
    {
        if (isset($variantData['delete_images_id'])) {
            ImagesVariant::whereIn('image_id', $variantData['delete_images_id'])->delete();
            Image::whereIn('id', $variantData['delete_images_id'])->delete();
        }

        if ($request->hasFile("variants.$variantIndex.new_images")) {
            foreach ($request->file("variants.$variantIndex.new_images") as $image) {
                $path = $image->store('images', 'public');
                $img = Image::create([
                    'variant_id' => $variant->id,
                    'url' => $path,
                ]);
                ImagesVariant::create([
                    'variant_id' => $variant->id,
                    'image_id' => $img->id,
                ]);
            }
        }
    }

    private function deleteOldVariants($existingVariantIds, $newVariantIds)
    {
        foreach (array_diff($existingVariantIds, $newVariantIds) as $variantId) {
            ProductVariantSize::where('variant_id', $variantId)->delete();
            $image_id = ImagesVariant::where('variant_id', $variantId)->pluck('image_id')->toArray();
            ImagesVariant::where('variant_id', $variantId)->delete();
            Image::whereIn('id', $image_id)->delete();
            Variant::find($variantId)->delete();
        }
    }

    private function formatProductResponse($product)
    {
        $response = $product->load('variants.sizes', 'variants.images');
        foreach ($response->variants as $variant) {
            foreach ($variant->images as $image) {
                $image->url = config('filesystems.disks.public.url') . '/' . $image->url;
            }
        }
        return $response;
    }

    public function getProductsWithVariantCount()
    {
        $products = Product::withCount('variants')->get();

        return response()->json($products);
    }

    public function getProductsWithNameAndImage(Request $request)
    {
        $products = Product::select('id', 'name', 'image')->get();

        return response()->json($products);
    }
}
