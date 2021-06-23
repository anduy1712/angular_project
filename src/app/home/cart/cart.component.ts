import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  
  constructor(
    private cartService: CartService,
    private router: Router,
    private postsService: PostsService,
    private userService: UserService) { }
  //ITEM PRODUCT
  items = this.cartService.getItems();
  //TOTAL BILL
  total = this.items.reduce((sum:any,item:any)=> {
    return sum + Number(item.price) * Number(item.quantity);
  },0)
  //GET USER
  user = JSON.parse(localStorage.getItem('user')!);
  //CUSTOMER MODEL
  customer:Customer = 
    {
      id_user:this.user.uid,
      address:'',
      product:'',
    }
  custFrom:Customer[] = [];
  submitForm = false;
  ngOnInit(): void {
  //IF USER NULL, REDIRT TO HOME 
   if(localStorage.getItem('user') == null)
   {
     this.router.navigate(['/home'])
   }
  }
  removeItem(cart: any){
    this.items = this.cartService.removeItems(cart);
    this.total = this.items.reduce((sum:any,item:any)=> {
      return sum + Number(item.price);
    },0)
  }
  //CREATE CUSTOMER
   async onCreateCustomer(profile:any) {
     //Get profile user from ID 
    (await this.userService.findUser()).subscribe( users => {
      users.forEach(user => {
        profile.name = user.name;
        profile.email = user.email;

      })
      profile.product = this.items;
      profile.status = false; 
      //CREATE CUSTOMER
      // var id_product = profile.product.map((item:any) => {
      //   return item.id;
      // })
      // console.log(id_product);
     this.cartService.createCustomer(profile);
     //CLEAR CART
     this.cartService.clearCart();
     this.submitForm = true;

    })
     
  }
  editQuantity() {
    this.postsService.fetchPosts().subscribe( posts => {
      
    }, error =>{
      
    });
  }
}
