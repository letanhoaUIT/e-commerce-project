<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_user()
    {
        // Data to be sent in the request
        $data = [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password123',
            'role' => 0,
        ];

        // Simulate a POST request to the store method
        $response = $this->postJson('/api/users', $data);

        // Assert that the response status is 201 (Created)
        $response->assertStatus(201);

        // Assert that the user is created in the database
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
        ]);

        // Assert that the password is hashed
        $user = User::where('email', 'testuser@example.com')->first();
        $this->assertTrue(Hash::check('password123', $user->password));
    }
}
