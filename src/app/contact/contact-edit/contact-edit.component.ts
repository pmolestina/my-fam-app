import { Component, OnInit } from '@angular/core';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { ContactService } from '../contact.service';
import { Contact } from '../../model/contact';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { FormControl, Validators } from "@angular/forms";
import { FamilyService } from '../../family/family.service';
import { Family } from '../../model/family';
import { DialogService } from '../../core/dialog.service';
import { familyKey } from '../../core/session.store';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  familys$: Observable<any[]>;
  familysRef: AngularFireList<Family>;
  contact$: Observable<any>;
  contactRef: AngularFireObject<{}>;
  isNew: boolean;
  id: string;
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  dob = new FormControl('');
  familyKey: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private familyService: FamilyService,
    private dialogService: DialogService
  ) {
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.isNew = this.id == 'new';
    if (!this.isNew) {
      this.getContact(this.id);
      this.contact$.subscribe(contact=>{
        this.familyKey=contact.familyKey;
      })
    }
    else {
      this.contact$ = Observable.of({}) as Observable<Contact>;
    }
  }
  getContact(id) {
    this.contactRef = this.contactService.getContact(this.id);
    this.contact$ = this.contactRef.snapshotChanges().map(c => ({ key: c.payload.key, ...c.payload.val() }));
    this.contact$.subscribe(c => {
      this.dob.setValue(new Date(c.birthday));
    });
  }
  onchange(value) {
    this.familyKey = value;
  }
  save(contact: Contact) {
    if(this.dob.valid)
      contact.birthday = this.dob.value.toDateString();
    contact.familyKey = this.familyKey;
    if (this.isNew)
      this.contactService.addContact(contact).then(_ => this.router.navigate(['contact-list']));
    else
      this.contactService.saveContact(contact, contact.key).then(_ => this.router.navigate(['contact-list']));
  }
  remove(contact: Contact) {
    this.contactService.removeContact(contact.key).then(_ => this.router.navigate(['contact-list']));
  }
  isFormValid() {
    return !this.name.hasError('required') &&
      (this.familyKey != undefined) &&
      !this.email.hasError('email')
  }
  cancel() {
    this.router.navigate(['contact-list']);
  }
  actionButtonHandler(value: any) {
    if (value.constructor.name.indexOf("Event") > -1) return;
    console.log(value);

    switch (value.action) {
      case 'save':
        this.save(value.data);
        break;
      case 'remove':
        this.remove(value.data);
        break;
      default:
        this.cancel();
        break;
    }

  }
}
