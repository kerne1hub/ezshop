import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Product } from "../common/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) { }

  getProducts(categoryId: number) {
    const url = `${this.baseUrl}/product?categoryId=${categoryId}`;
    return this.httpClient.get<Product[]>(url).pipe(
      map(response => response)
    );
  }

  searchProducts(keyword: string) {
    const url = `${this.baseUrl}/product?name=${keyword}`;
    return this.httpClient.get<Product[]>(url).pipe(
      map(response => response)
    );
  }

  createProduct(product: Product) {
    let name = product.name;
    let description = product.description;
    let count = product.count;
    let price = product.price;
    let category_id = product.category_id;

    return this.httpClient.post<any>(`http://localhost:8000/api/product`, {
      name, description, count, price, category_id
    })
      .pipe(map(response => {
        return response.product;
      }))
  }

  updateProduct(product: Product) {
    let name = product.name;
    let description = product.description;
    let count = product.count;
    let price = product.price;
    let category_id = product.category_id;

    return this.httpClient.put<any>(`http://localhost:8000/api/product/${product.id}`, {
      name, description, count, price, category_id
    })
      .pipe(map(response => {
        return response.product;
      }))
  }

  deleteProduct(productId: number) {
    return this.httpClient.delete(`http://localhost:8000/api/product/${productId}`);
  }
}
