import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {
  //Check login
  isSignedIn = false
  email= '';
  constructor(private cartService: CartService,private firebaseService: FirebaseService) { }
  items = this.cartService.getItems();
  ngOnInit(): void {
    if(localStorage.getItem('user')!== null)
    {var test = JSON.parse(localStorage.getItem('user')!);
    this.isSignedIn= true;
    this.email = test.email;
    }
    else
    this.isSignedIn = false
  }
  logOut(){
    this.isSignedIn= false;
    this.firebaseService.logout();
  }
}
