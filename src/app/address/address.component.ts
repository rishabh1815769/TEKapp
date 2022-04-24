import { Component, Input, OnInit } from '@angular/core';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  userdetails: any = {};

  constructor(private mainservice: MainserviceService) {}

  addAddress() {
    let userCheckoutDetails: any = {
      name: this.userdetails.name,
      address: this.userdetails.address,
      city: this.userdetails.city,
      pincode: this.userdetails.pincode,
      phone: this.userdetails.phone,
    };
    this.mainservice.getUserDataFromAddressComponent(userCheckoutDetails);
  }

  ngOnInit(): void {}
}
