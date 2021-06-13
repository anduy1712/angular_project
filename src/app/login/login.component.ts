import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {AuthService} from '../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  title = 'firebase-angular-auth';
  isSignedIn = false
  constructor(public firebaseService : FirebaseService,private authService: AuthService,private router: Router){}
  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }
  async onSignup(email:string,password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
    this.authService.login();
    this.router.navigate(['/dashboard/posts']);
  }
  handleLogout(){
    this.isSignedIn = false

  }

}