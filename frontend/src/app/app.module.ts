import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CategoryBarComponent } from './components/category-bar/category-bar.component';
import { ProductService } from "./services/product.service";
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    CategoryBarComponent,
    ProductListComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
