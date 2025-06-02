// src/app/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:9091/customer'; // Base URL for customer-related endpoints

  constructor(private http: HttpClient) { }

  // Method to retrieve all policies
  getAllPolicies(): Observable<any> {
    const url = 'http://localhost:9091/policy/retrieveAll'; // Backend endpoint for viewing policies
    return this.http.get(url);
  }

  // Method to create a new customer
  createCustomer(customerData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.apiUrl}/create`, customerData, httpOptions);
  }

  // Method to update customer data
  updateCustomer(customerId: string, customerData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`${this.apiUrl}/update/${customerId}`, customerData, httpOptions);
  }

  // Method to search customer by ID
  searchCustomerById(customerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/searchById/${customerId}`);
  }

  // Method to get all customers
  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/findAll`);
  }

  // Method to delete a customer by ID
  deleteCustomer(customerId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${customerId}`);
  }
}