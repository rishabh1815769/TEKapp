import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit {
  isLoggedIn: any
  searchtext:any

  logout() {
    localStorage.clear();
  }

  constructor(private mainservice: MainserviceService,private router: Router) { 
    this.isLoggedIn = localStorage["token"]?true:false
  }

  ngDoCheck() {
    if(localStorage["token"]) {
      this.isLoggedIn = true
    }
    else{
      this.isLoggedIn = false
    }
  }

  search(){
    if(this.searchtext)
    this.router.navigate(["/search"],{queryParams:{q:this.searchtext}})

  }

  ngOnInit(): void {
  }

}
