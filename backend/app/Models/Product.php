<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Product.
 *
 * @property ProductCategory        $category
 * @property string                 $name
 * @property string                 $description
 * @property int                    $count
 * @property int                    $price
 * @property int                    $version
 */
class Product extends Model
{
    use SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'count',
        'price',
        'version',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo('App\ProductCategory', 'category_id', 'id');
    }
}
