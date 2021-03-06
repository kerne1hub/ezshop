<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateCategoryRequest;
use App\Http\Requests\Product\UpdateCategoryRequest;
use App\Services\ProductCategoryService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductCategoryController extends Controller
{
    private $categoryService;

    public function __construct()
    {
        $this->categoryService = app(ProductCategoryService::class);
        $this->middleware('auth:api', ['except' => ['get', 'search']]);
    }

    public function create(CreateCategoryRequest $request)
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

    public function search(Request $request)
    {
        $result = $this->categoryService->search($request);

        return response()->json($result);
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $result = $this->categoryService->update($request->all(), $id);

        return response()->json($result);
    }
}
