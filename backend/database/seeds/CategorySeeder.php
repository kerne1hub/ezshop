<?php

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i < 11; $i++) {
            DB::table('product_categories')->insert([
                'title'       => 'Категория #'.$i,
                'description' => 'Описание категории'.$i,
            ]);
        }
    }
}
