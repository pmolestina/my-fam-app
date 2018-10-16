import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Address } from '../../model/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address: Address;
  @Output() change = new EventEmitter<Address>();

  _address: Address;
  constructor() { }

  ngOnInit() {
    if (this.address)
      this._address=this.address;
    else
      this._address=new Address();
  }
  onChange() {
    this.change.emit(this._address);
  }
}
