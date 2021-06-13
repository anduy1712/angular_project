import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { ErrorComponent } from './error/error.component';
import { AngularFireModule } from '@angular/fire';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './home/products/products.component';
import { HeaderHomeComponent } from './home/header-home/header-home.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AccountComponent } from './home/account/account.component';
import { DetailComponent } from './home/detail/detail.component';
import { CartComponent } from './home/cart/cart.component';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    PostsComponent,
    ErrorComponent,
    HomeComponent,
    ProductsComponent,
    HeaderHomeComponent,
    AccountComponent,
    DetailComponent,
    CartComponent
  ],
  imports: [
    DashboardModule,
    NgxPaginationModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD1APCU2m2Dx1052G2fkqhztPZrCmqPcT4",
      authDomain: "test-project-35ec0.firebaseapp.com",
      databaseURL: "https://test-project-35ec0-default-rtdb.firebaseio.com",
      projectId: "test-project-35ec0",
      storageBucket: "test-project-35ec0.appspot.com",
      messagingSenderId: "914973618085",
      appId: "1:914973618085:web:0b8a50a8a58486b78ec24c",
      measurementId: "G-1R5Z1VV7EW"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
