import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-myerrorhandler',
  templateUrl: './myerrorhandler.component.html',
  styleUrls: ['./myerrorhandler.component.scss']
})
export class MyerrorhandlerComponent {

  constructor(
    public dialogRef: MatDialogRef<MyerrorhandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(): void {
    this.dialogRef.close();
  }

}
