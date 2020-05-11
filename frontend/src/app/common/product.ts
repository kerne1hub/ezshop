export class Product {
  id: number;
  name: string;
  description: string;
  count: number;
  price: number;
  category_id: number;


  constructor(id: number, name: string, description: string, count: number, price: number, category_id: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.count = count;
    this.price = price;
    this.category_id = category_id;
  }
}
