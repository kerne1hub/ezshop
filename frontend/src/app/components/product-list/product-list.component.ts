import { Component, OnInit } from '@angular/core';
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Category} from "../../common/category";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  categories: Category[];
  currentCategoryId;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.getProducts();
      this.getCategories(this.currentCategoryId);
    })
  }

  getProducts() {
    const searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');

    searchMode ? this.getProductsByKeyword() : this.getProductsByCategory();
  }

  getProductsByCategory() {
    this.currentCategoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentCategoryId = this.currentCategoryId == null ? 1 : this.currentCategoryId;

    this.productService.getProducts(this.currentCategoryId).subscribe(
      data => this.products = data
    );
  }

  getProductsByKeyword() {
    const keyword: string = this.activatedRoute.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(keyword).subscribe(
      data => this.products = data
    );
  }

  getCategories(parentId: number) {
    this.productService.getCategories(parentId).subscribe(
      data => this.categories = data
    );
  }

}
