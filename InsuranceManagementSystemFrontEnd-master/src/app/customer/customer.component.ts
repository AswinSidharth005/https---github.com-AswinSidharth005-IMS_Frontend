import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'customer',
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customers: Customer[];
  selectedCustomer : Customer | null = null;
  constructor(private service:CommonService){
    this.customers = [
      new Customer(1, "suresh","Gowthamjagadeesan322@gmail.com" , "6382669477", "salem"),
      new Customer(2, "naresh","Gowthamjagadeesan322@gmail.com" , "6382669477", "salem"),
      new Customer(3, "ramesh","Gowthamjagadeesan322@gmail.com" , "6382669477", "salem"),
      new Customer(4, "rajesh","Gowthamjagadeesan322@gmail.com" , "6382669477","salem")]
  }
  delete(customer:Customer){

    console.log(customer.eid)

    let confirmation= confirm("Do you want to delete the Customer")
    if(confirmation){
      let index = this.customers.indexOf(customer);
      console.log("Index :", index);
      this.customers.splice(this.customers.indexOf(customer),1);
      alert("Deleted successfully")
  }
}
}

export class Customer {
  eid: number;
  ename: string;
  email: string;
  phone: string;
  eadd: string;

  constructor(eid: number, ename: string, email: string, phone: string, eadd: string) {
    this.eid = eid;
    this.ename = ename;
    this.email = email;
    this.phone = phone;
    this.eadd = eadd;
  }
}