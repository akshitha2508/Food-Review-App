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
    this. router.navigate(['/login']);
  }

  register(username: string, email: string, password: string): boolean {
    // Here you would typically make an API call to register the user
    // For now, we'll just simulate a successful registration
    try {
      // Store user data in localStorage (temporary solution)
      const userData = { username, email, password };
      localStorage.setItem('registeredUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }
}