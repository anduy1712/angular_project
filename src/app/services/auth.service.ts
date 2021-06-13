import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized = false;
  constructor() { }
  login() {
    console.log('vo dc roi')

    this.isAuthorized = true;
    console.log(this.isAuthorized,'test')

    
  }
  logout() {
    this.isAuthorized = false;
  }
}
