//https://www.npmjs.com/package/ngx-simple-crypt
import { SimpleCrypt } from "ngx-simple-crypt";
import { Injectable } from '@angular/core';

@Injectable()
export class EncryptService {
  key = "NBZYSwQLCFlDBBFZHgxdGwoKCB0NHwpZHxxMD0UNBRBe";
  simpleCrypt = new SimpleCrypt();
  constructor() { }
  encrypt(val) {
    let encodedString = this.simpleCrypt.encode(this.key, val);
    return encodedString;
  }
  decrypt(val) {
    let decodedString = this.simpleCrypt.decode(this.key, val);
    return decodedString;
  }
}
