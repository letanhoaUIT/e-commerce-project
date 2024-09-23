<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Kiểm tra nếu người dùng đã đăng nhập và là admin
        if (Auth::check() && Auth::user()->isAdmin()) {
            return $next($request);
        }

        // Nếu không phải admin, trả về lỗi 403 (Forbidden)
        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
