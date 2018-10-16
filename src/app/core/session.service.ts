import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SET_FILTER, SET_FAMILY, RESET, SET_SITE } from './session.store';
import { AppState } from '../model/appstate';

@Injectable()
export class SessionService {
  siteTypeKey$: Store<string>;
  filterValue$: Store<string>;
  familyKey$: Store<string>;

  constructor(private store: Store<AppState>) {
    this.familyKey$ = store.select('familyKey');
    this.siteTypeKey$ = store.select('siteTypeKey');
    this.filterValue$ = store.select('filterValue');
  }
  setFamilyKey(familyKey) {
    this.store.dispatch({ type: SET_FAMILY, payload: { familyKey: familyKey } })
  }
  resetFamilyKey() {
    this.store.dispatch({ type: RESET });
  }
  setSiteTypeKey(siteTypeKey) {
    this.store.dispatch({ type: SET_SITE, payload: { siteTypeKey: siteTypeKey } })
  }
  resetSiteTypeKey() {
    this.store.dispatch({ type: RESET });
  }
  setFilterValue(filterValue) {
    this.store.dispatch({ type: SET_FILTER, payload: { filterValue: filterValue } })
  }
  resetFilterValue() {
    this.store.dispatch({ type: RESET });
  }
}
