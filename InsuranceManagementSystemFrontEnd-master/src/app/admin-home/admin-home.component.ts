import { Component } from '@angular/core';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  constructor(private logService: LoginserviceService) {}

  logout(): void {
    this.logService.logout(); // Call the logout method from LoginserviceService
  }
}
