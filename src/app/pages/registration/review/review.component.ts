import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IChoices } from '@app/shared/interface';
import { IPersonalInformation, IRegistration, IVisaInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord } from '../store';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {

  reviewForm!: IRegistration;

  labItems: Array<IChoices> = [
    { description: 'AE Package - HIV, Urinalysis', value: '1' },
    {
      description:
        'NZ Package - VDRL, HIV, HBSag, Anti-HCV, FBC, HBA1c, Creatine w/ eGFR, Urinalysis',
      value: '2',
    },
    { description: 'Urinalysis', value: '3' },
    {
      description: 'CE Package - HIV, VDRL/RPR, Creatinine, Urinalysis',
      value: '4',
    },
    { description: 'NZ Limited -FBC, Creatinine w/eGFR', value: '5' },
    { description: 'IGRA', value: '6' },
    { description: 'Others', value: '7' },
  ];

  constructor(private store: Store, private router: Router) {

    this.reviewForm = {
      personalInformation: {
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        age: '',
        gender: '',
        address: '',
        contactDetails: '',
        email: '',
        eMedicalRefNo: '',
      },
      visaInformation: {
        embassy: '',
        visaType: '',
        visaCategory: '',
      },
      labRequisition: [],
    }
  }

  get personalInformation(): IPersonalInformation {
    return this.reviewForm.personalInformation;
  }

  get labRequisition(): string[] {
    return this.reviewForm.labRequisition;
  }

  get visaInformation(): IVisaInformation {
    return this.reviewForm.visaInformation;
  }

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
          this.reviewForm.personalInformation = s.personalInformation
          this.reviewForm.labRequisition = s.labRequisition
          this.reviewForm.visaInformation = s.visaInformation
      });
  }

  back() {
    this.router.navigate(['register/xrayRequisition']);
  }

  nextPage() {
    this.router.navigate(['/register/review']);
  }
}
