<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'product_variant_size_id', 'quantity', 'price',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function productVariantSize()
    {
        return $this->belongsTo(ProductVariantSize::class, 'product_variant_size_id');
    }
}
