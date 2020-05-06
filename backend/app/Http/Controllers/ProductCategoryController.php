<?php

namespace App\Http\Controllers;

use App\Services\ProductCategoryService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductCategoryController extends Controller
{
    private $categoryService;

    public function __construct()
    {
        $this->categoryService = app(ProductCategoryService::class);
    }

    public function create(CreateProductCategoryRequest $request)
    {
        $result = $this->categoryService->create($request->all());
        return response()->json($result);
    }

    public function delete($id)
    {
        $this->categoryService->delete($id);
        return response('', Response::HTTP_OK);
    }

    public function get($id)
    {
        $result = $this->categoryService->getDetails($id);
        return response()->json($result);
    }

    public function search()
    {
        $result = $this->categoryService->search();
        return response()->json($result);
    }

    public function update($request, $id)
    {
        $result = $this->categoryService->update($request->all(), $id);
        return response()->json($result);
    }
}
