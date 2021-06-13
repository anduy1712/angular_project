import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  loadedPosts:Post[] = [];
  constructor(private route: ActivatedRoute,private postsService: PostsService) { }

  ngOnInit() {
    //Get id from route
    this.route.paramMap.subscribe((params: ParamMap)=> {
      const id = params.get('id');

      //Get Products 
      // Send Http request
      this.postsService.fetchPosts().subscribe( posts => {
      // this.isFetching = false;
      this.loadedPosts = posts.filter(item => {
        return item.id == id;
      })


     
    }, error =>{
      
    });
    })
   
    
  }

}
