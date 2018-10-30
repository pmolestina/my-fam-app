import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Site } from '../model/site';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class SiteService {
  siteTypeSites$: Observable<any>;
  siteType$: BehaviorSubject<any>;

  site$: AngularFireObject<{}>;
  sites$: AngularFireList<Site>;

  constructor(private afdb: AngularFireDatabase) {

    this.sites$ = this.afdb.list(`/sites`,
      ref => ref.orderByChild('lowercaseName'));

    this.siteType$ = new BehaviorSubject(null);
    this.siteTypeSites$ = this.siteType$.switchMap(siteTypeKey =>
      afdb.list('/sites', ref =>
        siteTypeKey ? ref.orderByChild('siteTypeKey').equalTo(siteTypeKey) : ref
      ).snapshotChanges()
    );
  }
  filterByType(siteTypeKey: string|null) {
    this.siteType$.next(siteTypeKey);
  }
  getAllSites() {
    return this.sites$;
  }
  getSite(id) {
    this.site$ = this.afdb.object('sites/' + id);
    return this.site$;
  }
  addSite(site) {
    site.lowercaseName = site.name.toLowerCase();
    const ref = this.sites$.push(site);
    site.key = ref.key;
    return ref.set(site);
  }
  // destructive save overwrites
  saveSite(site) {
    site.lowercaseName = site.name.toLowerCase();
    return this.site$.set(site).then(_ => console.log('sucess')).catch(this.errorHandler);
  }
  // updates just the properties
  updateSite(site) {
    site.lowercaseName = site.name.toLowerCase();
    return this.site$.update(site).then(_ => console.log('sucess')).catch(this.errorHandler);
  }
  removeSite(id) {
    return this.sites$.remove(id).then(_ => console.log('sucess')).catch(this.errorHandler);
  }
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
