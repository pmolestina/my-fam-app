import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material/table';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Injectable()
export class CommonService {

  constructor() { }

  sortByName(a, b) {
    if (a.payload.val().lowercaseName < b.payload.val().lowercaseName)
      return -1;
    if (a.payload.val().lowercaseName > b.payload.val().lowercaseName)
      return 1;
    return 0;
  }
  errorHandler(error) {
    return Observable.throw(error);
  }

  loadDataTable(data, filter){
      var ELEMENT_DATA=[];
      data.forEach(val => {
        if (val.payload)
          ELEMENT_DATA.push(val.payload.val());
        else
          ELEMENT_DATA.push(val);
      })
      var dataSource = new MatTableDataSource(ELEMENT_DATA);
      if(filter!=undefined)
        dataSource.filter=filter.trim().toLowerCase();
      return dataSource;
  }
}
