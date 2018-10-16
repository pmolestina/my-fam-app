//payload
//https://github.com/ngrx/platform/blob/master/MIGRATION.md#action-interface
//https://github.com/ngrx/platform/blob/v4.1.1/docs/store/README.md
// to keep session information
import { Action } from '@ngrx/store';
import { AppState, initialState } from '../model/appstate';
interface ActionWithPayload extends Action {
  payload: any;
}
export const SET_FAMILY = 'SET_FAMILY';
export const SET_FILTER = 'SET_FILTER';
export const SET_SITE = 'SET_SITE';
export const RESET = 'RESET';

export function familyKey(familyKey: string = undefined, action: ActionWithPayload) {
  switch (action.type) {
    case SET_FAMILY:
      return action.payload.familyKey;
    case RESET:
      return undefined;

    default:
      return familyKey;
  }
}
export function siteTypeKey(siteTypeKey: string = undefined, action: ActionWithPayload) {
  switch (action.type) {
    case SET_SITE:
      return action.payload.siteTypeKey;
    case RESET:
      return undefined;

    default:
      return siteTypeKey;
  }
}
export function filterValue(filterValue: string = undefined, action: ActionWithPayload) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload.filterValue;
    case RESET:
      return undefined;

    default:
      return filterValue;
  }
}
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ACTIVITY_TIMEOUT_OCCURRED = 'ACTIVITY_TIMEOUT_OCCURRED';

export function appState(appState: AppState = initialState, action: Action) {
  switch (action.type) {
    case LOGIN:
      return { loggedIn: true };
    case LOGOUT:
    case ACTIVITY_TIMEOUT_OCCURRED:
      return { loggedIn: false };

    default:
      return appState;
  }
}

export const reducers = { 
  familyKey: familyKey, 
  siteTypeKey: siteTypeKey, 
  appState: appState, 
  filterValue: filterValue };
