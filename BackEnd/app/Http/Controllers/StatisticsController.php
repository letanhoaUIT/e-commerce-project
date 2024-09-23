<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatisticsController extends Controller
{
    /**
     * Fetch statistics data for a given date range.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatistics(Request $request)
    {
        $startDate = $request->query('start_date', Carbon::now()->startOfYear()->toDateString());
        $endDate = $request->query('end_date', Carbon::now()->toDateString());

        $statistics = DB::table('statistics')
            ->whereBetween('date', [$startDate, $endDate])
            ->get();

        // Prepare the response data
        $labels = [];
        $sales = [];
        $orders = [];
        $users = [];

        foreach ($statistics as $stat) {
            $labels[] = $stat->date;
            $sales[] = $stat->total_sales;
            $orders[] = $stat->total_orders;
            $users[] = $stat->total_users;
        }

        return response()->json([
            'labels' => $labels,
            'sales' => $sales,
            'orders' => $orders,
            'users' => $users,
        ]);
    }

    /**
     * Update statistics data based on the current state of the database.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatistics()
    {
        // Aggregate statistics data
        $totalUsers = DB::table('users')->count();
        $totalOrders = DB::table('orders')->count();
        $totalSales = DB::table('orders')->sum('total_price');

        // Get the current date
        $currentDate = Carbon::now()->toDateString();

        // Update or insert the statistics record for today
        DB::table('statistics')->updateOrInsert(
            ['date' => $currentDate],
            [
                'total_users' => $totalUsers,
                'total_orders' => $totalOrders,
                'total_sales' => $totalSales,
                'updated_at' => now(),
            ]
        );

        return response()->json(['message' => 'Statistics updated successfully']);
    }

    /**
     * Reset statistics data (for admin purposes).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetStatistics()
    {
        // Reset statistics data
        DB::table('statistics')->truncate();

        return response()->json(['message' => 'Statistics data reset successfully']);
    }
}
