import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../model/contact';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ContactService {
  familyContacts$: Observable<any>;
  family$: BehaviorSubject<any>;

  contact$: AngularFireObject<{}>;
  contacts$: AngularFireList<Contact>;

  constructor(private afdb: AngularFireDatabase) {
    this.contacts$ = this.afdb.list(`/contacts`,
      ref => ref.orderByChild('lowercaseName'));

    this.family$ = new BehaviorSubject(null);
    this.familyContacts$ = this.family$.switchMap(familyKey => 
      afdb.list('/contacts', ref => 
        familyKey ? ref.orderByChild('familyKey').equalTo(familyKey) : ref
      ).snapshotChanges()
    );
  }
  filterByFamily(familyKey: string|null) {
    this.family$.next(familyKey); 
  }
  getAllContacts() {
    return this.contacts$;
  }
  getContact(id) {
    this.contact$ = this.afdb.object('contacts/' + id);
    return this.contact$;
  }
  addContact(contact) {
    contact.lowercaseName = contact.name.toLowerCase();
    return this.contacts$.push(contact);
  }
  //destructive save overwrites
  saveContact(contact, id) {
    contact.lowercaseName = contact.name.toLowerCase();
    return this.contact$.set(contact).then(_ => console.log('sucess')).catch(this.errorHandler);
  }
  //updates just the properties
  updateContact(contact, id) {
    contact.lowercaseName = contact.name.toLowerCase();
    return this.contact$.update(contact).then(_ => console.log('sucess')).catch(this.errorHandler);
  }
  removeContact(id) {
    return this.contacts$.remove(id).then(_ => console.log('sucess')).catch(this.errorHandler);
  }
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
