<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Closure;
use Illuminate\Support\Facades\Log;

class Authenticate {
    public function handle(Request $request, Closure $next): Response {
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $key = env('JWT_SECRET', 'secret');

            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            $token = (array) $decoded;
            $user = (array) $token['user'];
            Log::info('user', $user);
            
            $request->user = $token['user'];
        } 
        catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
