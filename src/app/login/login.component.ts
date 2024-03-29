import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserInfo } from '../models/enums/userInfo';
import { User } from '../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userRequestForm!: FormGroup;

  users : Array<User> = [
    {id:1,email:"burak",password: "1234" ,role:'patient'},
    {id:2,email:"abbas",password: "123",role:'patient'},
    {id:3,email:"ecmel",password: "123",role:'patient'},
    {id:4,email:"doctor",password: "123",role:'doctor'},

  ]
  constructor(private formBuilder: FormBuilder,private toasterService:ToasterService) {}

  ngOnInit(): void {
    this.createUserRequestForm();
  }

  createUserRequestForm() {
    this.userRequestForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  verifyUser(loginRequestForm:FormGroup){

    let form  = Object.assign({},loginRequestForm.value)
    let user = this.users.find(t=>t.email == form.email)
      if(user?.role=='doctor'){
        localStorage.setItem("doctor",'true')
      }
    if(user!=undefined){
      if(loginRequestForm.valid && this.users.find(t=>t.email == form.email && t.password == form.password)){
        localStorage.setItem("accessToken",UserInfo.token);
        this.toasterService.showSuccess()
        setTimeout(() => {
          location.href="http://localhost:4200/"
        }, 500);
      }
      else{
        this.toasterService.showError("Invalid Email/Password")

      }
      console.log(loginRequestForm.value);
    }

    }

}

