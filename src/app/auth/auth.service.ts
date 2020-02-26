import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {User} from './user';
import {__values} from "tslib";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedOut = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  get isLoggedOut() {
    return this.loggedOut.asObservable(); // {2}
  }


  constructor(private router: Router) { }

  login(user: User){
    if (user.userName !== '' && user.password !== '' ) { // {3}
      this.loggedIn.next(true);
      this.loggedOut.next(false);
      this.router.navigate(['/']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.loggedOut.next(true);
    this.router.navigate(['/login']);
  }
}
