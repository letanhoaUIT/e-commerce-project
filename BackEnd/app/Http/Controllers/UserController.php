<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str; // Thêm dòng này

class UserController extends Controller
{
    // Get all users
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Get a single user
    public function show($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    // Create a new user
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role' => 'required|integer',
            ]);

            $validatedData['password'] = Hash::make($validatedData['password']);
            $user = User::create($validatedData);

            return response()->json($user, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    // Update an existing user
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user) {
            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
                'password' => 'sometimes|required|string|min:8',
                'role' => 'sometimes|required|integer',
            ]);

            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $user->update($validatedData);
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->update(['is_active' => false]);
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function findUserByEmailAndPassword($email, $password)
    {
        // Fetch the user using raw SQL query
        $user = DB::select('select * from users where email = ?', [$email]);

        // Check if user exists and password matches
        if ($user && Hash::check($password, $user[0]->password)) {
            return response()->json($user[0]);
        } else {
            return response()->json(['message' => 'Invalid email or password'], 404);
        }
    }

    public function googleLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'displayName' => 'required|string',
        ]);

        try {
            // Tìm user trong cơ sở dữ liệu
            $user = User::where('email', $request->email)->first();

            // Nếu user không tồn tại, tạo mới
            if (!$user) {
                $user = User::create([
                    'name' => $request->displayName,
                    'email' => $request->email,
                    'password' => Hash::make(Str::random(16)), // Tạo mật khẩu ngẫu nhiên
                    'role' => 0, // Role mặc định, có thể thay đổi theo nhu cầu
                ]);
            }

            // Đăng nhập người dùng
            Auth::login($user);

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Có lỗi xảy ra'], 500);
        }
    }
    public function listUsers(Request $request)
    {
        $limit = $request->query('limit', 10);
        $users = User::where('is_active', true)->paginate($limit);
        return response()->json($users);
    }

    public function authenticate(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'Invalid email or password'], 404);
        }
    }
}
