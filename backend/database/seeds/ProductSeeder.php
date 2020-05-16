<?php

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i < 6; $i++) {
            DB::table('products')->insert([
                'name'        => 'Продукт #'.$i,
                'description' => 'Описание продукта'.$i,
                'category_id' => 1,
                'count'       => $i,
                'price'       => rand(10, 1000),
            ]);
        }
    }
}
