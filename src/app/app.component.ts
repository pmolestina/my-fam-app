import { Component, NgZone, ViewChild } from '@angular/core';
import * as MobileDetect from 'mobile-detect';
import { MatSidenav } from "@angular/material/sidenav";
import { Router, RouterEvent } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  @ViewChild('sidenav') sidenav: MatSidenav;
  aut = new MobileDetect(window.navigator.userAgent);
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px`)

  constructor(zone: NgZone, router: Router) {
    //this is needed so changes in browser size are dynamic
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
    router.events.subscribe((event: any) => {
      if (event.constructor.name == "NavigationStart") {
        this.loading = true;
      }
      if (event.constructor.name == "NavigationEnd") {
        setTimeout(() => {
          this.loading = false;

        }, 500)
      }
    });
  }
  isScreenSmall() {
    if (this.aut.mobile())
      return true

    return this.mediaMatcher.matches;
  }
  toggle() {
    if (this.aut.mobile() || this.isScreenSmall())
      this.sidenav.toggle();
  }
}
