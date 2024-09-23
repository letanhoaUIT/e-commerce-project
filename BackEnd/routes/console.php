<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Lệnh inspire đã đúng và không cần thay đổi
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Định nghĩa lịch trình cho các tác vụ
Schedule::command('statistics:update')->daily();

