import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '@app/shared/constants/gender';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  items: MenuItem[];

  gender = Gender;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.items = [
      { label: 'Personal Info', routerLink: 'personal' },
      { label: 'Visa Info', routerLink: 'visaInfo' },
      { label: 'Laboratory Requisition', routerLink: 'labRequisition' },
      { label: 'X-RAY Requisition', routerLink: 'xrayRequisition' },
      { label: 'Review', routerLink: 'review' },
    ];
  }
}
