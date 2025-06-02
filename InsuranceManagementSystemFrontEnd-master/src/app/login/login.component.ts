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

  validated(form: NgForm): any {
    console.log("validate function calling.......");
    console.log(form.value);

    this.logService.login(form.value).subscribe({
      next: (response) => {
        console.log("Login successful:", response);
        const role = localStorage.getItem('userRole'); // Retrieve the role from localStorage
        console.log("Retrieved role from localStorage:", role); // Log the role

        if (role && role.toLowerCase() === 'customer') {
          this.router.navigate(["/customer-home"]); // Redirect to customer dashboard
        } else if (role && role.toLowerCase() === 'agent') {
          this.router.navigate(["/agent-dashboard"]); // Redirect to agent dashboard
        } else {
          alert("Unsupported role. Please contact support."); // Handle unsupported roles
          this.router.navigate(["/login"]); // Redirect to login page
        }
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

}
