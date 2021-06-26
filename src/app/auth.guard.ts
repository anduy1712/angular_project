import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router){}
  isSignedIn = false;
  ngOnInit(){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(localStorage.getItem('user')!== null)
      {
        var user = JSON.parse(localStorage.getItem('user')!)
        this.isSignedIn = user.email == 'admin@gmail.com' ? true : false;
        console.log(this.isSignedIn);
      }
      else
      this.isSignedIn = false
    return this.isSignedIn;
  }
  
}
