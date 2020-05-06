<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class ProductCategory.
 *
 * @property ProductCategory        $parentCategory
 * @property string                 $title
 * @property string                 $description
 */
class ProductCategory extends Model
{
    use SoftDeletes;

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'parent_id',
    ];

    public function parentCategory()
    {
        return $this->belongsTo(self::class, 'parent_id', 'id');
    }

    public function products()
    {
        return $this->hasMany('App\Models\Product');
    }
}
