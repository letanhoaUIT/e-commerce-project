<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
    ];

    public function variants()
    {
        return $this->belongsToMany(Variant::class, 'images_variants')
                    ->withTimestamps();
    }
}
