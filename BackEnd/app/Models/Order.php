<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'status', 'total_price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    protected static function booted()
    {
        static::created(function ($order) {
            try {
                DB::table('statistics')
                    ->where('date', today()->toDateString())
                    ->update([
                        'total_orders' => DB::raw('total_orders + 1'),
                        'total_sales' => DB::raw('total_sales + ' . $order->total_price),
                    ]);
            } catch (\Exception $e) {
                Log::error('Error updating order statistics: ' . $e->getMessage());
            }
        });
    }


}
