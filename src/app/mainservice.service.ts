import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainserviceService {
  userCheckoutDetails: any = {};
  cartDetails: any = {};

  popularity(data: any) {
    data.sort((low, high) => {
      return high.popularity - low.popularity;
    });
    return data;
  }

  getCakedetails(url: any) {
    return this.http.get(url);
  }

  searchCakes(url: any) {
    return this.http.get(url);
  }

  addCakeToCart(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }
  getCartItems(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }
  placeOrder(url: any, body: any, options: any) {
    return this.http.post(url, body, options);
  }

  getCartDataFromCartComponent(cartDetails: any) {
    this.cartDetails = cartDetails;
  }

  getUserDataFromAddressComponent(userdata: any) {
    this.userCheckoutDetails = userdata;
  }

  sendCartDetails() {
    console.log('CART DETAILS SERVICE', this.cartDetails);
    return this.cartDetails;
  }

  sendUserDetails() {
    return this.userCheckoutDetails;
  }

  constructor(private http: HttpClient) {}
}
