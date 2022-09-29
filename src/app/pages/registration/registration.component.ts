import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { RegistrationService } from './registration.service';
import { ResetRegistrationForm } from './store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private registrationSvc: RegistrationService,
    private router: Router
  ) {
    this.items = [
      { label: 'Personal Info', routerLink: 'personal' },
      { label: 'Visa Info', routerLink: 'visaInfo' },
      // { label: 'Laboratory Requisition', routerLink: 'labRequisition' },
      // { label: 'X-RAY Requisition', routerLink: 'xrayRequisition' },
      { label: 'Review', routerLink: 'review' },
    ];
  }

  ngOnInit(): void {
    const id =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    if (!isNaN(+id)) {
      this.registrationSvc.loadRegistrationRecord(id);
    }

    this.registrationSvc.getEmbassies();
    this.registrationSvc.getVisaCategory();
    this.registrationSvc.getVisaType();
    this.registrationSvc.getLabRequisitionItems();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(ResetRegistrationForm());
  }
}
