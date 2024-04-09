// import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {

    let users : User[] = [
{id:1,title:"Mr",firstname:"ajit",lastname:"kumar",dob:"08-23-2002", email:"ajit@test.com",password:"123456",acceptTerms:true},
{id:1,title:"Mr",firstname:"chandan",lastname:"bodar",dob:"05-12-2001", email:"chandan@test.com",password:"123456",acceptTerms:true},
    ];

    return { users };
  }
}
