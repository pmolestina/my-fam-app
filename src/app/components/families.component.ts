import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FamilyService } from '../family/family.service';
import { AngularFireList } from '@angular/fire/database';
import { Family } from '../model/family';
import { Observable } from 'rxjs/Observable';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-families',
  template: `
    <mat-form-field>
      <mat-select placeholder="Select a family" [(ngModel)]="familyKey" (ngModelChange)="onChange($event)" required>
        <mat-option *ngIf='showAlloption' [value]='0'>All</mat-option>
        <mat-option *ngFor='let family of familys$ | async' [value]="family.key">{{family.name}}</mat-option>
      </mat-select>
      <mat-error *ngIf="familyKeyValidator.invalid">Family required</mat-error>
    </mat-form-field>
  `,
  styles: []
})
export class FamiliesComponent implements OnInit {
  @Input() familyKey: string;
  @Input() showAlloption: boolean = false;
  @Output() change = new EventEmitter<any>();
  familys$: Observable<any[]>;
  familysRef: AngularFireList<Family>;
  familyKeyValidator = new FormControl('', [Validators.required]);
  constructor(private familyService: FamilyService) { }

  ngOnInit() {

    this.getFamilies();
  }
  getFamilies() {
    this.familysRef = this.familyService.getFamilys();
    this.familys$ = this.familysRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  onChange(val) {
    console.log(val);
    console.log(this.familyKey);
    this.change.emit(this.familyKey);
  }

}
