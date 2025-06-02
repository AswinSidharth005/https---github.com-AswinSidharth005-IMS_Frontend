import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {
  form: RegisterUser;
  constructor(private client: HttpClient) { }
  path = "http://localhost:9091/auth/new";

  Register(form) {
    console.log(form);
    return this.client.post(this.path, form, { responseType: 'text' }).pipe(
      tap((response) => {
        console.log("Registration successful:", response);
        // Perform login separately to obtain the JWT token
      }),
      catchError((error) => {
        console.error("An error occurred during registration:", error);
        return throwError(() => error); // Rethrow the error for further handling
      })
    );
  }
}

export class RegisterUser {
  name: string;
  email: string;
  password: string;
  role: string;
}
