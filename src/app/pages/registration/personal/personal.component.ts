import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPersonalInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord, UpdatePersonalInformation } from '../store';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  submitted: boolean = false;
  personalForm: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.personalForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // middleName: ['', Validators.required],
      // birthDate: ['', Validators.required],
      // age: ['', Validators.required],
      // gender: ['', Validators.required],
      // contactDetails: ['', Validators.required],
      // email: '',
      // address: ''
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
