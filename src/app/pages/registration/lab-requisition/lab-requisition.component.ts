import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IChoices } from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord, UpdateLabRequisition } from '../store';

@Component({
  selector: 'app-lab-requisition',
  templateUrl: './lab-requisition.component.html',
  styleUrls: ['./lab-requisition.component.scss'],
})
export class LabRequisitionComponent {
  labTest: string[] = [];

  items: Array<IChoices> = [
    { description: 'AE Package - HIV, Urinalysis', value: '1' },
    {
      description:
        'NZ Package - VDRL, HIV, HBSag, Anti-HCV, FBC, HBA1c, Creatine w/ eGFR, Urinalysis',
      value: '2',
    },
    { description: 'Urinalysis', value: '3' },
    {
      description: 'CE Package - HIV, VDRL/RPR, Creatinine, Urinalysis',
      value: '4',
    },
    { description: 'NZ Limited -FBC, Creatinine w/eGFR', value: '5' },
    { description: 'IGRA', value: '6' },
    { description: 'Others', value: '7' },
  ];

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
        if (!s.personalInformation.firstName) {
          this.router.navigate(['register/personal']);
          return;
        }

        this.labTest = s.labRequisition;
      });
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
