<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Get all carts
    public function index()
    {
        $carts = Cart::all();
        return response()->json($carts);
    }

    // Get a single cart
    public function show($id)
    {
        $cart = Cart::with('items')->find($id);
        if ($cart) {
            return response()->json($cart);
        } else {
            return response()->json(['message' => 'Cart not found'], 404);
        }
    }

    // Create a new cart
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $cart = Cart::create($validatedData);
        return response()->json($cart, 201);
    }

    // Update an existing cart
    public function update(Request $request, $id)
    {
        $cart = Cart::find($id);
        if ($cart) {
            $validatedData = $request->validate([
                'user_id' => 'sometimes|required|exists:users,id',
            ]);

            $cart->update($validatedData);
            return response()->json($cart);
        } else {
            return response()->json(['message' => 'Cart not found'], 404);
        }
    }

    // Delete a cart
    public function destroy($id)
    {
        $cart = Cart::find($id);
        if ($cart) {
            $cart->delete();
            return response()->json(['message' => 'Cart deleted successfully']);
        } else {
            return response()->json(['message' => 'Cart not found'], 404);
        }
    }
}
