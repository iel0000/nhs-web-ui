import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { HttpService } from '@app/shared/services';
import { IDropDown, IPersonalInformation, IVisaInformation } from '@app/shared/interface';
import { Store } from '@ngrx/store';
import { UpdatePersonalInformation, UpdateVisaInformation } from './store';

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
        this._registrationRecord.next(response)
        this.store.dispatch(
          UpdatePersonalInformation({
            payload: <IPersonalInformation>response.personalInformation,
          })
        );

        this.store.dispatch(
          UpdateVisaInformation({
            payload: <IVisaInformation>response.visaInformation,
          })
        );
      });
  }
}
