export class Product {
  id: number;
  name: string;
  description: string;
  count: number;
  price: number;
  category_id: number;


  constructor() {
  }

  build(id: number, name: string, description: string, count: number, price: number, category_id: number): Product {
    this.id = id;
    this.name = name;
    this.description = description;
    this.count = count;
    this.price = price;
    this.category_id = category_id;
    return this;
  }
}
