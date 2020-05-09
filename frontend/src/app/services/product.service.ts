import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../common/category";
import { map } from "rxjs/operators";
import { Product } from "../common/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) { }

  getRootCategories(): Observable<Category[]> {
    const url = `${this.baseUrl}/category?root=true`;
    return this.httpClient.get<Category[]>(url).pipe(
      map(response => response)
    );
  }

  getCategories(parentId: number): Observable<Category[]> {
    const url = `${this.baseUrl}/category?parentId=${parentId}`;
    return this.httpClient.get<Category[]>(url).pipe(
      map(response => response)
    );
  }

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
}
