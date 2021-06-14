import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  p: number = 1;
  // collection: any[] = someArrayOfThings;
  isFetching = false;
  loadedCustomers:Customer[] = [];
  cust = {id:'',email:'',name:'',address:'',status:''};
  // tasksEdit= {};
  taskStatus = false;
  error = null;
  //Open modal
  
  constructor(private customerService: CartService) { }

  ngOnInit() {
    // Send Http request
    this.customerService.fetchPosts().subscribe( users => {
      this.isFetching = false;
      this.loadedCustomers = users;
    }, error =>{
      this.error = error.message;
    });
  }
  onDeletePosts(id: string) {
    
    
    
  }
  onEditPosts(id: string){
    
  }
  openModal(id: string) {

  }

}
