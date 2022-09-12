import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectRecord } from '../store';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  constructor(private store: Store, private router: Router) {}

  back() {
    this.router.navigate(['register/xrayRequisition']);
  }
  nextPage() {
    this.router.navigate(['/register/review'])
}
}
