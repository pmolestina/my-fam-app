import { Component, OnInit } from '@angular/core';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { SiteService } from '../site.service';
import { Site } from '../../model/site';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { FormControl, Validators } from '@angular/forms';
import { FamilyService } from '../../family/family.service';
import { Family } from '../../model/family';
import { DialogService } from '../../core/dialog.service';
import { siteTypes } from '../site.types';
import { EncryptService } from '../../core/encrypt.service';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.scss']
})
export class SiteEditComponent implements OnInit {
  hide = true;
  siteTypes: any[];
  site$: Observable<any>;
  siteRef: AngularFireObject<{}>;
  isNew: boolean;
  id: string;
  name = new FormControl('', [Validators.required]);
  siteTypeKey = new FormControl('', [Validators.required]);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private siteService: SiteService,
    private familyService: FamilyService,
    private dialogService: DialogService,
    private encryptService: EncryptService
  ) {
    this.siteTypes = siteTypes;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.isNew = this.id === 'new';
    this.getSite();
  }
  getSite() {
    this.siteRef = this.siteService.getSite(this.id);
    this.site$ = this.siteRef.snapshotChanges().map(c => {
      //const key = c.payload.key!='new'?c.payload.key: undefined;
      //const data = { key, ...c.payload.val() } as Site;
      const data = { ...c.payload.val() } as Site;
      if (data.password) {
        data.password = this.encryptService.decrypt(data.password);
      }
      return data;

    });
  }
  save(site: Site) {
    if (site.password) {
      site.password = this.encryptService.encrypt(site.password);
    }
    if (this.isNew) {
      this.siteService.addSite(site).then( _ => this.router.navigate(['site-list']));
    }
    else {
      this.siteService.saveSite(site).then(_ => this.router.navigate(['site-list']));
    }
  }
  remove(site: Site) {
    this.siteService.removeSite(site.key).then(_ => this.router.navigate(['site-list']));
  }

  isFormValid() {
    return !this.name.hasError('required') &&
      !this.siteTypeKey.hasError('required')
  }
  cancel() {
    this.router.navigate(['site-list']);
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
