import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  isLoggedInUser = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  Login(email: string, password: string) {
    return this._http.get(
      `${environment.url}/users?email=${email}&password=${password}`
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    if (this.getToken())
      var role = JSON.parse(window.atob(localStorage.getItem('token')!)).role;
    return role;
  }

  getUserName() {
    if (this.getToken())
      console.log(
        JSON.parse(window.atob(localStorage.getItem('token')!)),
        'aa'
      );

    var name = JSON.parse(window.atob(localStorage.getItem('token')!));
    return name.firstName + ' ' + name.lastName;
  }
}
