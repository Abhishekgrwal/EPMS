import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private _http: HttpClient) {}

  getUSerList() {
    return this._http.get(`${environment.url}/users`);
  }

  createUser(user: any) {
    var obj = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: user.password,
      createdOn: new Date(),
      id: Date.now().toString(), // id should be unique
    };

    return this._http.post(`${environment.url}/users`, obj);
  }

  deleteUser(userId: string) {
    return this._http.delete(`${environment.url}/users/${userId}`);
  }

  getUserById(userId: string) {
    return this._http.get(`${environment.url}/users/${userId}`);
  }

  updateUser(user: any, userId: string) {
    var obj = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: user.password,
    };
    return this._http.put(`${environment.url}/users/${userId}`, user);
  }
}
