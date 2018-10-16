import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { FamilyEditComponent } from './family/family-edit/family-edit.component';
import { FamilyListComponent } from './family/family-list/family-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SiteEditComponent } from './site/site-edit/site-edit.component';
import { SiteListComponent } from './site/site-list/site-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact-list', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contact-edit/:id', component: ContactEditComponent, canActivate: [AuthGuard] },
  { path: 'family-list', component: FamilyListComponent, canActivate: [AuthGuard] },
  { path: 'family-edit/:id', component: FamilyEditComponent, canActivate: [AuthGuard] },
  { path: 'site-list', component: SiteListComponent, canActivate: [AuthGuard] },
  { path: 'site-edit/:id', component: SiteEditComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
