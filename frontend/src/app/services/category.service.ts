import {ComponentRef, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../common/category";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {CategoryFormComponent} from "../components/category-form/category-form.component";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8000/api";
  private categoryComponentRef: ComponentRef<CategoryFormComponent>;

  constructor(private httpClient: HttpClient) { }

  getRootCategories(): Observable<Category[]> {
    const url = `${this.baseUrl}/category?root=true`;
    return this.httpClient.get<Category[]>(url).pipe(
      map(response => response)
    );
  }

  getCategories(parentId: number = null): Observable<Category[]> {
    const url = parentId != null? `${this.baseUrl}/category?parentId=${parentId}`: `${this.baseUrl}/category`;
    return this.httpClient.get<Category[]>(url).pipe(
      map(response => response)
    );
  }

  createCategory(category: Category) {
    const url = `${this.baseUrl}/category`;
    return this.httpClient.post<Category>(url, category).pipe(
      map(response => response)
    );
  }

  updateCategory(category: Category) {
    return this.httpClient.put<Category>(`${this.baseUrl}/category/${category.id}`, category)
      .pipe(map(response => response)
      );
  }

  getCategoryForm() {
    return this.categoryComponentRef;
  }

  setCategoryForm(categoryFormComponent) {
    this.categoryComponentRef = categoryFormComponent;
  }

  destroyCategoryForm() {
    this.categoryComponentRef.destroy();
    this.categoryComponentRef = null;
  }
}
