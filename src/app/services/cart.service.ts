import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Post[] = [];
  constructor(private http: HttpClient) { }
  //ADD ITEM
  addToCart(product: Post) {

    var isSame = false;
    this.items.forEach(item => {
      if(item.id == product.id)
      {
        isSame = true;
        item.quantity = item.quantity as number + 1 
        console.log('Cart bi trung')
      }
    })
    if(!isSame)
    {
      console.log('Cart khong bi trung')
      product.quantity = 1;
      this.items.push(product);
    }
  }
  //GET ITEM
  getItems() {
    return this.items;
  }
  getQuantity() {
    
    return this.items.reduce((sum:any,item) => {
      return sum + item.quantity
    },0)
  }
  //REMOVE ITEM
  removeItems(cart:any) {
    this.items = this.items.filter(item => {
      return item != cart;
    })
    return this.items;
  }
  //REMOVE CART
  clearCart() {
    this.items = [];
    return this.items;
  }
  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
  //CREATE CUSTOMER 
  createCustomer(customers: any) {
    this.http
      .post<{ name: string }>(
        'https://test-project-35ec0-default-rtdb.firebaseio.com/customers.json',
        customers
      )
      .subscribe((responseData) => {
      });
  }
  //GET CUSTOMER
  fetchPosts() {
    return this.http
    .get<{[key:string]:Customer}>('https://test-project-35ec0-default-rtdb.firebaseio.com/customers.json')
    .pipe(
      map((responseData: any) => {
        const usersArray = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            usersArray.push(responseData[key]);
          }
        }
        return usersArray;
      })
    )}
}
