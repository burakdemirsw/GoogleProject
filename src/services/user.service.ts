import { Injectable } from '@angular/core';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private toastrService:ToasterService) { }

  getAccessToken():boolean | string{
    let token =localStorage.getItem("accessToken");
    if(token==null)
      return false

    return token

  }

  logOut(){
    if(localStorage.getItem("accessToken")){
      localStorage.removeItem("accessToken");
      this.toastrService.showError("Logged-Out!")
      setTimeout(() => {
        location.reload()
      }, 500);

    }
  }


}
