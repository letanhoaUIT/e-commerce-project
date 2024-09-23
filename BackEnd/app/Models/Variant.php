<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id', 'name',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_variant_size')
                    ->withPivot('stock_quantity', 'price')
                    ->withTimestamps();
    }

    public function images()
    {
        return $this->belongsToMany(Image::class, 'images_variants')
                    ->withTimestamps();
    }
}
