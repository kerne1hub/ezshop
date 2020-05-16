<?php

namespace Tests\Unit;

use Illuminate\Http\Response;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function testRegistrationAndLogin()
    {
        $user = $this->getJsonFixture('UserTest', 'create_user.json');

        $response = $this->json('post', '/api/auth/registration', $user);

        $response->assertStatus(Response::HTTP_OK);

        $response = $this->json('post', '/api/auth/login', $user);

        $response->assertStatus(Response::HTTP_OK);

        $this->assertNotEmpty($response->json('access_token'));
    }
}
