import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './dashboard/header/header.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "login",component: LoginComponent},
  {path: "dashboard",component: HeaderComponent},
  {path: "dashboard/posts",component: PostsComponent},
  {path: "**",component: ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
