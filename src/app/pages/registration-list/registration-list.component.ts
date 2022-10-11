import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { formatDate } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { IRegistration } from '@app/shared/interface';
const htmlToPdfmake = require('html-to-pdfmake');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  items: any;
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'FIRST NAME' },
    { field: 'lastName', header: 'LAST NAME' },
    { field: 'dateCreated', header: 'DATE CREATED' },
    { field: 'createdBy', header: 'CREATED BY' },
  ];
  isLoading: boolean = true;
  detailsToPrint: any;

  @ViewChild('contentToConvert')
  contentToConvert!: ElementRef;

  constructor(
    private router: Router,
    private httpSvc: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    console.log('init');
  }

  loadTableItems() {
    this.httpSvc.get('Client/GetRegistrationList').subscribe(
      response => {
        this.items = response;
        this.isLoading = false;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Get Lists',
          detail: error.message,
        });
        this.isLoading = false;
      }
    );
  }

  getControlNumber(element: any): string {
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

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }

  loadRegisterPage() {
    this.isLoading = true;
    this.router.navigate(['register/personal']);
  }

  editItem(item: any) {
    this.router.navigate([`register/personal/${item.id}`]);
  }

  deleteItem(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete selected record?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpSvc
          .get(`Client/DeleteRegistrationRecord/${item.id}`)
          .subscribe(
            response => {
              this.messageService.add({
                severity: response.status.toLowerCase(),
                summary: 'Delete Record',
                detail: response.message,
              });
              this.loadTableItems();
            },
            error => {
              this.messageService.add({
                severity: 'error',
                summary: 'Delete Record',
                detail: error.message,
              });
            }
          );
      },
    });
  }

  generatePdf(item: any) {
    this.httpSvc
      .get(`Client/LoadRegistrationRecord/${item.id}`)
      .subscribe(response => {
        let registrationModel: IRegistration = {
          id: response.id,
          personalInformation: {
            id: response.personalInformation.id,
            personalCategory:
              response.personalInformation.personalCategory.toString(),
            referral: response.personalInformation.referral.toString(),
            firstName: response.personalInformation.firstName,
            lastName: response.personalInformation.lastName,
            middleName: response.personalInformation.middleName,
            birthDate: response.personalInformation.birthDate,
            age: response.personalInformation.age,
            gender: response.personalInformation.gender,
            address: response.personalInformation.address,
            mobileNumber: response.personalInformation.mobileNumber,
            email: response.personalInformation.email,
            eMedicalRefNo: response.personalInformation.eMedicalRefNo,
            civilStatus: response.personalInformation.civilStatus,
            hasMenstrualPeriod: response.personalInformation.hasMenstrualPeriod,
            menstrualPeriodStart:
              response.personalInformation.menstrualPeriodStart,
            menstrualPeriodEnd: response.personalInformation.menstrualPeriodEnd,
            intendedOccupation: response.personalInformation.intendedOccupation,
            hasPassport: response.personalInformation.hasPassport,
            passportNumber: response.personalInformation.passportNumber,
            dateIssued: response.personalInformation.dateIssued,
            isExpired: response.personalInformation.isExpired,
            hasOtherId: response.personalInformation.hasOtherId,
            otherId: response.personalInformation.otherId,
            landLineNumber: response.personalInformation.landLineNumber,
            isAcceptedTerms: response.personalInformation.isAcceptedTerms,
          },
          visaInformation: {
            id: response.visaInformation.id,
            embassy: response.visaInformation.embassy.toString(),
            visaCategory: response.visaInformation.visaCategory.toString(),
            visaType: response.visaInformation.visaType.toString(),
            isFirstVisa: response.visaInformation.isFirstVisa,
            hasVisaRejected: response.visaInformation.hasVisaRejected,
            lengthOfStay: response.visaInformation.lengthOfStay.toString(),
            hasLetterReceived: response.visaInformation.hasLetterReceived,
            isTemporaryVisa: response.visaInformation.isTemporaryVisa,
            isHealthAssessed: response.visaInformation.isHealthAssessed,
            intendedWork: response.visaInformation.intendedWork.toString(),
          },
          labRequisition: {
            id: response.labRequisition.id,
            labRequisition: response.labRequisition.labRequisition,
          },
        };

        this.detailsToPrint = registrationModel;

        //make time to load properdetails
        setTimeout(() => {
          this.printPdf();
        });
      });
  }
  printPdf() {
    const pdfTable = this.contentToConvert.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).print();
    this.detailsToPrint = null;
  }
}
