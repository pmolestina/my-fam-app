import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { ProfileService } from '../profile.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  familyKey: string;
  userId: string;
  user: User = new User();
  hasProfile = false;
  displayName = new FormControl('', [Validators.required]);
  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    console.log(this.authService.user$);
    this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      console.log(user);
      this.profileService.get(user.uid).valueChanges().subscribe(appUser => {
        if (appUser) {
          this.hasProfile = true;
          this.user = appUser;
        }
        else {
          this.user.uid = this.userId;
          this.user.email = user.email;
          this.user.key = this.userId;
        }
      });
    });
  }
  isValid() {
    if ((this.user.familyKey !== undefined) && !this.displayName.invalid) {
      return true; }
    else {
      return false; }
  }
  onchange(value) {
    this.user.familyKey = value;
  }
  save(data) {
    if (!this.hasProfile) {
      this.profileService.addWithKey(data, data.uid).then(_ => this.router.navigate(['home'])); }
    else {
      this.profileService.save(data).then(_ => this.router.navigate(['home'])); }
  }
  cancel() {
    this.router.navigate(['home']);
  }
  actionButtonHandler(value: any) {
    if (value.constructor.name.indexOf('Event') > -1) { return; }
    console.log(value);

    switch (value.action) {
      case 'save':
        this.save(value.data);
        break;
      default:
        this.cancel();
        break;
    }

  }
}
