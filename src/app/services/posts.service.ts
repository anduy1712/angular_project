import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from '../model/post.model';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  //POST
  createAndStorePosts(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://test-project-35ec0-default-rtdb.firebaseio.com/posts.json',

        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
  //GET

  fetchPosts() {
    console.log('GET DATA.....')
    return this.http
    .get<{[key:string]:Post}>('https://test-project-35ec0-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map((responseData: any) => {
        const postsArray = [];
        for(const key in responseData) {
          
          if(responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray;
      })
    )}
    //DELETE
  
  editPosts(post: Post) {
    
    
    return this.http.put<any>(`https://test-project-35ec0-default-rtdb.firebaseio.com/posts/${post.id}.json`,post).subscribe(data => console.log(data))
  }  
  deletePosts(id: string) {
    
    
    return this.http.delete<any>(`https://test-project-35ec0-default-rtdb.firebaseio.com/posts/${id}.json`).subscribe(data => console.log(data))
  }  
}
