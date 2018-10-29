import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  credentials = { email: '', password: '' };
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService, private router: Router,
              public snackBar: MatSnackBar) { }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value'; }
    if (this.email.hasError('email')) {
      return 'Not a valid email'; }
    return '';
  }
  ngOnInit() {
  }
  resetPassword() {
    this.authService.reset_password(this.credentials)
      .then(_ => {
        this.openSnackBar('Reset email sent.', 'Close' );
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log('auth-reset-login', error)
        this.openSnackBar(error, 'Close' );
      });
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
