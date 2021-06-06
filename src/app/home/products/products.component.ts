import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../model/post.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  loadedPosts:Post[] = [];
  category = '';
  error = null;
  constructor(private postsService: PostsService,private route: ActivatedRoute) { }

  ngOnInit() {
    //Get id from route
    this.route.paramMap.subscribe((params: ParamMap)=> {
      const id = params.get('id');
      //Get Products 
      // Send Http request
      this.postsService.fetchPosts().subscribe( posts => {
      // this.isFetching = false;
      this.loadedPosts = posts.filter(item => {
        if(id == 'men')
        {
          return item.category;
        }
        return item.category.toLowerCase() == id;
      })

      console.log(this.loadedPosts)

     
    }, error =>{
      this.error = error.message;
    });
    })
   
    
  }

}
