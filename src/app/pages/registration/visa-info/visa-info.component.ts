import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IVisaInformation } from '@app/shared/interface/registration.interface';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord, UpdateVisaInformation } from '../store';
import { Embassy, visaType, visaCategory } from '@app/shared/constants/visa';

@Component({
  selector: 'app-visa-info',
  templateUrl: './visa-info.component.html',
  styleUrls: ['./visa-info.component.scss'],
})
export class VisaInfoComponent implements OnInit {
  submitted: boolean = false;
  visaForm: FormGroup;
  embassy = Embassy;
  visatype = visaType;
  visacategory = visaCategory;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
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
        this.visaForm.patchValue({
          embassy: s.visaInformation.embassy,
          visaType: s.visaInformation.visaType,
          visaCategory: s.visaInformation.visaCategory,
        });
      });
  }

  back() {
    this.router.navigate(['register/personal']);
  }
  nextPage() {
    if (!this.visaForm.invalid) {
      this.store.dispatch(
        UpdateVisaInformation({
          payload: <IVisaInformation>this.visaForm.getRawValue(),
        })
      );
      this.router.navigate(['register/labRequisition']);
      return;
    }

    this.submitted = true;
  }
}
