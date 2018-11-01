import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from '../model/user';
import { CommonService } from '../core/common.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {
  user$: AngularFireObject<User>;
  users$: AngularFireList<User>;

  constructor(private afdb: AngularFireDatabase,
    private commonService: CommonService,
  private authService: AuthService) {

    this.users$ = this.afdb.list(`/appusers`,
      ref => ref.orderByChild('lowercaseName'));
  }
  get(id) {
    this.user$ = this.afdb.object('appusers/' + id);
    return this.user$;
  }
  getcurrent() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.get(user.uid); }
    });
  }
  add(user: User) {
    user.lowerCaseDisplayName = user.displayName.toLowerCase();
    return this.users$.push(user);
  }
  addWithKey(user, id) {
    user.lowerCaseDisplayName = user.displayName.toLowerCase();
    return this.afdb.object('appusers/' + id).set(user).then(_ => console.log('success')).catch(this.commonService.errorHandler);
  }
  save(user) {
    user.lowerCaseDisplayName = user.displayName.toLowerCase();
    return this.user$.set(user).then(_ => console.log('success')).catch(this.commonService.errorHandler);
  }
}
