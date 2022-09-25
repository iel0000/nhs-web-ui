import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IVisaInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { map, Subject, take, takeUntil } from 'rxjs';
import { selectRecord, UpdateVisaInformation } from '../../store';
import { HttpClient } from '@angular/common/http';
import { IDropDown } from '@app/shared/interface';
import { HttpService } from '@app/shared/services';
import { RegistrationService } from '../../registration.service';

@Component({
  selector: 'app-edit-visa-info',
  templateUrl: './edit-visa-info.component.html',
  styleUrls: ['./edit-visa-info.component.scss']
})
export class EditVisaInfoComponent implements OnInit, OnDestroy {
  submitted: boolean = false;
  visaForm: FormGroup;
  embassy!: IDropDown[];
  visaType!: IDropDown[];
  visaCategory!: IDropDown[];
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private registrationSvc: RegistrationService,
    private route: ActivatedRoute
  ) {
    this.visaForm = this.formBuilder.group({
      embassy: ['', Validators.required],
      visaType: ['', Validators.required],
      visaCategory: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
        if (!s.personalInformation.firstName) {
          const id = this.route.snapshot.paramMap.get('id');
          this.router.navigate([`register/personal/${id}`]);
          return;
        }

        this.visaForm.patchValue({
          embassy: s.visaInformation.embassy.toString(),
          visaType: s.visaInformation.visaType.toString(),
          visaCategory: s.visaInformation.visaCategory.toString(),
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
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`register/personal/${id}`]);
  }

  nextPage() {
    if (!this.visaForm.invalid) {
      this.store.dispatch(
        UpdateVisaInformation({
          payload: <IVisaInformation>this.visaForm.getRawValue(),
        })
      );
      const id = this.route.snapshot.paramMap.get('id');
      this.router.navigate([`register/labRequisition/${id}`]);
      return;
    }

    this.submitted = true;
  }
}
