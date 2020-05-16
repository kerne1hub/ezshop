<?php

namespace Tests\Unit;

use Illuminate\Http\Response;
use Tests\TestCase;

class ProductTest extends TestCase
{
    public function setUp(): Void
    {
        parent::setUp();
        $user = $this->getJsonFixture('UserTest', 'create_user.json');
        $this->json('post', '/api/auth/registration', $user);
        $this->json('post', '/api/auth/login', $user);
    }

    public function testCreate()
    {
        $product = $this->getJsonFixture('ProductTest', 'create_product.json');

        $response = $this->json('post', '/api/product', $product);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testUpdate()
    {
        $product = $this->getJsonFixture('ProductTest', 'update_product.json');

        $response = $this->json('put', 'api/product/1', $product);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testUpdateCategory()
    {
        $product = $this->getJsonFixture('ProductTest', 'update_product_category.json');

        $response = $this->json('put', 'api/product/1', $product);

        $response->assertStatus(Response::HTTP_OK);

        $categoryId = $response->json('category_id');

        $this->assertEquals(2, $categoryId);
    }

    public function testDelete()
    {
        $response = $this->json('delete', 'api/product/1');

        $response->assertStatus(Response::HTTP_OK);
    }

    public function testSearch()
    {
        $actual = $this->json('get', 'api/product');

        $expected = $this->getJsonFixture('ProductTest', 'search_product.json');

        $this->assertEquals($expected, $actual->json());
    }

    public function testSearchCategoryWithProducts()
    {
        $actual = $this->json('get', 'api/category/1');

        $expected = $this->getJsonFixture('ProductTest', 'search_category_with_products.json');

        $this->assertEquals($expected, $actual->json());
    }

    public function testSearchByCategory()
    {
        $actual = $this->json('get', 'api/product?categoryId=1');

        $expected = $this->getJsonFixture('ProductTest', 'search_product_by_category.json');

        $this->assertEquals($expected, $actual->json());
    }

    public function testSearchByName()
    {
        $actual = $this->json('get', 'api/product?name=2');

        $expected = $this->getJsonFixture('ProductTest', 'search_product_by_name.json');

        $this->assertEquals($expected, $actual->json());
    }
}
