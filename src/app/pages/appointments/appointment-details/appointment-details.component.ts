import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit, OnDestroy {
  item: any;
  id: any;
  embassy!: string;
  visaType!: string;
  visaCategory!: string;
  categories!: string;
  referrals!: string;
  intendedWork!: string;
  lengthOfStay!: string;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    public router: Router,
    private httpSvc: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.httpSvc
        .get(`Appointment/LoadAppointmentRecord/${this.id}`)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(response => {
          console.log(response);
          if (response) {
            this.item = response;

            this.getEmbassy();
            this.getVisaCategory(this.item.visaInformation.embassy);
            this.getVisaType();
            this.getPersonalCategories();
            this.getReferrals();
            this.getIntendedLengthOfStay();
            this.getIntendedWork();
          } else {
            this.router.navigate(['**'], { skipLocationChange: true });
          }
        });
    }
  }

  getEmbassy() {
    this.httpSvc
      .get('Client/GetEmbassies')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        console.log('embassies', response);
        this.embassy = response.find(
          (x: any) => +x.code === this.item.visaInformation.embassy
        )?.name;
      });
  }

  getVisaCategory(embassyId: number) {
    this.httpSvc
      .get(`Client/GetVisaCategories/${embassyId}`)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.visaCategory = response.find(
          (x: any) => +x.code === this.item.visaInformation.visaCategory
        )?.name;
      });
  }

  getVisaType() {
    this.httpSvc.get('Client/GetVisaTypes').subscribe(response => {
      this.visaType = response.find(
        (x: any) => +x.code === this.item.visaInformation.visaType
      )?.name;
    });
  }

  getIntendedWork() {
    this.httpSvc
      .get('Client/GetIntendedWork')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.intendedWork = response.find(
          (x: any) => +x.code === this.item.visaInformation.intendedWork
        )?.name;
      });
  }

  getIntendedLengthOfStay() {
    this.httpSvc
      .get('Client/GetIntendedLengthOfStay')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.lengthOfStay = response.find(
          (x: any) => +x.code === this.item.visaInformation.lengthOfStay
        )?.name;
      });
  }

  getReferrals() {
    this.httpSvc
      .get('Client/GetReferrals')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.referrals = response.find(
          (x: any) => +x.code === this.item.personalInformation.referral
        )?.name;
      });
  }

  getPersonalCategories() {
    this.httpSvc
      .get('Client/GetPersonalCategories')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.categories = response.find(
          (x: any) => +x.code === this.item.personalInformation.personalCategory
        )?.name;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getControlNumber(element: any): string {
    if (element) {
      let controlNumber = `${formatDate(
        element.dateCreated,
        'yyyy-MM-dd',
        'en-us'
      )}-${this.padLeft(element.id, '0', 5)}`;

      if (element.personalInformation.personalCategory === 3) {
        controlNumber = `P-${controlNumber}`;
      } else if (element.personalInformation.personalCategory === 4) {
        controlNumber = `SC-${controlNumber}`;
      }
      return controlNumber;
    }

    return '';
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }
}
