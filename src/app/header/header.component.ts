import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn !: boolean;
  currentUserRole !:boolean
  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    this.loginStatus()
    if(localStorage.getItem('doctor')){
      this.currentUserRole=true
    }

  }

  logOut(){
    this.userService.logOut()
  }
  loginStatus(){
    this.isLoggedIn = localStorage.getItem("accessToken")?true:false;
  }

}
