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
        });
      });

    this.getVisaCategories();
    this.getVisaTypes();
    this.getEmbassies();
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

  getVisaCategories() {
    this.registrationSvc.visaCategory$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(element => {
        this.visaCategory = element;
      });
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
}
