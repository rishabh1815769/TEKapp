import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  popularity(data:any){
    data.sort((low,high)=>{
      return high.popularity - low.popularity
    })
    return data
  }

  getCakedetails(url:any){
    return this.http.get(url)
  }

  searchCakes(url:any){
    return this.http.get(url)
  }

  addCakeToCart(url:any, body:any, options:any) {
    return this.http.post(url,body,options)
  }
  getCartItems(url:any, body:any, options:any) {
    return this.http.post(url,body,options)
  }



  constructor(private http: HttpClient) { }
}
