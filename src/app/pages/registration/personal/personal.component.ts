import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPersonalInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord, UpdatePersonalInformation } from '../store';
import { Gender } from '@app/shared/constants/gender';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  personalForm: FormGroup;
  gender = Gender;
  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.personalForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      middleName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      birthDate: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      age: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      gender: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      contactDetails: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      email: '',
      address: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      eMedicalRefNo: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    });
  }

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
        this.personalForm.patchValue({
          firstName: s.personalInformation.firstName,
          lastName: s.personalInformation.lastName,
          middleName: s.personalInformation.middleName,
          birthDate: s.personalInformation.birthDate,
          age: s.personalInformation.age,
          gender: s.personalInformation.gender,
          address: s.personalInformation.address,
          contactDetails: s.personalInformation.contactDetails,
          email: s.personalInformation.email,
          eMedicalRefNo: s.personalInformation.eMedicalRefNo,
        });
      });
  }

  nextPage() {
    if (!this.personalForm.invalid) {
      this.store.dispatch(
        UpdatePersonalInformation({
          payload: <IPersonalInformation>this.personalForm.getRawValue(),
        })
      );
      this.router.navigate(['register/visaInfo']);
      return;
    }
  }

  validateEmail($event: Event) {
    if ($event) {
      this.personalForm.get('email')?.addValidators(Validators.email);
    } else {
      this.personalForm.get('email')?.removeValidators;
    }
  }
}
