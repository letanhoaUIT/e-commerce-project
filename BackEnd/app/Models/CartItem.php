<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id', 'product_variant_size_id', 'quantity',
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function productVariantSize()
    {
        return $this->belongsTo(ProductVariantSize::class);
    }

    public function variant()
    {
        return $this->hasOneThrough(Variant::class, ProductVariantSize::class, 'id', 'id', 'product_variant_size_id', 'variant_id');
    }

    public function size()
    {
        return $this->hasOneThrough(Size::class, ProductVariantSize::class, 'id', 'id', 'product_variant_size_id', 'size_id');
    }

    public function variantImages()
    {
        return $this->hasManyThrough(Image::class, ImagesVariant::class, 'id', 'id', 'variant_id', 'product_variant_size_id');
    }
}
