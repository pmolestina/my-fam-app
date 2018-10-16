import { appState } from '../core/session.store';
export const initialState: AppState = {  
    appState: undefined,
    familyKey: undefined,
    siteTypeKey: undefined,
    filterValue: undefined,
    loggedIn: false
};
//used in sessionService
export interface AppState {
  appState: any;
  familyKey: string;
  siteTypeKey: string;
  filterValue: string;
  loggedIn: boolean;
}