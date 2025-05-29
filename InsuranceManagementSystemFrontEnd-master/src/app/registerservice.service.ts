import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  form:RegisterUser;
  constructor(private client:HttpClient) { }
  path="http://localhost:9090/auth/new";
  Register(form)
  {
    console.log(form)
    return this.client.post(this.path,form,{responseType:'text'})
  }
  
}
export class RegisterUser{
  name:string;
  email:string;
  password:string;
  role:string;
}
