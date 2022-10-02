import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IVisaInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { map, Subject, take, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDropDown } from '@app/shared/interface';
import { HttpService } from '@app/shared/services';
import { RegistrationService } from '../registration.service';
import { selectRecord, UpdateVisaInformation } from '../store';

@Component({
  selector: 'app-visa-info',
  templateUrl: './visa-info.component.html',
  styleUrls: ['./visa-info.component.scss'],
})
export class VisaInfoComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  visaForm: FormGroup;
  embassy!: IDropDown[];
  visaType!: IDropDown[];
  visaCategory!: IDropDown[];
  lengthOfStay!: IDropDown[];
  intendedWork!: IDropDown[];
  id: any;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private httpService: HttpService,
    private registrationSvc: RegistrationService,
    private route: ActivatedRoute
  ) {
    this.visaForm = this.formBuilder.group({
      id: 0,
      embassy: ['', Validators.required],
      visaType: ['', Validators.required],
      visaCategory: ['', Validators.required],
      isFirstVisa: ['', Validators.required],
      hasVisaRejected: ['', Validators.required],
      lengthOfStay: '0',
      hasLetterReceived: '',
      isTemporaryVisa: '',
      isHealthAssessed: '',
      intendedWork: '0'
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
        if (!s.personalInformation.firstName) {
          if (this.id) {
            this.router.navigate([`register/personal/${this.id}`]);
            return;
          }

          this.router.navigate(['register/personal']);
          return;
        }

        this.visaForm.patchValue({
          id: s.visaInformation.id,
          embassy: s.visaInformation.embassy,
          visaType: s.visaInformation.visaType,
          visaCategory: s.visaInformation.visaCategory,
          isFirstVisa: s.visaInformation.isFirstVisa,
          hasVisaRejected: s.visaInformation.hasVisaRejected,
          lengthOfStay: s.visaInformation.lengthOfStay,
          hasLetterReceived: s.visaInformation.hasLetterReceived,
          isTemporaryVisa: s.visaInformation.isTemporaryVisa,
          isHealthAssessed: s.visaInformation.isHealthAssessed,
          intendedWork: s.visaInformation.intendedWork
        });
      });

    this.registrationSvc.visaCategory$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(element => {
        this.visaCategory = element;
      });

    this.getVisaTypes();
    this.getEmbassies();
    this.getLengthOfStay();
    this.getIntendedWork();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getEmbassies() {
    this.registrationSvc.embassyList$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(element => {
        this.embassy = element;
      });
  }

  getVisaTypes() {
    this.registrationSvc.visaType$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(element => {
        this.visaType = element;
      });
  }

  onEmbassyChange(event: any) {
    let embassyId = +event.value
    this.registrationSvc.getVisaCategory(embassyId);
    

    this.visaForm.get('isTemporaryVisa')?.patchValue('');
    this.visaForm.get('isHealthAssessed')?.patchValue('');
    this.visaForm.get('intendedWork')?.patchValue('0');
    this.visaForm.get('lengthOfStay')?.patchValue('0');
    this.visaForm.get('hasLetterReceived')?.patchValue('');

    if(embassyId === 1) {
      this.visaForm.get('isTemporaryVisa')?.setValidators(Validators.required);
      this.visaForm.get('isHealthAssessed')?.setValidators(Validators.required);
      this.visaForm.get('intendedWork')?.setValidators([Validators.required, Validators.min(1)]);
      this.visaForm.get('lengthOfStay')?.setValidators(null);
      this.visaForm.get('hasLetterReceived')?.setValidators(null);
    }
    else if(embassyId === 2) {
      this.visaForm.get('hasLetterReceived')?.setValidators(Validators.required);
      this.visaForm.get('isTemporaryVisa')?.setValidators(null);
      this.visaForm.get('isHealthAssessed')?.setValidators(null);
      this.visaForm.get('intendedWork')?.setValidators(null);
      this.visaForm.get('lengthOfStay')?.setValidators(null);
    }
    else if(embassyId === 3) {
      this.visaForm.get('lengthOfStay')?.setValidators([Validators.required, Validators.min(1)]);
      this.visaForm.get('hasLetterReceived')?.setValidators(null);
      this.visaForm.get('isTemporaryVisa')?.setValidators(null);
      this.visaForm.get('isHealthAssessed')?.setValidators(null);
      this.visaForm.get('intendedWork')?.setValidators(null);
    }

    this.visaForm.get('isTemporaryVisa')?.updateValueAndValidity();
    this.visaForm.get('isHealthAssessed')?.updateValueAndValidity();
    this.visaForm.get('intendedWork')?.updateValueAndValidity();
    this.visaForm.get('lengthOfStay')?.updateValueAndValidity();
    this.visaForm.get('hasLetterReceived')?.updateValueAndValidity();
    
  }

  back() {
    if (this.id) {
      this.router.navigate([`register/personal/${this.id}`]);
      return;
    }

    this.router.navigate(['register/personal']);
  }

  nextPage() {
    if (!this.visaForm.invalid) {
      this.store.dispatch(
        UpdateVisaInformation({
          payload: <IVisaInformation>this.visaForm.getRawValue(),
        })
      );

      if (this.id) {
        // this.router.navigate([`register/labRequisition/${this.id}`]);
        this.router.navigate([`register/review/${this.id}`]);
        return;
      }

      // this.router.navigate(['register/labRequisition']);
      this.router.navigate(['register/review']);
    }
  }

  validateControl(controlName: string): boolean {
    if (
      (this.visaForm.get(controlName)?.dirty ||
        this.visaForm.get(controlName)?.touched) &&
      this.visaForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }

  getLengthOfStay() {
    this.httpService.get('Client/GetIntendedLengthOfStay').subscribe(response => {
      this.lengthOfStay = response;
    })
  }

  getIntendedWork() {
    this.httpService.get('Client/GetIntendedWork').subscribe(response => {
      this.intendedWork = response;
    })
  }
}
