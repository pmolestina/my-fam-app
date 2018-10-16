import { Address } from './address';
class ContactAddress extends Address {
  type: string;
}
export class Contact {
    key:string;
    name:string;
    phone:string;
    email:string;
    birthday:string;
    address: ContactAddress;
    familyKey: string;
}
