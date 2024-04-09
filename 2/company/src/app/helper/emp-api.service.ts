import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detail } from './detail.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpApi {
  private API_BASE_PATH: string = "http://localhost:4200/api/";

  constructor(private _httpEmpService: HttpClient) { }

  getEmps(){
    return this._httpEmpService.get(this.API_BASE_PATH + "emps");
  }
  getEmp(userId: number) {
    return this._httpEmpService.get(`${this.API_BASE_PATH}emps/${userId}`);
  }

  addUser(user: Detail) {
    return this._httpEmpService.post(`${this.API_BASE_PATH}emps`, user);
  }


  updateUser(user: Detail) {
    return this._httpEmpService.post(`${this.API_BASE_PATH}emps`, user);
  }

  deleteUser(userId: number) {
    debugger
    return this._httpEmpService.delete(`${this.API_BASE_PATH}emps/${userId}`);
  }  
}