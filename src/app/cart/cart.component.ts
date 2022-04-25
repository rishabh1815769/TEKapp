import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartitems: any = [];
  totalPrice: any = 0;

  constructor(private mainservice: MainserviceService, private router: Router) {
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
  addToCart(index: any) {
    if (localStorage['token']) {
      let myheaders = new HttpHeaders();
      myheaders = myheaders.append('authtoken', localStorage['token']);
      var url = 'https://apifromashu.herokuapp.com/api/addcaketocart';

      var options = {
        headers: myheaders,
      };
      console.log('PRICE', this.cartitems[index].name);
      var body = {
        cakeid: this.cartitems[index].cakeid,
        name: this.cartitems[index].name,
        weight: this.cartitems[index].weight,
        price: this.cartitems[index].price,
        image: this.cartitems[index].image,
      };
      this.mainservice.addCakeToCart(url, body, options).subscribe({
        next: (response: any) => {
          console.log('response from add to cart api', response);
          if (response.data) {
            this.cartitems[index].quantity += 1;
            this.router.navigate(['/cart']);
          }
        },
        error: (error) => {
          console.log('Error from add to cart api', error);
        },
      });
      this.updatetotalprice();
    } else {
      this.router.navigate(['/login']);
    }
  }

  updatetotalprice() {
    this.totalPrice = 0;
    for (const iterator of this.cartitems) {
      this.totalPrice += iterator.price * iterator.quantity;
    }
  }

  removeOneCakefromCart(index: any) {
    var url = 'https://apifromashu.herokuapp.com/api/removeonecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };
    this.mainservice.removeOneCakefromCart(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from remove one cake api', response);

        this.router.navigate(['/cart']).then(() => {
          window.location.reload();
        });
      },
      error: (error: any) => {
        console.log('Error from remove one cake api', error);
      },
    });

    this.updatetotalprice();
  }

  removeCakefromCart(index: any) {
    var url = 'https://apifromashu.herokuapp.com/api/removecakefromcart';
    let myheaders = new HttpHeaders();
    myheaders = myheaders.append('authtoken', localStorage['token']);
    var options = {
      headers: myheaders,
    };
    var body = {
      cakeid: this.cartitems[index].cakeid,
    };
    this.mainservice.removeCakefromCart(url, body, options).subscribe({
      next: (response: any) => {
        console.log('Response from remove cake api', response);

        this.router.navigate(['/cart']).then(() => {
          window.location.reload();
        });
      },
      error: (error: any) => {
        console.log('Error from remove cake api', error);
      },
    });
    this.updatetotalprice();
  }

  ngOnInit(): void {}
}
