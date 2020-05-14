import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { Category } from "../../common/category";
import {CategoryService} from "../../services/category.service";
import {AlertService} from "../../services/alert.service";
import {CategoryFormComponent} from "../category-form/category-form.component";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent implements OnInit {

  productCategories: Category[];
  isLoggedIn = false;

  constructor(private categoryService: CategoryService,
              private authService: AuthenticationService,
              private alertService: AlertService,
              private resolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
    this.authService.currentUser.subscribe(
      user => this.isLoggedIn = user != null
    )
  }

  ngOnInit(): void {
    this.getRootCategories();
  }

  getRootCategories() {
    this.categoryService.getRootCategories().subscribe(
      data => this.productCategories = data
    )
  }

  getCategories(parentId: number): Category[] {
    let categories = null;
    this.categoryService.getCategories(parentId).subscribe(
      data => categories = data
    );
    return categories;
  }

  createComponent(instance: Category) {
    if (!this.categoryService.getCategoryForm()) {
      const componentFactory: ComponentFactory<CategoryFormComponent> =
        this.resolver.resolveComponentFactory(CategoryFormComponent);

      this.categoryService.setCategoryForm(this.viewContainerRef.createComponent(componentFactory));

      this.categoryService.getCategoryForm().instance.category = instance;
      this.categoryService.getCategoryForm().instance.option = 'update';
    } else {
      this.categoryService.destroyCategoryForm();
      this.createComponent(instance);
    }
  }

  clearErrors() {
    this.alertService.clear();
  }

}
