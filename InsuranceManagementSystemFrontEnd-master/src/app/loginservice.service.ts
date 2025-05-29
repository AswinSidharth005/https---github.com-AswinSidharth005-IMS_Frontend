import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  user: LoginUser
  path = "http://localhost:9090/auth/authenticate"
  constructor(private client: HttpClient, private router: Router) { }
  public isLogedIn = false;
  //  login(user: LoginUser) {
  //   console.log("Inservice")
  //   console.log(user)
  //   this.isLogedIn = true;

  //   try {
  //     return  this.client.post(this.path, user, { responseType: 'text' });
  //   } catch (error: any) {
  //     if (error.response && error.response.status === 403) {
  //       console.error("Access denied: Invalid credentials or insufficient permissions.");
  //       // Optionally show a user-friendly message or redirect
  //     } else {
  //       console.error("An unexpected error occurred:", error);
  //     }
  //   }

  // }

  login(user: LoginUser) {
    console.log("In service");
    console.log(user);
    return this.client.post(this.path, user, { responseType: 'text' }).pipe(


      tap(() => {
        // ✅ Set isLogedIn to true only on successful response
        this.isLogedIn = true;
      }),

      catchError((error) => {
        if (error.status === 403) {
          console.error("Access denied: Invalid credentials or insufficient permissions.");
        } else {
          console.error("An unexpected error occurred:", error);
        }
        return throwError(() => error); // rethrow so the component can handle it too
      })
    );
  }

  logStatus(): boolean {
    console.log(this.isLogedIn);
    return this.isLogedIn;
  }
  logout(): boolean {

    alert("logout successful")
    this.router.navigate(["/login"])
    localStorage.clear()
    this.isLogedIn = false;
    return this.isLogedIn
  }

}
export class LoginUser {
  name: string;
  password: string
}
