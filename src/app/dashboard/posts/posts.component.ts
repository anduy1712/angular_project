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
  post = {id:'',title:'',content:'',img:'',category: '',price: 0,quantity: 0};
  // tasksEdit= {};
  taskStatus = false;
  error = null;

  title = 'Watch Shop';
  //GET PRODUCT WHEN LOAD
  ngOnInit() {
    this.postsService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
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
  //LOGOUT ACCOUNT 
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    this.authService.logout();
    this.router.navigate(['/home/account']);
    
  }
  //POST :EDIT AND CREATE PRODUCT
    onCreatePost(postData: {img: string;category: string; title: string; content: string;price: number;quantity: number; }) {
     //Check edit or create 
    if(this.taskStatus) 
    {
      //edit
      this.postsService.editPosts(this.post);
      this.post = {id:'',title:'',content:'',img:'',category: '',price:0,quantity:0};
    }
    else{
      //create 
      postData.price = Number(postData.price);
      postData.quantity = Number(postData.quantity);

      this.postsService.createAndStorePosts(postData);
      this.onFetchPosts()
    }
  }
  //GET PRODUCT
  onFetchPosts() {
    this.postsService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
  onClearPosts() {
   
    
  }
  //DELET POST
  onDeletePosts(id: string) {
    this.postsService.deletePosts(id);
  }
  //EDIT POST
  onEditPosts(id: string){
    this.taskStatus = true;
    this.loadedPosts.filter( post => {
      if(post.id ===id)
      {
        this.post.id = post.id as string;
        this.post.img = post.img as string;
        this.post.category = post.category as string;
        this.post.price = post.price as number;
        this.post.quantity = post.quantity as number;
        this.post.title = post.title as string;
        this.post.content = post.content as string;
      }
      return post.id === id;
    })
    
    
    
    
  }
}
