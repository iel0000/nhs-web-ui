import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@app/shared/constants/gender';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  items: MenuItem[];

  gender = Gender;

  constructor(private formBuilder: FormBuilder) {
    this.items = [
      { label: 'Personal Info', routerLink: 'personal' },
      { label: 'Visa Info', routerLink: 'visaInfo' },
      { label: 'Laboratory Requisition', routerLink: 'labRequisition' },
      { label: 'X-RAY Requisition', routerLink: 'xrayRequisition' },
      { label: 'Review', routerLink: 'review' },
    ];

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      birthDate: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      contactDetails: ['', Validators.required],
      email: '',
      address: '',
      eMedicalRefNo: '',
      embassy: ['', Validators.required],
      visaType: ['', Validators.required],
      visaCategory: ['', Validators.required],
    });
  }

  validateEmail() {
    if (this.registrationForm.get('email')?.value) {
      this.registrationForm.get('email')?.addValidators(Validators.email);
    } else {
      this.registrationForm.get('email')?.setValidators(null);
    }
  }
  onSubmit() {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      this.registrationForm.markAsDirty();
    }
  }
}
