<?php

namespace Tests;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function setUp(): void
    {
        parent::setUp();

        $this->clearDatabaseSchema();

        $this->artisan('cache:clear');
        $this->artisan('migrate');

        $this->prepareData();
    }

    public function clearDatabaseSchema($schema = 'ezshop')
    {
        DB::unprepared("drop database {$schema}");
        DB::unprepared("CREATE DATABASE {$schema}");
        DB::unprepared("use {$schema}");
    }

    public function prepareData()
    {
        $dump = $this->getFixture('dump.sql', false);

        if (empty($dump)) {
            return;
        }

        DB::unprepared($dump);
    }

    public function getFixture($fn, $failIfNotExists = true)
    {
        $path = $this->getFixturePath($fn);

        if (file_exists($path)) {
            return file_get_contents($path);
        }

        if ($failIfNotExists) {
            $this->fail($fn.' fixture does not exist');
        }

        return '';
    }

    public function getFixturePath($fn)
    {
        $class = get_class($this);
        $explodedClass = explode('\\', $class);
        $className = Arr::last($explodedClass);

        return base_path("tests/Unit/fixtures/{$className}/{$fn}");
    }

    public function getJsonFixture($fixture, $name)
    {
        $path = base_path("tests/Unit/fixtures/{$fixture}/{$name}");

        if (file_exists($path)) {
            return json_decode(file_get_contents($path), true);
        }

        throw new FileNotFoundException("Couldn't open file ".$path);
    }
}
