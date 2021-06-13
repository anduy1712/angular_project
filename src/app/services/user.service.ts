import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  constructor(private http: HttpClient) { }
  fetchPosts() {
    return this.http
    .get<{[key:string]:User}>('https://test-project-35ec0-default-rtdb.firebaseio.com/users.json')
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
  createAndStoreUsers(users: User) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://test-project-35ec0-default-rtdb.firebaseio.com/users.json',
        users
      )
      .subscribe((responseData) => {
      });
  }
  async findUser() {
    
    return await this.http
    .get<{ name: string }>('https://test-project-35ec0-default-rtdb.firebaseio.com/users.json')
    .pipe(
      map((responseData: any) => {
        const postsArray = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            postsArray.push(responseData[key]);
          }
        }
        return postsArray;
      })
    )
    
  }  
  
}
