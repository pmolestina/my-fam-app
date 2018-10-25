import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../model/contact';

@Injectable()
export class ParticipantService {

  participant$: AngularFireObject<{}>;
  participants$: AngularFireList<Contact>;

  constructor(private afdb: AngularFireDatabase) {
    this.participants$ = this.afdb.list(`/participants`);

  }
  getParticipant(verificationEmail) {
    return this.participants$.query.orderByChild('verificationEmail').equalTo(verificationEmail);
  }
  updateParticipant(id){
    this.afdb.object('participants/' + id).update({'provisioned': true}).then(_ => console.log('success')).catch(this.errorHandler);
  }
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
