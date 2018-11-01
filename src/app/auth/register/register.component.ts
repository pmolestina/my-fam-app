import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ParticipantService} from '../../participant/participant.service';
import {Credentials} from '../../model/credentials';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  credentials = new Credentials();
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  password2 = new FormControl('', [Validators.required]);
  constructor(private authService: AuthService,
              private participantService: ParticipantService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }
  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required') || this.password2.hasError('required')) {
      return 'You must enter a value';}
    if (this.email.hasError('email')) {
      return 'Not a valid email';}
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
    let participantKey;
    this.participantService.getParticipant(this.credentials.email).on('value', snapshot => {
      console.log(snapshot.val());
      if (snapshot.val() === null) {
        this.openSnackBar('Unable to verify email for access to request access to this site.', 'Close' );
        return;
      }
      participantKey = Object.keys(snapshot.val())[0];
      this.authService.register({ user: this.credentials.email, password: this.credentials.password})
        .then(_ => {
          this.participantService.updateParticipant(participantKey);
          this.router.navigate(['/home']);
        })
        .catch(error => {
        this.openSnackBar(error, 'Close' );
        console.log(error);
      });
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
