<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariantSize extends Model
{
    use HasFactory;

    protected $table = 'product_variant_size';

    protected $fillable = [
        'variant_id', 'size_id', 'stock_quantity', 'price',
    ];

    public function variant()
    {
        return $this->belongsTo(Variant::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }
}
