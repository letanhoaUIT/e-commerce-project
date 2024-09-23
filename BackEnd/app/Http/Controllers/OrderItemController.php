<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        return OrderItem::all();
    }

    public function show($id)
    {
        return OrderItem::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|integer',
            'product_variant_size_id' => 'required|integer',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $orderItem = OrderItem::create($request->all());

        return response()->json($orderItem, 201);
    }

    public function update(Request $request, $id)
    {
        $orderItem = OrderItem::findOrFail($id);

        $request->validate([
            'order_id' => 'integer',
            'product_variant_size_id' => 'integer',
            'quantity' => 'integer',
            'price' => 'numeric',
        ]);

        $orderItem->update($request->all());

        return response()->json($orderItem, 200);
    }

    public function destroy($id)
    {
        $orderItem = OrderItem::findOrFail($id);
        $orderItem->delete();

        return response()->json(null, 204);
    }

    public function getOrderItemsByOrderId($orderId)
    {
        $orderItems = OrderItem::where('order_id', $orderId)->get();
        return response()->json($orderItems);
    }
}
