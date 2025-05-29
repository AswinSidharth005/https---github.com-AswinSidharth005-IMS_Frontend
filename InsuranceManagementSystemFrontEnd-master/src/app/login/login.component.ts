import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonService } from '../common.service';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'login',
  imports: [RouterLink, RouterOutlet, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private commonService: CommonService, private logService: LoginserviceService) {

  }
  token: string;
  // validated(form:NgForm):any {
  //   console.log("validate function calling.......");
  //   // console.log(this.commonService.isLogedIn) ;
  //   console.log(form.value)

  //   this.logService.login(form.value).subscribe(response => {console.log(response)})
  //   this.router.navigate(["/insurance"])
  //   //console.log(this.commonService.validate(form));
  // }

  validated(form: NgForm): any {
    console.log("validate function calling.......");
    console.log(form.value);

    this.logService.login(form.value).subscribe({
      next: (response) => {
        console.log("Login successful:", response);
        this.router.navigate(["/insurance"]);
      },
      error: (err) => {
        if (err.status === 403) {
          alert("Invalid credentials. Please try again.");
        } else {
          alert("Something went wrong. Please try later.");
        }
      }
    });
  }

  // login() {
  //   console.log(this.commonService.isLogedIn);

  // }



}
