import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireList} from '@angular/fire/database';
import {MatTableDataSource} from '@angular/material/table';
import {AdminService} from '../admin.service';
import {CommonService} from '../../core/common.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  filter: string;
  users$: Observable<any[]>;
  usersRef: AngularFireList<User>;

  displayedColumns = ['email', 'action'];
  dataSource = new MatTableDataSource([]);

  constructor(private adminService: AdminService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersRef = this.adminService.getusers();

    this.users$ = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
    this.users$.subscribe(data => {
      this.dataSource = this.commonService.loadDataTable(data, this.filter);
    });
  }
  filterChange(value) {
    if (value.constructor.name.indexOf('Event') > -1) { return; }
    this.filter = value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  updateUser(value, user) {
    console.log(value);
    this.adminService.updateuser(user.key, {admin: value.checked});
  }
}
