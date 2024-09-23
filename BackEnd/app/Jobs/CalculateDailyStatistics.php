<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use App\Models\Statistic;
use Carbon\Carbon;

class CalculateDailyStatistics extends Command
{
    protected $signature = 'statistics:calculate-daily';

    protected $description = 'Calculate daily statistics for orders and sales';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $today = Carbon::today();

        $totalOrders = Order::whereDate('created_at', $today)->count();

        $totalSales = Order::whereDate('created_at', $today)->sum('total_amount');

        $totalUsers = Order::whereDate('created_at', $today)->distinct('user_id')->count('user_id');

        // Lưu vào bảng statistics
        Statistic::updateOrCreate(
            ['date' => $today],
            [
                'total_sales' => $totalSales,
                'total_orders' => $totalOrders,
                'total_users' => $totalUsers,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        $this->info('Daily statistics calculated successfully!');
    }
}
