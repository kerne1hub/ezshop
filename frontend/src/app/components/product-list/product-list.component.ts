import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Category} from "../../common/category";
import {AlertService} from "../../services/alert.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ProductFormComponent} from "../product-form/product-form.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  componentRef: ComponentRef<ProductFormComponent>;

  products: Product[];
  categories: Category[];
  isLoggedIn = false;
  currentCategoryId;

  constructor(private activatedRoute: ActivatedRoute,
              private resolver: ComponentFactoryResolver,
              private productService: ProductService,
              private authService: AuthenticationService,
              private alertService: AlertService,
              private viewContainerRef: ViewContainerRef) {
    this.authService.currentUser.subscribe(
      user => this.isLoggedIn = user != null
    )
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.getProducts();
      this.getCategories(this.currentCategoryId);
    })
  }

  createComponent(product: Product = null) {
    if (!this.componentRef) {
      const componentFactory: ComponentFactory<ProductFormComponent> =
        this.resolver.resolveComponentFactory(ProductFormComponent);

      this.componentRef = this.viewContainerRef.createComponent(componentFactory);

      if (product) {
        this.componentRef.instance.product = product;
        this.componentRef.instance.option = 'update';
      } else {
        this.componentRef.instance.product = new Product();
        this.componentRef.instance.option = 'create';
      }

    } else {
      this.updateComponent(product);
    }

  }

  updateComponent(product: Product) {
    if (product) {
      this.componentRef.instance.product = product;
      this.componentRef.instance.option = 'update';
      this.componentRef.instance.initProductForm();
    } else {
      this.componentRef.instance.product = new Product();
      this.componentRef.instance.option = 'create';
      this.componentRef.instance.initProductForm();
    }
  }

  destroyComponent() {
    this.componentRef.destroy();
    this.componentRef = null;
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

  deleteProduct(productId: number) {
    console.log(productId);
    this.productService.deleteProduct(productId).subscribe();
  }

  clearErrors() {
    this.alertService.clear();
  }

}
