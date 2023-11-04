<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Closure;

class Authenticate {
    public function handle(Request $request, Closure $next, int $role = null): Response {
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $key = env('JWT_SECRET', 'secret');
            
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            
            $token = (array) $decoded;

            if ($role && $token['user']->role !== $role) {
                return response()->json([
                    'error' => 'You are not authorized to access this resource'
                ], 401);
            }
            
            $request->user = $token['user'];
        } 
        catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
