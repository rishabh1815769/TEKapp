import { Component, Input, OnInit } from '@angular/core';
import { MainserviceService } from '../mainservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartitems: any = [];
  totalPrice: any = 0;
  userAddressdata: any = {};
  userCakesData: any = [];

  constructor(
    private mainservice: MainserviceService,
    private http: HttpClient
  ) {
    var url = 'https://apifromashu.herokuapp.com/api/cakecart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {};
    this.mainservice.getCartItems(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from cart items api', response);
        this.cartitems = response.data;

        this.cartitems.forEach((each: any) => {
          this.totalPrice = this.totalPrice + each.price * each.quantity;
        });
      },
      error: (error) => {
        console.log('Error from cart items api', error);
      },
    });

    this.userAddressdata = this.mainservice.userdata;
    // this.userCakesData = this.mainservice.cakesArray;
    // console.log('USERDATA');
    // console.log(this.userAddressdata);
    // console.log('CAKE ARRAY');
    // console.log(this.userCakesData);
  }

  ngOnInit(): void {}

  placeOrder() {
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var url = 'https://apifromashu.herokuapp.com/api/addcakeorder';

    var options = {
      headers: myheaders,
    };
    var body = {
      cakes: this.cartitems.data,
      price: this.totalPrice,
      name: this.userAddressdata.name,
      address: this.userAddressdata.address,
      city: this.userAddressdata.city,
      pincode: this.userAddressdata.pincode,
      phone: this.userAddressdata.phone,
    };
    this.mainservice.placeOrder(url, body, options).subscribe({
      next: (response: any) => {
        console.log('response from place order api', response);
        // if(response.data){
        //   this.router.navigate(["/cart"])
        // }
      },
      error: (error) => {
        console.log('Error from place order api', error);
      },
    });
  }
}
