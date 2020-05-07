<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'AuthController@login');

Route::post('/product', 'ProductController@create');
Route::delete('/product/{id}', 'ProductController@delete');
Route::get('/product/{id}', 'ProductController@get');
Route::get('/product', 'ProductController@search');
Route::put('/product/{id}', 'ProductController@update');

Route::post('/category', 'ProductCategoryController@create');
Route::delete('/category/{id}', 'ProductCategoryController@delete');
Route::get('/category/{id}', 'ProductCategoryController@get');
Route::get('/category/', 'ProductCategoryController@search');
Route::put('/category/{id}', 'ProductCategoryController@update');
