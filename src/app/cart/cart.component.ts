import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: any = [];
  totalPrice: any = 0;

  constructor(private mainservice: MainserviceService) {
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
  }

  checkout() {
    let cartDetails: any = {
      cartitems: this.cartitems,
      totalPrice: this.totalPrice,
    };
    this.mainservice.getCartDataFromCartComponent(cartDetails);
  }

  removeItem(index: any) {
    this.cartitems.splice(index, 1);
  }

  ngOnInit(): void {}
}
