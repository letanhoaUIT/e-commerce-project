<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Cart;
use App\Models\ProductVariantSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartItemController extends Controller
{
    // Get all cart items
    public function index()
    {
        $cartItems = CartItem::all();
        return response()->json($cartItems);
    }

    // Get a single cart item
    public function show($id)
    {
        $cartItem = CartItem::with('cart', 'productVariantSize')->find($id);
        if ($cartItem) {
            return response()->json($cartItem);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }

    // Create a new cart item
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'product_variant_size_id' => 'required|exists:product_variant_sizes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::create($validatedData);
        return response()->json($cartItem, 201);
    }

    // Update an existing cart item
    public function update(Request $request, $id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $validatedData = $request->validate([
                'cart_id' => 'sometimes|required|exists:carts,id',
                'product_variant_size_id' => 'sometimes|required|exists:product_variant_sizes,id',
                'quantity' => 'sometimes|required|integer|min:1',
            ]);

            $cartItem->update($validatedData);
            return response()->json($cartItem);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }

    // Delete a cart item
    public function destroy($id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Cart item deleted successfully']);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }

    public function add_item_to_cart(Request $request)
    {
        $validatedData = $request->validate([
            'product_variant_id' => 'required',
            'size_id' => 'required',
            'quantity' => 'required|integer|min:1',
        ]);
        $userId = 1;
        $cartId = 1;

        $productVariantSize = ProductVariantSize::where('variant_id', $validatedData['product_variant_id'])->where('size_id', $validatedData['size_id'])->first();
        $productVariantSizeId = $productVariantSize->id;

        if(Cart::where('id', $cartId)->count() == 0){
            Cart::create(['user_id' => $userId]);
        }

        if(CartItem::where('cart_id', $cartId)->where('product_variant_size_id', $productVariantSizeId)->count() > 0){
            $cartItem = CartItem::where('cart_id', $cartId)->where('product_variant_size_id', $productVariantSizeId)->first();
            $cartItem->update(['quantity' => $cartItem->quantity + $validatedData['quantity']]);
            return response()->json($cartItem, 202);
        }

        $cartItem = CartItem::create(
            [
                'cart_id' => $cartId,
                'product_variant_size_id' => $productVariantSizeId,
                'quantity' => $validatedData['quantity'],
            ]
        );
        return response()->json($cartItem, 201);
    }

    public function get_cart_items()
    {
        $userId = 1;
        $cartId = Cart::where('user_id', $userId)->first()->id;
        $cartItems = CartItem::with(['productVariantSize', 'variant.images', 'size'])
        ->where('cart_id', $cartId)
        ->get();

        $cartItemsWithImages = $cartItems->map(function ($item) {
            $imageUrls = $item->variant->images->map(function ($image) {
                return $image->url;
            });

            return [
                'id' => $item->id,
                'variant' => $item->variant,
                'size' => $item->size,
                'quantity' => $item->quantity,
                'product_variant_size' => $item->productVariantSize,
                'images' => $imageUrls,
                'product' => $item->variant->product,
            ];
        });

        return response()->json($cartItemsWithImages);
    }


    public function increaseQuantity($id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $cartItem->quantity += 1;
            $cartItem->save();
            return response()->json($cartItem);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }

    public function decreaseQuantity($id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            if ($cartItem->quantity > 1) {
                $cartItem->quantity -= 1;
                $cartItem->save();
            } else {
                $cartItem->delete();
                return response()->json(['message' => 'Cart item deleted due to quantity being zero']);
            }
            return response()->json($cartItem);
        } else {
            return response()->json(['message' => 'Cart item not found'], 404);
        }
    }

}
