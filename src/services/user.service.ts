import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAccessToken():boolean | string{
    let token =localStorage.getItem("accessToken");
    if(token==null)
      return false

    return token

  }

  logOut(){
    if(localStorage.getItem("accessToken")){
      localStorage.removeItem("accessToken");
      location.reload()

    }
  }


}
