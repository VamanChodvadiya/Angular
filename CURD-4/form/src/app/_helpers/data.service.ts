import { User } from './user.interface';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'


@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let users: User[] = [
      { id: 1, title: 'Mr', firstname: 'sah', lastname: 'vsnba', dob: '03-02-2002', email: 'ajt@gmail.com', password: '123456', acceptTerms: true },
      { id: 2, title: 'Mr', firstname: 'vhvj', lastname: 'vjvs', dob: '03-02-2002', email: 'sa@gmail.com', password: '123456', acceptTerms: true },
      { id: 3, title: 'Mr', firstname: 'gsak', lastname: 'hjvbs', dob: '03-02-2002', email: 'sc@gmail.com', password: '123456', acceptTerms: true }
    ]
    return { users };
  }
}
