import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IPersonalInformation,
  IVisaInformation,
} from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import {
  selectRecord,
  UpdatePersonalInformation,
  UpdateVisaInformation,
} from '../../store';
import { Gender } from '@app/shared/constants/gender';
import { HttpService } from '@app/shared/services';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.scss'],
})
export class EditPersonalComponent implements OnInit, OnDestroy {
  personalForm: FormGroup;
  gender = Gender;
  id: number = 0;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpSvc: HttpService,
    private registerSvc: RegistrationService
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
      .pipe(takeUntil(this.ngUnsubscribe))
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
      const id = this.route.snapshot.paramMap.get('id');
      this.router.navigate([`register/visaInfo/${id}`]);
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
