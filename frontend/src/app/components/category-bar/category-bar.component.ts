import { Component, OnInit } from '@angular/core';
import { Category } from "../../common/category";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent implements OnInit {

  productCategories: Category[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getRootCategories();
  }

  getRootCategories() {
    this.productService.getRootCategories().subscribe(
      data => this.productCategories = data
    )
  }

  getCategories(parentId: number): Category[] {
    let categories = null;
    this.productService.getCategories(parentId).subscribe(
      data => categories = data
    );
    return categories;
  }

}
