import {Product} from "./product";

export class Category {
  id: number;
  title: string;
  description: string;
  parent_id: number;
  products: Product[];

  constructor() {
  }

  build(id: number, title: string, description: string, parent_id: number): Category {
    this.id = id;
    this.title = title;
    this.description = description;
    this.parent_id = parent_id;
    return this;
  }
}
