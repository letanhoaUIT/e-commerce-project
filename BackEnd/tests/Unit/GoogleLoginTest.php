<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class GoogleLoginTest extends TestCase
{

    public function test_google_login_existing_user()
    {
        // Tạo một người dùng đã tồn tại
        $user = User::factory()->create([
            'email' => '21522081@gm.uit.edu.vn',
            'name' => 'Expected Name',
        ]);

        // Dữ liệu yêu cầu
        $data = [
            'email' => '21522081@gm.uit.edu.vn',
            'displayName' => 'Expected Name',
        ];

        // Gửi yêu cầu POST
        $response = $this->postJson('/api/google-login', $data);

        // Kiểm tra phản hồi
        $response->assertStatus(200)
            ->assertJsonFragment([
                'email' => '21522081@gm.uit.edu.vn',
                'name' => 'Expected Name',
            ]);

        // Kiểm tra người dùng đã đăng nhập
        $this->assertTrue(Auth::check());
    }


    public function test_google_login_new_user()
    {
        // Dữ liệu yêu cầu
        $data = [
            'email' => 'newuser@example.com',
            'displayName' => 'New User',
        ];

        // Gửi yêu cầu POST
        $response = $this->postJson('/api/google-login', $data);

        // Kiểm tra phản hồi
        $response->assertStatus(200)
            ->assertJson([
                'email' => 'newuser@example.com',
                'name' => 'New User',
            ]);

        // Kiểm tra người dùng đã được tạo
        $this->assertDatabaseHas('users', [
            'email' => 'newuser@example.com',
            'name' => 'New User',
        ]);

        // Kiểm tra người dùng đã đăng nhập
        $this->assertTrue(Auth::check());
    }

    public function test_google_login_validation()
    {
        // Dữ liệu yêu cầu không hợp lệ
        $data = [
            'email' => 'invalid-email',
            'displayName' => '',
        ];

        // Gửi yêu cầu POST
        $response = $this->postJson('/api/google-login', $data);

        // Kiểm tra phản hồi
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'displayName']);
    }
}
