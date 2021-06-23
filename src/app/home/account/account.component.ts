import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
    
   });
  user = {id:'',name:'',email:'',password:'',auth:''};
  isSignedIn = false
  constructor(public firebaseService : FirebaseService,private authService: AuthService,private router: Router,private usersService: UserService){}
  //REDIRT HOME WHEN USER Login
  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    {
      this.isSignedIn= true
      this.router.navigate(['/home'])
    }
    else
    this.isSignedIn = false
  }
  //SIGN UP
  async onSignup(email:string,password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }
  //SIGN IN
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    {
      this.isSignedIn = true;
      this.authService.login(); //true 

      this.router.navigate(['/home']);
  }
  }
  //LOG OUT
  handleLogout(){
    this.isSignedIn = false

  }
  onSubmit(){
    alert(JSON.stringify(this.form.value));
  }
  async onCreateUser(postData:any) {
    await this.onSignup(postData.email,postData.password);
    var uid = JSON.parse(localStorage.getItem('user')!)
    this.user.id = uid.uid;
    this.user.auth = 'user';
    this.usersService.createAndStoreUsers({...this.user,...postData});
    this.router.navigate(['/home']);
 }
}
