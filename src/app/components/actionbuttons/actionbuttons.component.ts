import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DialogService } from '../../core/dialog.service';

@Component({
  selector: 'app-actionbuttons',
  templateUrl: './actionbuttons.component.html',
  styleUrls: ['./actionbuttons.component.scss']
})
export class ActionbuttonsComponent implements OnInit {
  @Input() isNew: boolean = true;
  @Input() isValid: boolean = true;
  @Input() data: any;
  @Output() click = new EventEmitter<any>();
  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }
  onClick(action) {
    if (action == "remove") {
      this.dialogService.openConfirmation("Are you sure you want to delete this record?").afterClosed().subscribe(result => {
        if (result == true)
          this.click.emit({ action: action, data: this.data });
      });
    }
    else
      this.click.emit({ action: action, data: this.data });
  }
}
