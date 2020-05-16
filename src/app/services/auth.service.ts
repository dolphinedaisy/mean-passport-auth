import { Injectable } from '@angular/core';
import { KEY_ACCESSTOKEN } from "../constants/const";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated() {
    // -- check access token exists
    if(!localStorage.getItem(KEY_ACCESSTOKEN)) {
      console.error('Token not found');
      return false;
    }

    return true;
  }
}
