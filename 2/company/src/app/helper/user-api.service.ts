import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApi {
private API_BASE_PATH : string = "http://localhost:4200/api/";
  constructor(private _httpservice : HttpClient ) { }
  
  getUsers() {
    return this._httpservice.get(this.API_BASE_PATH + 'users');
  }


  getUser(userId: number) {
    return this._httpservice.get(`${this.API_BASE_PATH}users/${userId}`);
  }

  addUser(user: User) {
    return this._httpservice.post(`${this.API_BASE_PATH}users`, user);
  }


  updateUser(user: User) {
    return this._httpservice.post(`${this.API_BASE_PATH}users`, user);
  }

  deleteUser(userId: number) {
    debugger
    return this._httpservice.delete(`${this.API_BASE_PATH}users/${userId}`);
  }  
}