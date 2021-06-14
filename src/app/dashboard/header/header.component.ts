import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) { }
  @Output() isLogout = new EventEmitter<void>()

  ngOnInit(): void {
  }
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    this.authService.logout();
    this.router.navigate(['/home/account']);
    
  }
}
