<?php

namespace App\Services;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\User;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthService
{
    use AuthenticatesUsers;

    protected $auth;
    protected $userModel;

    public function __construct()
    {
        $this->auth = app(JWTAuth::class);
        $this->userModel = app(User::class);
    }


    /**
     * @param \App\Http\Requests\Auth\LoginRequest $data
     * @return array|bool
     */
    public function login($data)
    {
        $credentials = $this->credentials($data);
        $token = $this->auth->attempt($credentials);

        if ($token === false) {
            return false;
        }

        $user = $this->userModel->where('email', $data['email'])->first();

        return [
            'token' => $token,
            'ttl' => config('jwt.ttl'),
            'refresh_ttl' => config('jwt.refresh_ttl'),
            'user' => $user
        ];
    }
}
