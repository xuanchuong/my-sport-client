import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Observable<boolean>; 
  navigatorItems: String[] = [
    "home", "contact"
  ];

  selectedItem: String;
    
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.selectedItem = this.navigatorItems[0];
  }

  onSelect(item: String): void {
    this.selectedItem = item;
  }
  onLogout(){
    this.authService.logout();
  }
}
