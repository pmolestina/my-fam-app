import { Address } from './address';
export class Family {
    key:string;
    name:string;
    phone:string;
    address: Address = new Address();
}
