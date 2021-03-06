import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CustomersComponent } from './dashboard/customers/customers.component';
import { DetailCusComponent } from './dashboard/detail-cus/detail-cus.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { UsersComponent } from './dashboard/users/users.component';
import { ErrorComponent } from './error/error.component';
import { AccountComponent } from './home/account/account.component';
import { CartComponent } from './home/cart/cart.component';
import { DetailComponent } from './home/detail/detail.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './home/products/products.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "",component: HomeComponent},
  {path: "home",component: HomeComponent},
  {path: "home/cart",component: CartComponent},
  {path: "home/products/:id",component: ProductsComponent},
  {path: "home/detail/:id",component: DetailComponent},

  {path: "home/account",component: AccountComponent},
  {path: "login",component: LoginComponent},
  {
    path: "dashboard",
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      {path: "posts",component: PostsComponent},
      {path: "users",component: UsersComponent},
      {path: "customers",component: CustomersComponent},
      {path: "detailCus/:id",component: DetailCusComponent},


    ]
  },
  {path: "**",component: ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
