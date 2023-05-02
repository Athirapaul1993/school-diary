import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode"



interface MyToken {
  admin: boolean,
  id: string,
  login: boolean,


  // whatever else is in the JWT.
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // api: string = environment.api
  api: string = 'http://localhost:3400/api'
  // for production 
  // api: string = '/api'

  constructor(private http: HttpClient) { }


  // login check 
  isLoggedIn(): boolean {
    var token = localStorage.getItem('accessToken') || '';

    try {
      var user = jwt_decode<any>(token);
      return user.login ? true : false;

    } catch (error) {
      console.log('Token error', error)
      return false
    }
  }


  // role check 
  isAdmin(): boolean {
    var token = localStorage.getItem('accessToken') || '';

    try {
      var user = jwt_decode<MyToken>(token);
      return user.admin ? true : false;

    } catch (error) {
      console.log('Token error', error)
      return false
    }

  }

  idFetch() {
    let token = localStorage.getItem('accessToken') || '';

    try {
      let user = jwt_decode<MyToken>(token);
      return user.id;

    } catch (error) {
      console.log('Token error', error)
      return 'no user available'
    }


  }

  login(item: any) {
    return this.http.post(`${this.api}/auth`, item)
  }

  //retrive Token for token interception
  getToken() {
    return localStorage.getItem('accessToken')
  }


}
