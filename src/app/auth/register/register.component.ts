import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  credentials = { email: '' , password: '', password2: ''};
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  password2 = new FormControl('', [Validators.required]);
  constructor() {
  }
  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required') || this.password2.hasError('required'))
      return 'You must enter a value';
    if (this.email.hasError('email'))
      return 'Not a valid email';
    if (this.credentials.password !== this.credentials.password2) {
      return 'Passwords do not match';
    }
    return '';
  }
  ngOnInit() {
  }
  isFormValid() {
    return this.getErrorMessage() === '';
  }
  register() {

  }
}
