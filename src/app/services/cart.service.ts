import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Post[] = [];
  constructor(private http: HttpClient) { }
  addToCart(product: Post) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }
  removeItems(cart:any) {
    this.items = this.items.filter(item => {
      return item != cart;
    })
    return this.items;
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
  createCustomer(customers: any) {
    this.http
      .post<{ name: string }>(
        'https://test-project-35ec0-default-rtdb.firebaseio.com/customers.json',
        customers
      )
      .subscribe((responseData) => {
      });
  }
}
