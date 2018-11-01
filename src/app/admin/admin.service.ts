import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import {User} from '../model/user';

@Injectable()
export class AdminService {
  users$: AngularFireList<User>;
  constructor(private afdb: AngularFireDatabase) {
    this.users$ = this.afdb.list(`/appusers`);
  }
  getusers() {
    return this.users$;
  }
  updateuser(id, data) {
    this.afdb.object('appusers/' + id).update(data).then(_ => console.log('success')).catch(this.errorHandler);
  }
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
