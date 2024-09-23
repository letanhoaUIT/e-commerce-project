<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('statistics', function (Blueprint $table) {
            $table->integer('total_sales')->default(0)->change();
            $table->integer('total_orders')->default(0)->change();
            $table->integer('total_users')->default(0)->change();
        });
    }

    public function down(): void
    {
        Schema::table('statistics', function (Blueprint $table) {
            $table->integer('total_sales')->default(null)->change();
            $table->integer('total_orders')->default(null)->change();
            $table->integer('total_users')->default(null)->change();
        });
    }
};
