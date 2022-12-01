import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersonalInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { selectRecord, UpdatePersonalInformation } from '../store';
import { Gender } from '@app/shared/constants/gender';
import { IDropDown } from '@app/shared/interface';
import { HttpService } from '@app/shared/services';
import { CiviStatus } from '@app/shared/constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit, OnDestroy {
  personalForm: FormGroup;
  gender = Gender;
  id: any;
  categories!: IDropDown[];
  referrals!: IDropDown[];
  civilStatus = CiviStatus;

  private ngUnsubscribe = new Subject<void>();
  today: Date;
  birthDate!: string;
  dateIssued!: string;
  isPassportRequired = true;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpSvc: HttpService,
    private datePipe: DatePipe
  ) {
    this.today = new Date();

    this.personalForm = this.formBuilder.group({
      id: 0,
      personalCategory: ['', Validators.required],
      referral: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      middleName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      birthDate: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      age: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      gender: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      mobileNumber: ['', [Validators.required]],
      email: '',
      address: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      eMedicalRefNo: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      civilStatus: ['', Validators.required],
      hasMenstrualPeriod: false,
      menstrualPeriodStart: '',
      menstrualPeriodEnd: '',
      intendedOccupation: ['', Validators.required],
      hasPassport: false,
      passportNumber: ['', Validators.required],
      dateIssued: ['', Validators.required],
      isExpired: [false, Validators.required],
      hasOtherId: false,
      otherId: '',
      landLineNumber: [''],
      isAcceptedTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.store
      .select(selectRecord)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        this.birthDate = s.personalInformation.birthDate;
        this.dateIssued = s.personalInformation.dateIssued;

        this.personalForm.patchValue({
          id: s.personalInformation.id,
          personalCategory: s.personalInformation.personalCategory,
          referral: s.personalInformation.referral,
          firstName: s.personalInformation.firstName,
          lastName: s.personalInformation.lastName,
          middleName: s.personalInformation.middleName,
          birthDate: this.birthDate,
          age: s.personalInformation.age,
          gender: s.personalInformation.gender,
          address: s.personalInformation.address,
          mobileNumber: s.personalInformation.mobileNumber,
          email: s.personalInformation.email,
          eMedicalRefNo: s.personalInformation.eMedicalRefNo,
          civilStatus: s.personalInformation.civilStatus,
          hasMenstrualPeriod: s.personalInformation.hasMenstrualPeriod,
          menstrualPeriodStart: s.personalInformation.menstrualPeriodStart
            ? s.personalInformation.menstrualPeriodStart
            : '',
          menstrualPeriodEnd: s.personalInformation.menstrualPeriodEnd
            ? s.personalInformation.menstrualPeriodEnd
            : '',
          intendedOccupation: s.personalInformation.intendedOccupation,
          hasPassport: s.personalInformation.hasPassport,
          passportNumber: s.personalInformation.passportNumber,
          dateIssued: this.dateIssued,
          isExpired: s.personalInformation.isExpired,
          hasOtherId: s.personalInformation.hasOtherId,
          otherId: s.personalInformation.otherId,
          landLineNumber: s.personalInformation.landLineNumber,
          isAcceptedTerms: s.personalInformation.isAcceptedTerms,
        });

        this.isPassportRequired = !s.personalInformation.hasOtherId;

        if (!this.isPassportRequired) {
          this.personalForm.get('passportNumber')?.setValidators(null);
          this.personalForm.get('dateIssued')?.setValidators(null);
          this.personalForm.get('isExpired')?.setValidators(null);
        } else {
          this.personalForm
            .get('passportNumber')
            ?.addValidators(Validators.required);
          this.personalForm
            .get('dateIssued')
            ?.addValidators(Validators.required);
          this.personalForm
            .get('isExpired')
            ?.addValidators(Validators.required);
        }
        this.personalForm.get('passportNumber')?.updateValueAndValidity();
        this.personalForm.get('dateIssued')?.updateValueAndValidity();
        this.personalForm.get('isExpired')?.updateValueAndValidity();
      });

    this.httpSvc.get('Client/GetPersonalCategories').subscribe(response => {
      this.categories = response;
    });

    this.httpSvc.get('Client/GetReferrals').subscribe(response => {
      this.referrals = response;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  validateControl(controlName: string): boolean {
    if (
      (this.personalForm.get(controlName)?.dirty ||
        this.personalForm.get(controlName)?.touched) &&
      this.personalForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }

  nextPage() {
    if (!this.personalForm.invalid) {
      this.store.dispatch(
        UpdatePersonalInformation({
          payload: <IPersonalInformation>this.personalForm.getRawValue(),
        })
      );

      if (this.id) {
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
    console.log(control?.value);
    let age = 0;
    if (!control?.invalid) {
      let timeDiff = Math.abs(Date.now() - new Date(control?.value).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }

    this.personalForm.patchValue({ age: age });
  }

  validateMenstrualDates(event: any) {
    this.personalForm.get('menstrualPeriodStart')?.patchValue('');
    this.personalForm.get('menstrualPeriodEnd')?.patchValue('');
    if (event.checked) {
      this.personalForm
        .get('menstrualPeriodStart')
        ?.addValidators(Validators.required);
      this.personalForm
        .get('menstrualPeriodEnd')
        ?.addValidators(Validators.required);
    } else {
      this.personalForm.get('menstrualPeriodStart')?.setValidators(null);
      this.personalForm.get('menstrualPeriodEnd')?.setValidators(null);
    }

    this.personalForm.get('menstrualPeriodStart')?.updateValueAndValidity();
    this.personalForm.get('menstrualPeriodEnd')?.updateValueAndValidity();
  }

  validateOtherId(event: any) {
    this.personalForm.get('otherId')?.patchValue('');
    if (event.checked) {
      this.personalForm.get('otherId')?.addValidators(Validators.required);
      this.personalForm.get('passportNumber')?.patchValue('');
      this.personalForm.get('dateIssued')?.patchValue('');
      this.personalForm.get('isExpired')?.patchValue(false);

      this.personalForm.get('passportNumber')?.setValidators(null);
      this.personalForm.get('dateIssued')?.setValidators(null);
      this.personalForm.get('isExpired')?.setValidators(null);
    } else {
      this.personalForm.get('otherId')?.setValidators(null);
      this.personalForm.get('otherId')?.setErrors(null);
      this.personalForm
        .get('passportNumber')
        ?.addValidators(Validators.required);
      this.personalForm.get('dateIssued')?.addValidators(Validators.required);
      this.personalForm.get('isExpired')?.addValidators(Validators.required);
    }

    this.personalForm.get('otherId')?.updateValueAndValidity();
    this.personalForm.get('passportNumber')?.updateValueAndValidity();
    this.personalForm.get('dateIssued')?.updateValueAndValidity();
    this.personalForm.get('isExpired')?.updateValueAndValidity();

    this.isPassportRequired = !event.checked;
  }

  onPassportChange(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.personalForm.get('hasOtherId')?.patchValue(false);
    }
  }
}
