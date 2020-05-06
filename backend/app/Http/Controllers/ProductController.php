<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    private $productService;

    public function __construct()
    {
        $this->productService = app(ProductService::class);
    }

    public function create(CreateProductRequest $request)
    {
        $result = $this->productService->create($request->all());
        return response()->json($result);
    }

    public function delete($id)
    {
        $this->productService->delete($id);
        return response('', Response::HTTP_OK);
    }

    public function get($id)
    {
        $result = $this->productService->getDetails($id);
        return response()->json($result);
    }

    public function search(Request $request)
    {
        /**
         * /category/{id}/products
         *
         * @var $categoryId
         */
        $categoryId = $request['id'];
        $result = $this->productService->search($categoryId);
        return response()->json($result);
    }

    public function update($id, UpdateProductRequest $request)
    {
        $result = $this->productService->update($request->all(), $id);
        return response()->json($result);
    }

}
