import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../model/post.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  loadedPosts:Post[] = [];
  category = '';
  error = null;
  constructor(private router: Router,private postsService: PostsService,private route: ActivatedRoute,private cartService: CartService) { }

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
    }, error =>{
      this.error = error.message;
    });
    })
   
    
  }
  addToCart(product: Post) {
    if(localStorage.getItem('user')!== null)
    {
      this.cartService.addToCart(product);
      window.alert('Your product has been added to the cart!');
    }
    else{
      window.alert('Please login or register');
      this.router.navigate(['/home/account']);
    }
    
  }
}
