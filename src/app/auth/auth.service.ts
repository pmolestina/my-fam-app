//https://blog.sstorie.com/building-an-angular-2-reactive-auto-logout-timer-with-the-redux-pattern/
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../model/appstate';
import { Store } from '@ngrx/store';
import { LOGIN, appState, LOGOUT, ACTIVITY_TIMEOUT_OCCURRED } from '../core/session.store';
import * as  Rx from 'rxjs/Rx';

import { DialogService } from '../core/dialog.service';

const SESSION_TIMEOUT = 600000;//10 minutes timeout

@Injectable()
export class AuthService {
  appState$: Store<AppState>;
  loggedIn$: Store<boolean>;

  user$: Observable<firebase.User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private store: Store<AppState>,
    private dialogService: DialogService
  ) {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(auth => {
      if (auth) {
        this.store.dispatch({ type: LOGIN });
      }
    })
    this.loggedIn$ = store.select('loggedIn');
    this.appState$ = store;
    /*this.appState$
      .filter(x => x.appState.loggedIn)
      .map(_ => Rx.Observable.timer(SESSION_TIMEOUT))
      .do((x: any) => console.log('Activity detected! Timer has reset'))
      .switch()
      .subscribe((x) => {
        console.log('Inactivity interval expired! Dispatching timeout event')
        store.dispatch({ type: ACTIVITY_TIMEOUT_OCCURRED });
        this.dialogService.openMessage('"Your session has timed out!')
        this.logout();
      });*/
  }
  login() {
    this.store.dispatch({ type: LOGIN });
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(_ => this.router.navigate(['/home']))
      .catch(error => console.log('auth-error-login', error));
  }
  loginCustom(email, password) {
    this.store.dispatch({ type: LOGIN });
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }
  logout() {
    this.router.navigate(['/home']);
    this.store.dispatch({ type: LOGOUT });
    this.afAuth.auth.signOut()
     // .then(_ => this.router.navigate(['/home']))
      .catch(error => console.log('auth-error-logout', error));
  }
}
