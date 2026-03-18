import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../app/shared/services/notification.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  enquiryForm: FormGroup;

  constructor(private fb: FormBuilder, private notification: NotificationService) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')   // 10 digit phone validation
      ]],
      email: ['', [
        Validators.email, Validators.required
      ]]
    });
  }

  onSubmit(): void {

    if (this.enquiryForm.invalid) {
      this.enquiryForm.markAllAsTouched();   // 🔥 Trigger validations
      this.notification.showError('Please fill all required fields correctly.');
      return;
    }

    // ✅ Only if valid
    this.notification.showSuccess('Enquiry submitted successfully!');

    this.enquiryForm.reset();
    this.enquiryForm.markAsPristine();
    this.enquiryForm.markAsUntouched();
  }


  onPhoneInput(event: any): void {
    const input = event.target.value;

    // Allow only numbers and limit to 10 digits
    const numericValue = input.replace(/[^0-9]/g, '').slice(0, 10);

    this.enquiryForm.get('phone')?.setValue(numericValue, {
      emitEvent: false
    });
  }

 scrollTop(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
}