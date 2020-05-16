<?php

namespace Tests\Unit;

use Illuminate\Http\Response;
use Tests\TestCase;

class ProductCategoryTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $user = $this->getJsonFixture('UserTest', 'create_user.json');
        $this->json('post', '/api/auth/registration', $user);
        $this->json('post', '/api/auth/login', $user);
    }


    public function testCreateRoot()
    {
        $category = $this->getJsonFixture('ProductCategoryTest', 'create_category.json');

        $response = $this->json('post', '/api/category', $category);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testCreateNested()
    {
        $category = $this->getJsonFixture('ProductCategoryTest', 'create_category_nested.json');

        $response = $this->json('post', 'api/category', $category);

        $response->assertStatus(Response::HTTP_OK);

        $parentId = $response->json('parent_id');

        $this->assertEquals(1, $parentId);
    }

    public function testUpdate()
    {
        $category = $this->getJsonFixture('ProductCategoryTest', 'update_category.json');

        $response = $this->json('put', 'api/category/1', $category);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testUpdateParent()
    {
        $category = $this->getJsonFixture('ProductCategoryTest', 'update_category_parent.json');

        $response = $this->json('put', 'api/category/2', $category);

        $response->assertStatus(Response::HTTP_OK);

        $parentId = $response->json('parent_id');

        $this->assertEquals(1, $parentId);
    }

    public function testDelete()
    {
        $response = $this->json('delete', 'api/category/1');

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testSearch()
    {
        $actual = $this->json('get', 'api/category');

        $expected = $this->getJsonFixture('ProductCategoryTest', 'search_category.json');

        $this->assertEquals($expected, $actual->json());
    }

    public function testSearchRoot()
    {
        $actual = $this->json('get', 'api/category?root=true');

        $expected = $this->getJsonFixture('ProductCategoryTest', 'search_category_root.json');

        $this->assertEquals($expected, $actual->json());
    }

    public function testSearchByParent()
    {
        $actual = $this->json('get', 'api/category?parentId=1');

        $expected = $this->getJsonFixture('ProductCategoryTest', 'search_category_by_parent.json');

        $this->assertEquals($expected, $actual->json());
    }
}
