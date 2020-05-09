<?php

namespace App\Services;

use App\Models\ProductCategory;
use Tymon\JWTAuth\JWTAuth;

class ProductCategoryService
{
    protected $auth;

    public function __construct()
    {
        $this->auth = app(JWTAuth::class);
    }

    public function create($data)
    {
        return ProductCategory::create($data);
    }

    public function delete($id)
    {
        ProductCategory::destroy($id);
    }

    public function getDetails($id)
    {
        return ProductCategory::with('products')->findOrFail($id);
    }

    public function search($data)
    {
        $isRoot = isset($data->root) ? $data['root'] : false;
        $parentId = isset($data->parentId) ? $data['parentId'] : null;

        if ($isRoot) {
            return ProductCategory::where('parent_id', null)->get();
        } elseif ($parentId) {
            return ProductCategory::where('parent_id', $parentId)->get();
        }

        return ProductCategory::all();
    }

    public function update($data, $id)
    {
        $category = ProductCategory::findOrFail($id);
        $category->fill($data);
        $category->save();

        return $category;
    }
}
