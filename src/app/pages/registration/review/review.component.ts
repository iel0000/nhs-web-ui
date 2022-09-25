import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { statusMessage } from '@app/shared/constants';
import { IChoices } from '@app/shared/interface';
import {
  IPersonalInformation,
  IRegistration,
  IVisaInformation,
} from '@app/shared/interface/registration.interface';
import { HttpService } from '@app/shared/services';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';
import { RegistrationService } from '../registration.service';
import { selectRecord } from '../store';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  reviewForm!: IRegistration;
  private ngUnsubscribe = new Subject<void>();

  labItems: Array<IChoices> = [];

  embassy: string | undefined;
  visaType: string | undefined;
  visaCategory: string | undefined;
  selectedLabRequisition: string[] = [];
  id: any
  constructor(
    private store: Store,
    private router: Router,
    private registrationSvc: RegistrationService,
    private httpService: HttpService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.reviewForm = {
      id: 0,
      personalInformation: {
        id: 0,
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        age: '',
        gender: '',
        address: '',
        contactDetails: '',
        email: '',
        eMedicalRefNo: '',
      },
      visaInformation: {
        id: 0,
        embassy: '',
        visaType: '',
        visaCategory: '',
      },
      labRequisition: {
        id: 0,
        labRequisition: []
      },
    };
  }

  get personalInformation(): IPersonalInformation {
    return this.reviewForm.personalInformation;
  }

  get visaInformation(): IVisaInformation {
    return this.reviewForm.visaInformation;
  }

  get emailAddress(): string {
    if (this.personalInformation.email) {
      return this.personalInformation.email;
    }
    return '-';
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    this.store
      .select(selectRecord)
      .pipe(take(1))
      .subscribe(s => {
        if (!s.personalInformation.firstName) {
          if(this.id) {
            this.router.navigate([`register/personal/${this.id}`]);
            return;
          }

          this.router.navigate(['register/personal']);
        }
        this.reviewForm.id = s.id;
        this.reviewForm.personalInformation = s.personalInformation;
        this.reviewForm.labRequisition = s.labRequisition;
        this.reviewForm.visaInformation = s.visaInformation;
      });

    this.getVisaCategories();
    this.getVisaTypes();
    this.getEmbassies();
    this.getlabRequisition();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  getlabRequisition() {
    this.registrationSvc.labRequisitionItems$.subscribe(response => {
      this.selectedLabRequisition = [];
      this.labItems = response.map(
        (x): IChoices => ({
          description: x.name,
          value: x.code,
        })
      );

      this.reviewForm.labRequisition.labRequisition.forEach(element => {
        let labItem = this.labItems.find(x => x.value === element);
        if (labItem) {
          this.selectedLabRequisition.push(labItem.description);
        }
      });

      if (this.selectedLabRequisition.length === 0) {
        this.selectedLabRequisition.push(' ');
      }
    });
  }

  getEmbassies() {
    if (this.reviewForm.visaInformation.embassy) {
      this.registrationSvc.embassyList$
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(element => {
          this.embassy = element.find(
            x => x.code === this.visaInformation.embassy
          ).name;
        });
    }
  }

  getVisaTypes() {
    if (this.reviewForm.visaInformation.visaType) {
      this.registrationSvc.visaType$
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(element => {
          this.visaType = element.find(
            x => x.code === this.visaInformation.visaType
          ).name;
        });
    }
  }

  getVisaCategories() {
    if (this.reviewForm.visaInformation.visaCategory) {
      this.registrationSvc.visaCategory$
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(element => {
          this.visaCategory = element.find(
            x => x.code === this.visaInformation.visaCategory
          ).name;
        });
    }
  }

  back() {
    if(this.id) {
      this.router.navigate([`register/xrayRequisition/${this.id}`]);
      return;
    }

    this.router.navigate(['register/xrayRequisition']);
  }

  saveRecord() {
    let url = 'Client/SaveClientForm';
    if(this.id) {
      url = 'Client/UpdateClientForm'
    }

    this.httpService
      .post(url, this.reviewForm)
      .pipe()
      .subscribe(
        response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Save Record',
            detail: statusMessage.SAVESUCCESS,
          });
          this.router.navigate(['registration-list']);
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Save Record',
            detail: error.message,
          });
        }
      );
    
  }
}
