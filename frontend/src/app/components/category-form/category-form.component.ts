import {Component, OnInit} from '@angular/core';
import {Category} from "../../common/category";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;
  categoryForm: FormGroup;
  categories: Category[];
  loading = false;
  option;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getCategories();
    this.initCategoryForm();
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: this.category.title,
      description: this.category.description,
      parent_id: this.category.parent_id
    });
  }

  save() {
    this.loading = true;
    let editedCategory = this.fillModel();

    switch (this.option) {
      case 'create':
        this.createCategory(editedCategory);
        break;
      case 'update': {
        this.updateCategory(editedCategory);
        break;
      }
    }
  }

  //TODO: avoid code duplicate
  createCategory(category) {
    this.categoryService.createCategory(category).subscribe(
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

  updateCategory(category) {
    this.categoryService.updateCategory(category).subscribe(
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

  fillModel(): Category {
    return new Category().build(
      this.category.id,
      this.categoryForm.get('name').value,
      this.categoryForm.get('description').value,
      this.categoryForm.get('parent_id').value
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  clearErrors() {
    this.alertService.clear();
  }

}
