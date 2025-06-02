import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {
  policies: any[] = []; // Array to store policies
  customers: any[] = []; // Array to store customers
  customerDetails: any = null; // Variable to store searched customer details

  constructor(private http: HttpClient, private logService: LoginserviceService) {}

  logout(): void {
    this.logService.logout(); // Call the logout method from LoginserviceService
  }

  viewPolicies(): void {
    const url = 'http://localhost:9091/policy/retrieveAll'; // Backend endpoint for viewing policies
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Policies:', response);
        this.policies = response; // Store the policies in the array
        alert('Policies fetched successfully.');
      },
      error: (err) => {
        console.error('Error fetching policies:', err);
        alert('Failed to fetch policies. Please try again later.');
      }
    });
  }

  createCustomer(): void {
    const customerData = {
      customerName: prompt('Enter Customer Name:'),
      customerEmail: prompt('Enter Customer Email:'),
      customerPhone: prompt('Enter Customer Phone:'),
      customerAddress: prompt('Enter Customer Address:')
    };

    if (customerData.customerName && customerData.customerEmail && customerData.customerPhone && customerData.customerAddress) {
      const url = 'http://localhost:9091/customer/create'; // Backend endpoint for creating a customer
      this.http.post(url, customerData).subscribe({
        next: (response) => {
          console.log('Customer created:', response);
          alert('Customer created successfully.');
        },
        error: (err) => {
          console.error('Error creating customer:', err);
          alert('Failed to create customer. Please try again later.');
        }
      });
    } else {
      alert('All fields are required to create a customer.');
    }
  }

  updateCustomer(): void {
    const customerId = prompt('Enter Customer ID to update:');
    const customerData = {
      customerName: prompt('Enter Updated Customer Name:'),
      customerEmail: prompt('Enter Updated Customer Email:'),
      customerPhone: prompt('Enter Updated Customer Phone:'),
      customerAddress: prompt('Enter Updated Customer Address:')
    };

    if (customerId && customerData.customerName && customerData.customerEmail && customerData.customerPhone && customerData.customerAddress) {
      const url = `http://localhost:9091/customer/update/${customerId}`; // Backend endpoint for updating a customer
      this.http.put(url, customerData).subscribe({
        next: (response) => {
          console.log('Customer updated:', response);
          alert('Customer updated successfully.');
        },
        error: (err) => {
          console.error('Error updating customer:', err);
          alert('Failed to update customer. Please try again later.');
        }
      });
    } else {
      alert('All fields are required to update a customer.');
    }
  }

  updateInfo(): void {
    const url = 'http://localhost:9091/customer/update'; // Backend endpoint for updating customer info
    const payload = {
      name: 'Updated Name', // Example payload
      email: 'updatedemail@example.com'
    };
    this.http.put(url, payload).subscribe({
      next: (response) => {
        console.log('Info updated:', response);
        alert('Information updated successfully.');
      },
      error: (err) => {
        console.error('Error updating info:', err);
        alert('Failed to update information. Please try again later.');
      }
    });
  }

  deleteCustomer(): void {
    const customerId = prompt('Enter the Customer ID to delete:'); // Prompt user for Customer ID
    if (customerId) {
      const url = `http://localhost:9091/customer/delete/${customerId}`; // Backend endpoint for deleting customer
      this.http.delete(url).subscribe({
        next: (response) => {
          console.log('Customer deleted:', response);
          alert('Customer deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
          alert('Failed to delete customer. Please try again later.');
        }
      });
    } else {
      alert('Customer ID is required to delete a customer.');
    }
  }

  getAllCustomers(): void {
    const url = 'http://localhost:9091/customer/findAll'; // Backend endpoint for retrieving all customers
    this.http.get(url).subscribe({
      next: (response: any) => {
        console.log('Customers:', response);
        this.customers = response; // Store the customers in the array
        alert('Customers fetched successfully.');
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        alert('Failed to fetch customers. Please try again later.');
      }
    });
  }

  searchCustomer(): void {
    const customerId = prompt('Enter the Customer ID to search:'); // Prompt user for Customer ID
    if (customerId) {
      const url = `http://localhost:1001/customer/searchById/${customerId}`; // Backend endpoint for searching customer by ID
      console.log('Request URL:', url); // Log the URL for debugging
      this.http.get(url).subscribe({
        next: (response: any) => {
          console.log('Customer details:', response);
          this.customerDetails = response; // Store the customer details
          alert(`Customer details fetched successfully:\nName: ${response.customerName}\nEmail: ${response.customerEmail}\nPhone: ${response.customerPhone}\nAddress: ${response.customerAddress}\nPolicies: ${response.policies.length > 0 ? response.policies.map(policy => policy.policyName).join(', ') : 'No policies available'}`);
        },
        error: (err) => {
          console.error('Error fetching customer details:', err);
          alert('Failed to fetch customer details. Please try again later.');
        }
      });
    } else {
      alert('Customer ID is required to search for a customer.');
    }
  }
}
