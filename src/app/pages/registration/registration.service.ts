import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { HttpService } from '@app/shared/services';
import { IDropDown } from '@app/shared/interface';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  // embassyList = new Subject<any>()

  private readonly _embassyList = new BehaviorSubject<any[]>([]);
  readonly embassyList$ = this._embassyList.asObservable();

  private readonly _visaCategory = new BehaviorSubject<any[]>([]);
  readonly visaCategory$ = this._visaCategory.asObservable();

  private readonly _visaType = new BehaviorSubject<any[]>([]);
  readonly visaType$ = this._visaType.asObservable();

  constructor(private httpService: HttpService) {}

  getEmbassies() {
    this.httpService.get('Client/GetEmbassies').subscribe(embassy => {
      this._embassyList.next(embassy);
    });
  }

  getVisaCategory() {
    this.httpService.get('Client/GetVisaCategories').subscribe(embassy => {
      this._visaCategory.next(embassy);
    });
  }

  getVisaType() {
    this.httpService.get('Client/GetVisaTypes').subscribe(embassy => {
      this._visaType.next(embassy);
    });
  }
}
