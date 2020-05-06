<?php

namespace App\Services;

use App\Models\Product;
use Tymon\JWTAuth\JWTAuth;

class ProductService
{
    protected $auth;

    public function __construct()
    {
        $this->auth = app(JWTAuth::class);
    }

    public function create($data)
    {
        return Product::create($data);
    }

    public function delete($id)
    {
        Product::destroy($id);
    }

    public function getDetails($id)
    {
        return Product::findOrFail($id);
    }

    public function search($categoryId)
    {
        if ($categoryId) {
            return Product::where('category_id', $categoryId)->get();
        }

        return Product::all();
    }

    public function update($data, $id)
    {
        $product = Product::findOrFail($id);
        $product->fill($data);
        $product->version++;
        $product->save();

        return $product;
    }
}
