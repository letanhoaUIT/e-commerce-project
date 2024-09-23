<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UpdateStatistics extends Command
{
    protected $signature = 'statistics:update';

    protected $description = 'Cập nhật số liệu thống kê hàng ngày';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Lấy ngày hiện tại
        $today = Carbon::now()->toDateString();

        // Tính toán tổng số users, orders, sales
        $totalUsers = DB::table('users')->count();
        $totalOrders = DB::table('orders')->count();
        $totalSales = DB::table('orders')->sum('total_price');

        // Cập nhật hoặc tạo mới bản ghi trong bảng statistics
        DB::table('statistics')->updateOrInsert(
            ['date' => $today],
            [
                'total_users' => $totalUsers,
                'total_orders' => $totalOrders,
                'total_sales' => $totalSales,
                'updated_at' => now(),
            ]
        );

        $this->info('Statistics updated successfully.');
    }
}
