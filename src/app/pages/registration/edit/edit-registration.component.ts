import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { ResetRegistrationForm } from '../store';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.scss'],
})
export class EditRegistrationComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private registrationSvc: RegistrationService,
    private route: ActivatedRoute,
    private httpSvc: HttpService,
    private router: Router
  ) {
    this.items = [
      { label: 'Personal Info', routerLink: 'personal' },
      { label: 'Visa Info', routerLink: 'visaInfo' },
      { label: 'Laboratory Requisition', routerLink: 'labRequisition' },
      { label: 'X-RAY Requisition', routerLink: 'xrayRequisition' },
      { label: 'Review', routerLink: 'review' },
    ];
  }

  ngOnInit(): void {
    const id = this.router.url.split('/')[this.router.url.split('/').length - 1]; 
    this.registrationSvc.loadRegistrationRecord(id);
    
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
