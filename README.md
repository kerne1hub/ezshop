# EZ Shop Catalog

[![Build Status](https://travis-ci.com/kerne1hub/ezshop.svg?branch=master)](https://travis-ci.com/kerne1hub/ezshop)
[![StyleCI](https://github.styleci.io/repos/261363186/shield?branch=master)](https://github.styleci.io/repos/261363186)

Онлайн-каталог

Разработано при помощи Laravel и Angular

### Реализованный функционал:
    - [User]: Регистрация, авторизация;
    - [Product]: Добавление, изменение, удаление;
    - [Category]: Добавление, изменение, удаление;
    - [Product-Category]: Изменение родительской категории, перемещение продукта в другую категорию.
    
### Прочее:

Миграции БД: 
```sh
$ php artisan migrate
```

Заполнение БД (Seeds):
```sh
$ php artisan migrate:fresh --seed
```

Запуск тестов:
```sh
$ php artisan test
```