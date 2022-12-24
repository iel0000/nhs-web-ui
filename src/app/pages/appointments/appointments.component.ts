import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  items: any;
  isLoading: boolean = true;
  isShowDialog = false;
  status!: number;
  message!: string;
  eMedicalRefNo!: string;

  selectedItem: any;

  constructor(
    private httpSvc: HttpService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.httpSvc
      .get(`Appointment/GetPendingAppointments`)
      .subscribe(response => {
        this.items = response;
        this.isLoading = false;
      });
  }

  showDialog(item: any, status: number) {
    this.eMedicalRefNo = '';
    this.message = 'Confirm Accept Appointment?';
    if (status === 2) {
      this.message = 'Confirm Decline Appointment?';
    }
    this.isShowDialog = true;
    this.selectedItem = item;
    this.status = status;
  }

  actionClicked(item: any, status: number) {
    let payload = {
      appointmentId: item.id,
      appointmentStatus: status,
      eMedicalNumber: this.eMedicalRefNo,
    };

    this.httpSvc.post(`Appointment/UpdateStatus`, payload).subscribe(
      response => {
        this.isShowDialog = false;

        this.messageService.add({
          severity: response.status.toLowerCase(),
          summary: 'Update Appointment',
          detail: response.message,
        });
        this.loadAppointments();
      },
      error => {
        this.isShowDialog = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Update Appointment',
          detail: error.message,
        });
      }
    );
  }

  view(item: any) {
    console.log(item);
  }
}
