INSERT INTO `product_categories` (id, title, description) VALUES
(1, 'Category 1', 'description'),
(2, 'Category 2', 'description');

INSERT INTO `products` (id, category_id, name, description, count, price) VALUES
(1, 1, 'Product 1', 'Product description', 5, 500),
(2, 1, 'Product 2', 'Product description', 6, 300),
(3, 2, 'Product 3', 'Product description', 1, 200);
