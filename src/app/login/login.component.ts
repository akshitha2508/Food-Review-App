import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  errorMsg = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  login() {
    if (this.username.trim().length === 0) {
      this.errorMsg = "Username is Required";
    }
    else if (this.password.trim().length === 0) {
      this.errorMsg = "Password is Required";
    } else {
      this.errorMsg = "";
      let res = this.auth.login(this.username,this.password);
    if (res === 200) {
      this.router.navigate(['home'])
    }
    if (res === 403) {
      this.errorMsg = "Invalid Credentials";
    }
    }
  }
  // Add this method to the LoginComponent class
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
