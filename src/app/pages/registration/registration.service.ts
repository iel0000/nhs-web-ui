import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { HttpService } from '@app/shared/services';
import { IRegistration } from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { LoadRegistrationRecord } from './store';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  // embassyList = new Subject<any>()

  private readonly _embassyList = new BehaviorSubject<any[]>([]);
  readonly embassyList$ = this._embassyList.asObservable();

  private readonly _visaCategory = new BehaviorSubject<any[]>([]);
  readonly visaCategory$ = this._visaCategory.asObservable();

  private readonly _visaType = new BehaviorSubject<any[]>([]);
  readonly visaType$ = this._visaType.asObservable();

  private readonly _labRequisitionItems = new BehaviorSubject<any[]>([]);
  readonly labRequisitionItems$ = this._labRequisitionItems.asObservable();

  private readonly _registrationRecord = new BehaviorSubject<any[]>([]);
  readonly registrationRecord$ = this._registrationRecord.asObservable();

  constructor(private httpService: HttpService, private store: Store) { }

  getEmbassies() {
    this.httpService.get('Client/GetEmbassies').subscribe(response => {
      this._embassyList.next(response);
    });
  }

  getVisaCategory() {
    this.httpService.get('Client/GetVisaCategories').subscribe(response => {
      this._visaCategory.next(response);
    });
  }

  getVisaType() {
    this.httpService.get('Client/GetVisaTypes').subscribe(response => {
      this._visaType.next(response);
    });
  }

  getLabRequisitionItems() {
    this.httpService
      .get('Client/GetLabRequisitionItems')
      .subscribe(response => {
        this._labRequisitionItems.next(response);
      });
  }

  loadRegistrationRecord(id: any) {
    this.httpService
      .get(`Client/LoadRegistrationRecord/${id}`)
      .subscribe(response => {
        let registrationModel: IRegistration = {
          id: response.id,
          personalInformation: {
            id: response.personalInformation.id,
            firstName: response.personalInformation.firstName,
            lastName: response.personalInformation.lastName,
            middleName: response.personalInformation.middleName,
            birthDate: response.personalInformation.birthDate,
            age: response.personalInformation.age,
            gender: response.personalInformation.gender,
            address: response.personalInformation.address,
            contactDetails: response.personalInformation.contactDetails,
            email: response.personalInformation.email,
            eMedicalRefNo: response.personalInformation.eMedicalRefNo,
          },
          visaInformation: {
            id: response.visaInformation.id,
            embassy: response.visaInformation.embassy.toString(),
            visaCategory: response.visaInformation.visaCategory.toString(),
            visaType: response.visaInformation.visaType.toString()
          },
          labRequisition: {
            id: response.labRequisition.id,
            labRequisition: response.labRequisition.labRequisition
          }
        }
        this.store.dispatch(
          LoadRegistrationRecord({
            payload: <IRegistration>registrationModel,
          })
        );
      });
  }
}
