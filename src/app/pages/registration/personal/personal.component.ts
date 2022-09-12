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
  submitted: boolean = false;
  personalForm: FormGroup;
  gender = Gender;
  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.personalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      birthDate: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      contactDetails: ['', Validators.required],
      email: '',
      address: ['', Validators.required],
      eMedicalRefNo: ['', Validators.required]
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

    this.submitted = true;
  }
}
