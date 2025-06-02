// src/app/customer-update/customer-update.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-update',
  standalone: true, // <-- Make this component standalone
  imports: [
    CommonModule,        // <-- Essential for *ngIf
    ReactiveFormsModule, // <-- Essential for [formGroup]
    RouterModule         // Essential for routerLink and router.navigate
  ],
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customerForm: FormGroup;
  customerId: string = '123'; // This should ideally come from auth or a route parameter

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    public router: Router, // Change 'private' to 'public'
    private route: ActivatedRoute // If you're getting ID from URL
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
      // Add other fields as per your customer data structure
    });
  }

  ngOnInit(): void {
    // If your route is something like /customer/:id/edit
    // this.route.paramMap.subscribe(params => {
    //   this.customerId = params.get('id') || 'defaultId'; // Get ID from URL
    //   this.loadCustomerData();
    // });

    // For now, using a hardcoded ID or assuming you get it from an authentication service
    this.loadCustomerData();
  }

  loadCustomerData(): void {
    // Call your service to get the customer data
    this.customerService.searchCustomerById(this.customerId).subscribe({
      next: (data) => {
      this.customerForm.patchValue(data); // Pre-fill the form
      },
      error: (err) => {
      console.error('Failed to load customer data', err);
      // Handle error, e.g., display a message to the user
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const updatedData = this.customerForm.value;
      this.customerService.updateCustomer(this.customerId, updatedData).subscribe({
        next: (response) => {
          console.log('Customer updated successfully!', response);
          // Navigate back to dashboard or show success message
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error updating customer:', err);
          // Handle error, e.g., display an error message
        }
      });
    } else {
      console.log('Form is invalid. Please check fields.');
      // You might want to display validation errors to the user
    }
  }
}