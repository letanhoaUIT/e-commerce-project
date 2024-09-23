<?php

namespace App\Console\Commands;

use App\Models\Order; // Giả sử bạn có một model Order
use App\Models\Statistic;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DailyStatistic extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'statistics:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Calculate daily statistics';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Cronjob đang chạy...');

        $today = Carbon::today();

        // Tính toán số đơn hàng, sản phẩm bán được trong ngày
        $totalOrders = Order::whereDate('created_at', $today)->count();
        $totalSales = Order::whereDate('created_at', $today)->sum('total_price');

        // Tìm kiếm hoặc tạo một bản ghi Statistic cho ngày hôm nay
        $statistic = Statistic::where('date', $today)->firstOrCreate(['date' => $today]);

        // Cập nhật dữ liệu
        $statistic->total_orders = $totalOrders;
        $statistic->total_sales = $totalSales;
        $statistic->save();

        return Command::SUCCESS;
    }
}
