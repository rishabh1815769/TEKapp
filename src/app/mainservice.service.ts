import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainserviceService {
  userdata: any = [];
  cakesArray: any = [];

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

  addUserAddress(user: any) {
    this.userdata.push(user);
  }

  addCakesArray(cartitems: any) {
    this.cakesArray.push(cartitems);
  }

  showAddress(): any {
    return this.userdata;
  }

  constructor(private http: HttpClient) {}
}
