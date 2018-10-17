import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Observable } from 'rxjs/Observable';
import { FamilyService } from '../../family/family.service';
import { SessionService } from '../../core/session.service';
import { siteTypes } from '../site.types';
import { DialogService } from '../../core/dialog.service';
import { EncryptService } from '../../core/encrypt.service';
import { CommonService } from '../../core/common.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

  filter: string;
  siteTypeKey: string;
  siteTypeSites$: Observable<any[]>;

  siteTypes: any[];
  displayedColumns = ['name', 'url', 'action'];
  dataSource = new MatTableDataSource([]);
  constructor(
    private siteService: SiteService,
    private familyService: FamilyService,
    private sessionService: SessionService,
    private dialogService: DialogService,
    private encryptService: EncryptService,
    private commonService: CommonService
  ) {
    this.siteTypes = siteTypes;
  }

  ngOnInit() {
    this.getSites();

    this.sessionService.siteTypeKey$.subscribe(siteTypeKey => {
      // @ts-ignore
      this.siteTypeKey = siteTypeKey === undefined ? 1 : siteTypeKey;
      this.filterSites(this.siteTypeKey);
    });
    this.sessionService.filterValue$.subscribe(filterValue => {
      this.filter = filterValue;
    });

  }
  onclick(value) {
    if (value.constructor.name.indexOf('Event') > -1) { return; }
    switch (value.action) {
      case 'credentials':
        this.getcredentials(value.data);
        break;
      default:
        break;
    }

  }
  getcredentials(site) {
    const s = site;
    const password = s.password ? this.encryptService.decrypt(s.password) : "n/a";
    const message = 'User Name: ' + s.user + ' <BR/> '
      + 'Password: ' + password
    this.dialogService.openMessageHtml(message);

  }
  getSites() {
    this.siteTypeSites$ = this.siteService.siteTypeSites$.map(items => items.sort(this.commonService.sortByName));
    this.siteTypeSites$.subscribe(data => {
      this.dataSource = this.commonService.loadDataTable(data, this.filter);
    });
  }
  // filters by family selected
  filterSites(siteTypeKey?: string) {
    this.siteService.filterByType(siteTypeKey);
    this.sessionService.setSiteTypeKey(siteTypeKey);
  }
  // this filters by text box
  filterChange(value) {
    if (value.constructor.name.indexOf('Event') > -1) return;
    this.filter = value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.sessionService.setFilterValue(value);
  }
}
