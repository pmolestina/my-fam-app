import {Component, OnInit, ViewChild} from '@angular/core';
import { ContactService } from '../contact.service';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../core/session.service';
import { CommonService } from '../../core/common.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  filter: string;
  familyKey: string = undefined;
  familyContacts$: Observable<any[]>;
  displayedColumns = ['name', 'email', 'action'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private contactService: ContactService,
    private sessionService: SessionService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getContacts();

    this.sessionService.familyKey$.subscribe(familyKey => {
      this.filterContacts(familyKey);
    });
    this.sessionService.filterValue$.subscribe(filterValue => {
      this.filter = filterValue;
    });
  }
  getContacts() {
    this.familyContacts$ = this.contactService.familyContacts$.map(items => items.sort(this.commonService.sortByName));
    this.familyContacts$.subscribe(data => {
      this.dataSource=this.commonService.loadDataTable(data, this.filter);
      this.dataSource.paginator = this.paginator;
    });
  }
  // filters by family selected
  filterContacts(familyKey?: string) {
    this.familyKey = familyKey;
    this.contactService.filterByFamily(familyKey);
    this.sessionService.setFamilyKey(familyKey);
  }
  // this filters by text box
  filterChange(value) {
    if (value.constructor.name.indexOf('Event') > -1) { return; }
    this.filter = value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.sessionService.setFilterValue(value);
  }
}
