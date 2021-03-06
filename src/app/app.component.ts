import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import {Post} from './model/post.model';
import {PostsService} from './services/posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isFetching = false;
  loadedPosts:Post[] = [];
  post = {id:'',title:'',content:'',img:'',category: '',price: 0};
  // tasksEdit= {};
  taskStatus = false;
  error = null;

  title = 'angular-tour-of-heroes';
  ngOnInit() {
    this.postsService.categoriesPosts().subscribe( posts => {
     
    }, error =>{
      this.error = error.message;
    })
    // Send Http request
    this.postsService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;

     
    }, error =>{
      this.error = error.message;
    });
    
  }
  constructor(private http: HttpClient,private postsService: PostsService) {}
  //POST: EDIT AND CREATE PRODUCT
   onCreatePost(postData: {img: string;category: string; title: string; content: string;price: number }) {
    if(this.taskStatus)
    {
      this.postsService.editPosts(this.post);
      this.post = {id:'',title:'',content:'',img:'',category: '',price: 0};
    }
    else{
      console.log(postData);
      this.postsService.createAndStorePosts(postData);
      this.onFetchPosts()
    }
  }
  //GET PRODUCT
  onFetchPosts() {
    // Send Http request
    this.postsService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
  onClearPosts() {
    // Send Http request
    // this.postsService.deletePosts()
    
    
  }
  //DELETE PRODUCT
  onDeletePosts(id: string) {
    this.postsService.deletePosts(id);
  }
  //EDIT PRODUCT
  onEditPosts(id: string){
    this.taskStatus = true;
    this.loadedPosts.filter( post => {
      if(post.id ===id)
      {
        this.post.id = post.id as string;
        this.post.img = post.img as string;
        this.post.category = post.category as string;
        this.post.title = post.title as string;
        this.post.content = post.content as string;
      }
      


      return post.id === id;
    })
    
    
    
    
  }
}



