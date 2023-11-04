<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Firebase\JWT\JWT;

class User extends Model 
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var string[]
     */
    protected $hidden = [
        'password',
    ];


    const USER = 0;
    const SHIPPER = 1;
    const ADMIN = 2;

    public function isAdmin() {
        return $this->role == self::ADMIN;
    }

    public function isShipper() {
        return $this->role == self::SHIPPER;
    }

    public function isUser() {
        return $this->role == self::USER;
    }

    public function generateToken(): string {
        $key = env('JWT_SECRET', 'secret');
        $payload = [
            'iss' => env('APP_URL', 'http://localhost:8000'),
            'aud' => env('JWT_AUD', 'http://localhost:8000'),
            'iat' => time(),
            'nbf' => time(),
            'user' => [
                'id' => $this->id,
                'name' => $this->name,
                'role' => $this->role,
                'email' => $this->email,
                'username' => $this->username
            ]
        ];

        $jwt = JWT::encode($payload, $key, 'HS256');

        return $jwt;
    }
}
