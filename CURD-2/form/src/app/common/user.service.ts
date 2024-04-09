import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_PATH: string = "http://localhost:4200/api/";

  constructor(private _httpClient: HttpClient) { }

  getAllUsers() {
    return this._httpClient.get(this.API_BASE_PATH + 'users');
  }

  getUserById(id: number) {
    return this._httpClient.get(`${this.API_BASE_PATH}users/${id}`);
  }

  addUser(user: User) {
    return this._httpClient.post(`${this.API_BASE_PATH}users`, user);
  }

  updateUser(user: User) {
    return this._httpClient.put(`${this.API_BASE_PATH}users/${user.id}`, user);
  }

  deleteUser(userId: number) {
    return this._httpClient.delete(`${this.API_BASE_PATH}users/${userId}`);
  }
}
