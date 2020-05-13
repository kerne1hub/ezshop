import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { ProductService } from "./services/product.service";
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import {AuthenticationService} from "./services/authentication.service";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import {CategoryService} from "./services/category.service";

const routes: Routes = [
  { path: 'register', component: RegistrationFormComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [
    AppComponent,
    CategoryBarComponent,
    ProductListComponent,
    SearchBarComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    AlertComponent,
    ProductFormComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbDropdownModule
  ],
  providers: [
    ProductService,
    CategoryService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
