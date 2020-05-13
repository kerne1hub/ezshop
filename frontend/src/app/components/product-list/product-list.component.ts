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
import {CategoryService} from "../../services/category.service";
import {CategoryFormComponent} from "../category-form/category-form.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private productComponentRef: ComponentRef<ProductFormComponent>

  products: Product[];
  categories: Category[];
  isLoggedIn = false;
  currentCategoryId;

  constructor(private activatedRoute: ActivatedRoute,
              private resolver: ComponentFactoryResolver,
              private productService: ProductService,
              private categoryService: CategoryService,
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
    });
  }

  createComponent(type: string, instance = null) {
      switch (type) {
        case 'product': {
          if (this.productComponentRef) {
            this.updateComponent(type, instance, this.productComponentRef);
          } else {
            this.createProductForm(instance);
          }
          break;
        }
        case 'category': {
          this.createCategoryForm(instance);
          break;
        }
      }
  }

  private updateComponent(type: string, instance = null, component: ComponentRef<any>) {
    let componentInstance = Reflect.get(component, 'instance');

    switch (type) {
      case 'product': {
        if (instance) {
          componentInstance.product = instance;
          componentInstance.option = 'update';
          componentInstance.initProductForm();
        } else {
          componentInstance.product = new Product();
          componentInstance.option = 'create';
          componentInstance.initProductForm();
        }
        break;
      }
      case 'category': {
        componentInstance = this.categoryService.getCategoryForm().instance;
        if (instance) {
          componentInstance.category = instance;
          componentInstance.option = 'update';
          componentInstance.initCategoryForm();
        } else {
          componentInstance.category = new Category();
          componentInstance.option = 'create';
          componentInstance.initCategoryForm();
        }
        break;
      }
    }
  }

  private createCategoryForm(instance: Category) {
    if (this.categoryService.getCategoryForm()) {
      this.categoryService.destroyCategoryForm();
    }

    const componentFactory: ComponentFactory<CategoryFormComponent> =
      this.resolver.resolveComponentFactory(CategoryFormComponent);

    this.categoryService.setCategoryForm(this.viewContainerRef.createComponent(componentFactory));
    let componentInstance = this.categoryService.getCategoryForm().instance;

    if (instance) {
      componentInstance.category = instance;
      componentInstance.option = 'update';
    } else {
      componentInstance.category = new Category();
      componentInstance.option = 'create';
    }
  }

  private createProductForm(instance: Product) {
    const componentFactory: ComponentFactory<ProductFormComponent> =
      this.resolver.resolveComponentFactory(ProductFormComponent);

    this.productComponentRef = this.viewContainerRef.createComponent(componentFactory);
    let componentInstance = this.productComponentRef.instance;

    if (instance) {
      componentInstance.product = instance;
      componentInstance.option = 'update';
    } else {
      componentInstance.product = new Product();
      componentInstance.option = 'create';
    }
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
    this.categoryService.getCategories(parentId).subscribe(
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
