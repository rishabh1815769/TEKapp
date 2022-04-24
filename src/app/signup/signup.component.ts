import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userdetails: any = {
    name: '',
    email: '',
    password: '',
  };
  users: any = [];
  signupForm: any;

  constructor(private http: HttpClient, private formbuilder: FormBuilder) {
    this.signupForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  responseError: any;
  signup() {
    if (this.signupForm.valid) {
      alert('Valid');
    } else {
      return;
    }

    //     var temp = {...this.userdetails};
    //     this.users.push(temp);
    //     var url = "https://apifromashu.herokuapp.com/api/register"
    //   this.http.post(url,this.userdetails).subscribe({
    //     next:(response:any)=>{
    //       console.log("Response from users api", response)
    //       if(response.message==="User Already Exists"){
    //         this.responseError = "User Already Exists"
    //       }
    //     },
    //     error:(error)=>{
    //       console.log("Error from users api",error)
    //     }
    //  })
  }

  ngOnInit(): void {}
}
