import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  p: number = 1;
  // collection: any[] = someArrayOfThings;
  isFetching = false;
  loadedUsers:User[] = [];
  user = {id:'',email:'',name:'',password:''};
  // tasksEdit= {};
  taskStatus = false;
  error = null;
  constructor(private userService: UserService) { }

  ngOnInit() {
    // Send Http request
    this.userService.fetchPosts().subscribe( users => {
      this.isFetching = false;
      this.loadedUsers = users;
    }, error =>{
      this.error = error.message;
    });
  }
  onDeletePosts(id: string) {
    
    
    
  }
  onEditPosts(id: string){
    
  }
}
