import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userdetails: any = {
    name: '',
    email: '',
    password: ''

  }
  users: any=[]

  constructor(private http: HttpClient) {

    
   }
   responseError:any
  signup() {
    var temp = {...this.userdetails};
    this.users.push(temp);
    var url = "https://apifromashu.herokuapp.com/api/register"
  this.http.post(url,this.userdetails).subscribe({
    next:(response:any)=>{
      console.log("Response from users api", response)
      if(response.message==="User Already Exists"){
        this.responseError = "User Already Exists"
      }
    },
    error:(error)=>{
      console.log("Error from users api",error)
    }
 })
  }

  ngOnInit(): void {
  }

}
