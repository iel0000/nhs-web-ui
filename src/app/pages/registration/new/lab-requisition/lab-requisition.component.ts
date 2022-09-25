import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IChoices } from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { RegistrationService } from '../../registration.service';
import { selectRecord, UpdateLabRequisition } from '../../store';

@Component({
  selector: 'app-lab-requisition',
  templateUrl: './lab-requisition.component.html',
  styleUrls: ['./lab-requisition.component.scss'],
})
export class LabRequisitionComponent implements OnInit, OnDestroy {
  labTest: string[] = [];

  private ngUnsubscribe = new Subject<void>();

  items: Array<IChoices> = [];

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationSvc: RegistrationService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        if (!s.personalInformation.firstName) {
          this.router.navigate(['register/personal']);
          return;
        }

        this.labTest = s.labRequisition;
      });

    this.getLabItems();
  }

  getLabItems() {
    this.registrationSvc.labRequisitionItems$.subscribe(response => {
      this.items = response.map(
        (x): IChoices => ({
          description: x.name,
          value: x.code,
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  back() {
    this.router.navigate(['register/visaInfo']);
  }
  nextPage() {
    this.store.dispatch(
      UpdateLabRequisition({
        payload: <string[]>this.labTest,
      })
    );
    this.router.navigate(['register/xrayRequisition']);
    return;
  }
}
