import { Component, OnInit } from '@angular/core';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { FamilyService } from '../family.service';
import { Family } from '../../model/family';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { FormControl, Validators } from '@angular/forms';
import { Address } from '../../model/address';
import { DialogService } from '../../core/dialog.service';

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.scss']
})
export class FamilyEditComponent implements OnInit {
  address$: Observable<Address>;
  family$: Observable<any>;
  familyRef: AngularFireObject<{}>;
  isNew: boolean;
  id: string;
  address: Address;
  name = new FormControl('', [Validators.required]);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private familyService: FamilyService) {
  }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.isNew = this.id === 'new';
    this.getFamily();
  }
  getFamily() {
    this.familyRef = this.familyService.getFamily(this.id);
    this.family$ = this.familyRef.snapshotChanges().map(c => {
      const key = c.payload.key;
      const data = { key, ...c.payload.val() };
      // if (!data.address)
      //   data.address = new Address();
      return data;
    }
    );
  }
  addressChange(value) {
    if (value.constructor.name.indexOf('Event') > -1) { return; }
    this.address = value;
  }
  save(family: Family) {
    if (this.address !== undefined) {
      family.address = this.address; }
    if (this.isNew) {
      this.familyService.addFamily(family).then(_ => this.router.navigate(['family-list'])); }
    else {
      this.familyService.saveFamily(family).then(_ => this.router.navigate(['family-list'])); }
  }
  remove(family: Family) {
    this.familyService.removeFamily(family.key).then(_ => this.router.navigate(['family-list']));
  }
  cancel() {
    this.router.navigate(['family-list']);
  }
  isFormValid() {
    return !this.name.hasError('required');
  }
  actionButtonHandler(value: any) {
    if (value.constructor.name.indexOf('Event') > -1) { return; }
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
