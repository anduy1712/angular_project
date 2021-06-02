import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../model/post.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  loadedPosts:Post[] = [];
  error = null;
  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // Send Http request
    this.postsService.fetchPosts().subscribe( posts => {
      // this.isFetching = false;
      this.loadedPosts = posts;
      console.log(this.loadedPosts)

     
    }, error =>{
      this.error = error.message;
    });
    
  }

}
