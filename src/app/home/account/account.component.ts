import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user = {id:'',name:'',email:'',password:'',author:''};
  isSignedIn = false
  constructor(public firebaseService : FirebaseService,private authService: AuthService,private router: Router,private usersService: UserService){}
  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    {
      this.isSignedIn= true
      this.router.navigate(['/home'])
    }
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
    {
      this.isSignedIn = true;
      this.authService.login(); //true 

      // this.router.navigate(['/dashboard/posts']);
  }
  }
  handleLogout(){
    this.isSignedIn = false

  }
  async onCreateUser(postData:any) {
    await this.onSignup(postData.email,postData.password);
    var uid = JSON.parse(localStorage.getItem('user')!)
    this.user.id = uid.uid;
    this.user.author = '';
    this.usersService.createAndStoreUsers({...this.user,...postData});
    this.router.navigate(['/home']);
 }
}
