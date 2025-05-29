import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonService } from '../common.service';
import { NgForm } from '@angular/forms';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'header',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
  
  constructor(private router:Router,private commonService:CommonService, private loginService:LoginserviceService){
  }
  // isLogedIn:boolean=false
  logout(){
    return this.loginService.logout();
   }

  // get isLogedIn(): boolean{
  //   return this.commonService.getLoginStatus();
  // }
  get isLogedIn():boolean{
    return this.loginService.logStatus();
  }
}
