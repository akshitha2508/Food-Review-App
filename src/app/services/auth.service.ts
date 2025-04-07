import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  login(uname: string, pword: string) {
    if (uname === 'Akshitha' && pword === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/home']);
      return 200;
    } else {
      return 403;
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}