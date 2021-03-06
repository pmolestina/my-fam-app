// http://angular-user-idle.rednez.com/
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import * as  Rx from 'rxjs/Rx';
import { DialogService } from '../core/dialog.service';
import { UserIdleService } from 'angular-user-idle';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private dialogService: DialogService,
    private userIdle: UserIdleService) {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(auth => {
      if (auth) {
        console.log('user is logged in');
      }
    });
  }
  initializeActivityWatch() {
    // Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      console.log('session timed out. user logged off');
      this.dialogService.openMessage('Your session has timed out!');
      this.logout();
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(_ => this.router.navigate(['/home']))
      .catch(error => console.log('auth-error-login', error));
  }
  loginCustom(email, password) {
    this.initializeActivityWatch();
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.stopWatching();
    this.afAuth.auth.signOut().then(_ => this.router.navigate(['/home'])).catch(error => console.log('auth-error-logout', error));
  }
  register(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.user, credentials.password);
  }
  reset_password(credentials) {
    return this.afAuth.auth.sendPasswordResetEmail(credentials.email);
  }
  private stopWatching() {
    this.userIdle.stopWatching();
  }
}
