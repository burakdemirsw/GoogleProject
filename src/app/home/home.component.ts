import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalRequestService } from '../services/global-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  datas:any[]=[]
  constructor(private toasterService:ToasterService,private userService: UserService,private request : GlobalRequestService ){

  }
  ngOnInit(): void {
    this.request.globalGet<any>("https://localhost:7178/api/Product/GetProducts").subscribe(data=>{
    this.datas = data
    console.log(data)

    })
  }
  showToaster(){
    this.toasterService.showSuccess();
  }

  logOut(){
    this.userService.logOut()
  }



}
