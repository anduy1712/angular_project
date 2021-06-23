import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Post } from '../model/post.model';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  //POST: CREATE PRODUCT
   createAndStorePosts(postData: Post) {
     this.http
      .post<{ name: string }>(
        'https://test-project-35ec0-default-rtdb.firebaseio.com/posts.json',

        postData
      )
      .subscribe((responseData) => {
      });
    console.log('Create Post')

  }
  //GET: GET PRODUCT
  fetchPosts() {
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
  //EDIT PRODUCT
  editPosts(post: Post) {
    return this.http.put<any>(`https://test-project-35ec0-default-rtdb.firebaseio.com/posts/${post.id}.json`,post).subscribe(data => console.log(data))
  }
  //DELETE PRODUCT
  deletePosts(id: string) {
    return this.http.delete<any>(`https://test-project-35ec0-default-rtdb.firebaseio.com/posts/${id}.json`).subscribe(data => console.log(data))
  }
  //GET CATOGORIES PRODUCT
  categoriesPosts() {
    return this.http
    .get<{[key:string]:Post}>('https://test-project-35ec0-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map((responseData: any) => {
        const postsArray = [];
        for(const key in responseData) {
          if (responseData[key].category == 'BLACKZERI')
          {
            if(responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
        }
        return postsArray;
      })
    )
  }
  //EDIT QUANTITY PRODUCT
  editQuantity(post: Post) {
    return this.http.put<any>(`https://test-project-35ec0-default-rtdb.firebaseio.com/posts/${post.id}.json`,post).subscribe(data => console.log(data))
  }
}
