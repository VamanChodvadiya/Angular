import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {  
    let users: User[] = [
      { id: 1, title: 'Mr', firstName: 'tushal', lastName: 'bodar', dob: '2003-02-21', email: 'tushal@gmail.com', password: '1234556', acceptTerms: true },
      { id: 2, title: 'Miss', firstName: 'vishwa', lastName: 'bodar', dob: '2003-02-09', email: 'vishwa@gmail.com', password: '123789', acceptTerms: true }
    ];
    return {users};
  }

}
