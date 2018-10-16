import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { buttonList, buttonListBasic } from '../buttons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actionbuttonslist',
  templateUrl: './actionbuttonslist.component.html',
  styleUrls: ['./actionbuttonslist.component.scss']
})
export class ActionbuttonslistComponent implements OnInit {
  @Input() listType: string;
  @Input() data: any;
  @Output() click = new EventEmitter<any>();
  buttons: any;
  constructor(private router: Router) { }

  ngOnInit() {
    switch (this.listType) {
      case "site":
        this.buttons = buttonList
        break;

      default:
        this.buttons = buttonListBasic;
        break;
    }
  }
  onClick(action, data) {
    if(action=="edit")
      {
        
        this.router.navigate(['/' + this.listType + '-edit', data.key]);
        
      }
    this.click.emit({ action: action, data: data });

  }
}
