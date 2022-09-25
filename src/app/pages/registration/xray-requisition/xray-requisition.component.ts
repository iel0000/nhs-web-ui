import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: any;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
      });
  }

  back() {
    if (this.id) {
      this.router.navigate([`register/labRequisition/${this.id}`]);
      return;
    }

    this.router.navigate(['register/labRequisition']);
  }
  nextPage() {
    if (this.id) {
      this.router.navigate([`register/review/${this.id}`]);
      return;
    }

    this.router.navigate(['register/review']);
  }
}
