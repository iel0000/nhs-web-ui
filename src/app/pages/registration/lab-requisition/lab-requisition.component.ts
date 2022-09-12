import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord } from '../store';

@Component({
  selector: 'app-lab-requisition',
  templateUrl: './lab-requisition.component.html',
  styleUrls: ['./lab-requisition.component.scss'],
})
export class LabRequisitionComponent {
  labTest: string[] = [];
  constructor(private store: Store, private router: Router) {}

  back() {
    this.router.navigate(['register/visaInfo']);
  }
  nextPage() {
    this.router.navigate(['/register/xrayRequisition'])
  }
}

