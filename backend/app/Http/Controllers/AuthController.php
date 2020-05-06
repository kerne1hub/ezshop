<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function login(LoginRequest $request, AuthService $service)
    {
        $result = $service->login($request);

        if ($result === false) {
            return response()->json([
                'message' => 'Authorization failed'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json($result)->header('Access-Control-Allow-Origin', '*');
    }
}
