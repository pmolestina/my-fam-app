import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserIdleModule } from 'angular-user-idle';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './my-modules/material-module';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactService } from './contact/contact.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { FamilyEditComponent } from './family/family-edit/family-edit.component';
import { FamilyService } from './family/family.service';
import { FamilyListComponent } from './family/family-list/family-list.component';
import { SiteEditComponent } from './site/site-edit/site-edit.component';
import { SiteService } from './site/site.service';
import { SiteListComponent } from './site/site-list/site-list.component';

import { ParticipantService } from './participant/participant.service';
import { AdminService } from './admin/admin.service';

import { SessionService } from './core/session.service';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';

import { LoginComponent } from './auth/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ContentComponent } from './components/content/content.component';
import { AddressComponent } from './components/address/address.component';
import { MyerrorhandlerComponent } from './core/myerrorhandler/myerrorhandler.component';
import { Myerrorhandler } from './core/myerrorhandler';
import { ActionbuttonsComponent } from './components/actionbuttons/actionbuttons.component';
import { ActionbuttonslistComponent } from './components/actionbuttonslist/actionbuttonslist.component';
import { DialogComponent } from './core/dialog/dialog.component';
import { DialogService } from './core/dialog.service';

import { reducers } from './core/session.store';
import { SearchFilterPipe } from './core/pipes/search.filter';
import { FilterComponent } from './components/filter.component';
import { EncryptService } from './core/encrypt.service';
import { CommonService } from './core/common.service';
import { FamiliesComponent } from './components/families.component';
import { ProfileService } from './auth/profile.service';

import { AppConfig } from './app.config';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserListComponent } from './admin/user-list/user-list.component';
const config = AppConfig;

const firebaseConfig = config.getfirebaseConfig();

@NgModule({
  declarations: [
    AppComponent,
    ContactEditComponent,
    ContactListComponent,
    FamilyEditComponent,
    FamilyListComponent,
    SiteEditComponent,
    SiteListComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    SidenavComponent,
    ContentComponent,
    AddressComponent,
    MyerrorhandlerComponent,
    ActionbuttonsComponent,
    ActionbuttonslistComponent,
    DialogComponent,
    SearchFilterPipe,
    FilterComponent,
    FamiliesComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UserListComponent
  ],
  entryComponents: [
    MyerrorhandlerComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    UserIdleModule.forRoot({idle: 90, timeout: 1, ping: 600})
  ],
  providers: [
    ContactService,
    FamilyService,
    SiteService,
    ParticipantService,
    SessionService,
    AuthGuard,
    AuthService,
    DialogService,
    EncryptService,
    CommonService,
    ProfileService,
    AdminService
    /*,
    {
      provide: ErrorHandler,
      useClass: Myerrorhandler
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
