INSERT INTO `product_categories`(id, title, description) VALUES
(1, 'Category 1', 'Category description'),
(2, 'Category 2', 'Category description'),
(3, 'Category 3', 'Category description');

INSERT INTO `product_categories`(id, title, description, parent_id) VALUES
(4, 'Category 4', 'Category description', 1);
