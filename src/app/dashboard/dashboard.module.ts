import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../home/products/products.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomersComponent } from './customers/customers.component';

const dashboardRoutes: Routes = [
 
];

@NgModule({
  declarations: [
    UsersComponent,
    CustomersComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    BrowserModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
