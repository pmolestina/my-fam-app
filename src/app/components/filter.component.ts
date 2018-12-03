import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  template: `
    <mat-form-field class="filter-field">
      <input matInput placeholder="Filter" [(ngModel)]="filter" (ngModelChange)="onChange($event)">
      <button mat-button *ngIf="filter" matSuffix mat-icon-button aria-label="Clear" (click)="clear()">
    <mat-icon>close</mat-icon>
  </button>
    </mat-form-field>
  `,
  styles: []
})
export class FilterComponent implements OnInit {
  @Input() filter: string;
  @Output() change = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  onChange() {
    this.change.emit(this.filter);
  }
  clear() {
    this.change.emit('');
  }

}
