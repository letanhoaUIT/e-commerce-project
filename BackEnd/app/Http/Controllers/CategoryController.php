<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('children')->whereNull('parent_id')->get();
        return response()->json($categories);
    }

    public function getAllCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json($category);
        } else {
            return response()->json(['message' => 'Category not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category = Category::findOrFail($id);
        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $children = $category->children;
            foreach ($children as $child) {
                $child->parent_id = null;
                $child->save();
            }
            $category->delete();
            return response()->json($category);
        } else {
            return response()->json(['message' => 'Category not found'], 404);
        }
    }

    public function get_products_by_category(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category) {
            $limit = $request->input('limit', 10);
            $products = $category->products()->with('variants.sizes', 'variants.images')->paginate($limit);

            $response = [
                'products' => $products,
                'category' => $category->name,
            ];
            return response()->json($response);
        } else {
            return response()->json(['message' => 'Category not found'], 404);
        }
    }
}
