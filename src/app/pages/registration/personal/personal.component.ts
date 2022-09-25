import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersonalInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { selectRecord, UpdatePersonalInformation } from '../store';
import { Gender } from '@app/shared/constants/gender';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, OnDestroy {
  personalForm: FormGroup;
  gender = Gender;
  id: any

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.personalForm = this.formBuilder.group({
      id: 0,
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
    this.id = this.route.snapshot.paramMap.get('id');

    this.store
      .select(selectRecord)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        this.personalForm.patchValue({
          id: s.personalInformation.id,
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  nextPage() {
    if (!this.personalForm.invalid) {
      this.store.dispatch(
        UpdatePersonalInformation({
          payload: <IPersonalInformation>this.personalForm.getRawValue(),
        })
      );

      

      if(this.id) {
        this.router.navigate([`register/visaInfo/${this.id}`]);
        return;
      }

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

  calculateAge() {
    let control = this.personalForm.get('birthDate');
    let age = 0;
    if (!control?.invalid) {
      let timeDiff = Math.abs(Date.now() - new Date(control?.value).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    this.personalForm.patchValue({ age: age });
  }
}
