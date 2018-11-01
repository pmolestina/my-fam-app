import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../family.service';
import { Family } from '../../model/family';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from '@angular/fire/database';
import { SessionService } from '../../core/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../core/common.service';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {
  filter: string;
  familys$: Observable<any[]>;
  familysRef: AngularFireList<Family>;

  displayedColumns = ['name', 'action'];
  dataSource = new MatTableDataSource([]);

  constructor(private familyService: FamilyService,
    private sessionService: SessionService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getFamilys();
    this.sessionService.filterValue$.subscribe(filterValue => {
      this.filter = filterValue;
    });
  }
  getFamilys() {
    this.familysRef = this.familyService.getFamilys();

    this.familys$ = this.familysRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.familys$.subscribe(data => {
      this.dataSource = this.commonService.loadDataTable(data, this.filter);
    });
  }
  filterChange(value) {
    if (value.constructor.name.indexOf('Event') > -1) { return; }
    this.filter = value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.sessionService.setFilterValue(value);
  }
}
