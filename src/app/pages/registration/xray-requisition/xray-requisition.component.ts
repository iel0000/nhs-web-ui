import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord } from '../store';

@Component({
  selector: 'app-xray-requisition',
  templateUrl: './xray-requisition.component.html',
  styleUrls: ['./xray-requisition.component.scss'],
})
export class XrayRequisitionComponent {
  xray: string[] = [];
  constructor(private store: Store, private router: Router) {}

  back() {
    this.router.navigate(['register/labRequisition']);
  }
  nextPage() {
    this.router.navigate(['register/review']);
  }
}
