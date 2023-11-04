<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    public function login(Request $r) {
        $validated = $this->validate($r, [
            'username_or_email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('username', $validated['username_or_email'])
            ->orWhere('email', $validated['username_or_email'])
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        if (!Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid password'
            ], 401);
        }

        $token = $user->generateToken();

        return response()->json([
            'message' => 'Login successful',
            'token' => $token
        ]);
    }

    public function register(Request $r) {
        $validated = $this->validate($r, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'username' => 'required|string|unique:users',
            'password' => 'required|string'
        ]);

        $user = new User();

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->username = $validated['username'];
        $user->password = Hash::make($validated['password']);
        $user->role = User::USER;
        
        $user->save();

        $token = $user->generateToken();
        return response()->json([
            'message' => 'Registration successful',
            'token' => $token
        ]);
    }
}