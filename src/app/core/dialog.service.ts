import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Injectable()
export class DialogService {
  result: any;

  constructor(private dialog: MatDialog) { }

  openMessageHtml(message) {
    return this.openDialog({ title: "Message", isHtml:true, message: message, okBtn: false, closeBtnText:"Close" });
  }
  openMessage(message) {
    return this.openDialog({ title: "Message", message: message, okBtn: false, closeBtnText:"Close" });
  }
  openConfirmation(message) {
    return this.openDialog({ title: "Confirmation", message: message, okBtn: true, closeBtnText:"Cancel" });
  }
  private openDialog(data) {
    return this.dialog.open(DialogComponent, {
      width: '250px',
      data: data
    });

  }
}
