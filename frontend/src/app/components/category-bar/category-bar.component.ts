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
    this.getCategories();
  }

  getCategories() {
    this.productService.getProductCategories().subscribe(
      data => this.productCategories = data
    )
  }

}
