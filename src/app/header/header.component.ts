import {Observable} from 'rxjs';
import {AuthService} from '../core/auth/auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  navigatorItems: string[] = [
    "home", "account"
  ];

  selectedItem: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.selectedItem = this.navigatorItems[0];
  }

  onSelect(item: string): void {
    this.selectedItem = item;
  }
  onLogout(){
    this.authService.logout().then(() => {});
  }
}
