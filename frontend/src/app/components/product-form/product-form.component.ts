import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {AlertService} from "../../services/alert.service";
import {Category} from "../../common/category";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  productForm: FormGroup;
  categories: Category[];
  loading = false;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getCategories();
    this.initProductForm();
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: this.product.name,
      description: this.product.description,
      count: this.product.count,
      price: this.product.price,
      category_id: this.product.category_id,
    });
  }

  save() {
    this.loading = true;
    let editedProduct = this.fillModel();
    this.productService.updateProduct(editedProduct).subscribe(
      () => {
        this.loading = false;
      location.reload();
      },
      error => {
        console.log(error);
        this.alertService.error(error);
        this.loading = false;
      });

  }

  fillModel(): Product {
    return new Product(
      this.product.id,
      this.productForm.get('name').value,
      this.productForm.get('description').value,
      this.productForm.get('count').value,
      this.productForm.get('price').value,
      this.productForm.get('category_id').value
    );
  }

  getCategories() {
    this.productService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  clearErrors() {
    this.alertService.clear();
  }

}
