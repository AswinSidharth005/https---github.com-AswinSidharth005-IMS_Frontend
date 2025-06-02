import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  path = "http://localhost:9091/auth/authenticate"; // Backend login endpoint
  rolePath = "http://localhost:9091/auth/getroles"; // Endpoint to fetch role

  constructor(private client: HttpClient, private router: Router) { }
  public isLogedIn = false;

  login(user: LoginUser) {
    console.log("Attempting login...");
    console.log("Payload:", user);

    return this.client.post(this.path, user, { responseType: 'text' }).pipe(
      tap((response: any) => {
        localStorage.setItem('jwtToken', response); // Store the token
        this.isLogedIn = true;
        console.log("Login successful, token stored:", response);

        // Fetch the user's role using the username
        this.fetchRole(user.username).subscribe({
          next: (roleResponse: any) => {
            const role = roleResponse.trim(); // Trim any whitespace from the response
            localStorage.setItem('userRole', role); // Store the role in localStorage
            console.log("Role fetched and stored successfully:", role);
          },
          error: (err) => {
            console.error("Failed to fetch role:", err);
          }
        });
      }),
      catchError((error) => {
        console.error("Error details:", error);
        if (error.status === 403) {
          console.error("Access denied: Invalid credentials or insufficient permissions.");
          alert("Invalid credentials. Please try again.");
        } else {
          console.error("An unexpected error occurred:", error);
          alert("An error occurred during login. Please try again later.");
        }
        return throwError(() => error); // Rethrow the error for further handling
      })
    );
  }

  fetchRole(username: string) {
    const url = `${this.rolePath}/${username}`; // Construct the URL with the username
    return this.client.get(url, { responseType: 'text' }).pipe(
      tap((roleResponse: any) => {
        console.log("Fetched role from backend:", roleResponse); // Log the role
      }),
      catchError((error) => {
        console.error("Failed to fetch role:", error);
        return throwError(() => error);
      })
    );
  }

  logStatus(): boolean {
    console.log("Login status:", this.isLogedIn);
    return this.isLogedIn;
  }

  logout(): void {
    alert("Logout successful");
    localStorage.removeItem('userRole'); // Clear the userRole from localStorage
    localStorage.removeItem('jwtToken'); // Clear the JWT token
    localStorage.clear(); // Optionally clear all localStorage items
    this.router.navigate(["/login"]); // Redirect to the login page
    this.isLogedIn = false;
  }
}

export class LoginUser {
  username: string; // Ensure this matches the backend field name
  password: string;
}
