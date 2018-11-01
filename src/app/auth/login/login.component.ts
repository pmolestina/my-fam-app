import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '@ngrx/store';
import { Credentials } from '../../model/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = new Credentials();
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  constructor(private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar) { }

  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }
  ngOnInit() {
  }
  login(custom) {
    if (custom) {
      this.authService.loginCustom(this.credentials.email, this.credentials.password)
        .then(_ => this.router.navigate(['/home']))
        .catch(error => {
          console.log('auth-error-login', error)
          this.openSnackBar(error, 'Close' );
        }); }
    else {
      this.authService.login(); }
  }
  isFormValid() {
    return this.getErrorMessage() === '';
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
