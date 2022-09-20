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
export class XrayRequisitionComponent implements OnInit {
  xray: string[] = [];
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
        // if (!s.personalInformation.firstName) {
        //   this.router.navigate(['register/personal']);
        //   return;
        // }
      });
  }

  back() {
    this.router.navigate(['register/labRequisition']);
  }
  nextPage() {
    this.router.navigate(['register/review']);
  }
}
