import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching = false;
  constructor(private postsService: PostsService,) { }

  ngOnInit() {
    this.postsService.fetchPosts().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error =>{
      
    });
   
    
  }

}
