import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../auth/profile.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  displayName: string;
  constructor(public authService: AuthService,
    private router: Router,
    public profileService: ProfileService) { }

  ngOnInit() {
    this.authService.user$.subscribe(authuser => {
      if (authuser) {
        this.profileService.get(authuser.uid).valueChanges().subscribe(appUser => {
        if (appUser) {
          this.displayName = appUser.displayName;
        }
        else {
          this.displayName = authuser.email;
        }
      });
      }
    })
  }

  sidenavclick(action) {
    this.toggleSidenav.emit();
    switch (action) {
      case 'logout':
        this.authService.logout();
        break;
      default:
        this.router.navigate(['/' + action]);
        break;
    }
  }

}
