import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent{
      
constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @Input() cakedata:any

}
