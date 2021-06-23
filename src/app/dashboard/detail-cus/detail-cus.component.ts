import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-detail-cus',
  templateUrl: './detail-cus.component.html',
  styleUrls: ['./detail-cus.component.css']
})
export class DetailCusComponent implements OnInit {
  loadedCustomers:Customer[] = [];
  products:any = null;
  error = null;

  constructor(private router: Router,private route: ActivatedRoute,private customerService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap)=> {
      const id = params.get('id');
      //Get Products 
      // Send Http request
      this.customerService.fetchPosts().subscribe( cust => {
      
      this.loadedCustomers = cust.filter(item => {
       
        return item.id_user == id;
      })
      this.products = this.loadedCustomers.map(item=> {
        return item.product;
      })
      console.log(this.products);

    }, error =>{
      this.error = error.message;
    });
    })
  }

}
