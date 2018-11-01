import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Family } from '../model/family';

@Injectable()
export class FamilyService {
  family$: AngularFireObject<{}>;
  familys$: AngularFireList<Family>;

  constructor(private afdb: AngularFireDatabase) {
    this.familys$ = this.afdb.list(`/familys`,
      ref => ref.orderByChild('lowercaseName'));
  }
  getFamilys() {
    return this.familys$;
  }
  getFamily(id) {
    this.family$ = this.afdb.object('familys/' + id);
    return this.family$;
  }
  addFamily(family) {
    family.lowercaseName = family.name.toLowerCase();
    const ref = this.familys$.push(family);
    family.key = ref.key;
    return ref.set(family);
  }
  // destructive save overwrites
  saveFamily(family) {
    family.lowercaseName = family.name.toLowerCase();
    return this.family$.set(family).then(_ => console.log('success')).catch(this.errorHandler);
  }
  removeFamily(id) {
    return this.familys$.remove(id).then(_ => console.log('success')).catch(this.errorHandler);
  }
  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
