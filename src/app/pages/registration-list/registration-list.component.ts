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
    const pdfTable = this.contentToConvert.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).print();
  }
}
