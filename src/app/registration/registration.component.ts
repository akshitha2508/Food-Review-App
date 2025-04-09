import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMsg: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registrationForm.invalid) {
      this.errorMsg = 'All fields are required';
      return;
    }

    const { username, email, password } = this.registrationForm.value;
    const success = this.auth.register(username, email, password);
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.errorMsg = 'Registration failed';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
