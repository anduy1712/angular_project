import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import {Post} from '../../model/post.model';
import {PostsService} from '../../services/posts.service';
import { FirebaseService } from '../../services/firebase.service';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  p: number = 1;
  // collection: any[] = someArrayOfThings;
  isFetching = false;
  loadedPosts:Post[] = [];
  post = {id:'',title:'',content:'',img:'',category: '',price:''};
  // tasksEdit= {};
  taskStatus = false;
  error = null;

  title = 'angular-tour-of-heroes';
  ngOnInit() {
    // Send Http request
    this.postsService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      // console.log(this.loadedPosts)

     
    }, error =>{
      this.error = error.message;
    });
    
  }
  @Output() isLogout = new EventEmitter<void>()
  constructor(
    private http: HttpClient,
    private postsService: PostsService,
    public firebaseService: FirebaseService,
    private authService: AuthService,private router: Router) {}
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    this.authService.logout();
    this.router.navigate(['/home/account']);
    
  }
  //POST
   onCreatePost(postData: {img: string;category: string; title: string; content: string;price: string; }) {
     //Check edit or create 
    if(this.taskStatus) //edit
    {
      this.postsService.editPosts(this.post);
      this.post = {id:'',title:'',content:'',img:'',category: '',price:''};
    }
    else{
      //create 
      this.postsService.createAndStorePosts(postData);
      this.onFetchPosts()
    }
  }
  //GET

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
  onDeletePosts(id: string) {
    
    
    this.postsService.deletePosts(id);
  }
  onEditPosts(id: string){
    this.taskStatus = true;
    this.loadedPosts.filter( post => {
      if(post.id ===id)
      {
        this.post.id = post.id as string;
        this.post.img = post.img as string;
        this.post.category = post.category as string;
        this.post.price = post.price as string;
        this.post.title = post.title as string;
        this.post.content = post.content as string;
      }
      


      return post.id === id;
    })
    
    
    
    
  }
}
