<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagesVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_id', 'variant_id',
    ];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    public function variant()
    {
        return $this->belongsTo(Variant::class);
    }
}
