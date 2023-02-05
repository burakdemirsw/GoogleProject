import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toasterService:ToasterService,private userService: UserService){

  }
  ngOnInit(): void {
  }
  showToaster(){
    this.toasterService.showSuccess();
  }

  logOut(){
    this.userService.logOut()
  }



}
