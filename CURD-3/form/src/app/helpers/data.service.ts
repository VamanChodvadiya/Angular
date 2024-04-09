import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{
  constructor() { }

  createDb (){
   let users : User[] = [
    {id:100,title:"Mr",firstname: "chandan",lastname:"bodar",dob:"2008-07-08",email:"chandan@gmail.com",password:"123456",acceptTerms:true},
    {id:102,title:"Mr",firstname: "tuus",lastname:"nvnb",dob:"2008-07-08",email:"chandcvan@gmail.com",password:"465267",acceptTerms:true},
    {id:103,title:"Mr",firstname: "crahuln",lastname:"bvsv",dob:"2008-08-08",email:"fgxv@gmail.com",password:"456763",acceptTerms:true},
    {id:104,title:"Mr",firstname: "hjk",lastname:"fgfgh",dob:"2008-07-05",email:"ddbvc@gmail.com",password:"673264",acceptTerms:true},
    {id:105,title:"Mr",firstname: "hnv",lastname:"bfvcbodar",dob:"2008-03-08",email:"dfgc@gmail.com",password:"567321",acceptTerms:true},
   ];
    return{users};
  }
}
