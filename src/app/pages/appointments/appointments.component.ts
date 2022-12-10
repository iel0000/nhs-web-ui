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

  actionClicked(item: any, status: number) {
    let message = 'Confirm Accept Appointment?';
    if (status === 2) {
      message = 'Confirm Decline Appointment?';
    }

    let payload = {
      appointmentId: item.Id,
      appointmetStatus: status,
    };
    this.confirmationService.confirm({
      message: message,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpSvc.post(`Appointment/UpdateStatus`, payload).subscribe(
          response => {
            this.messageService.add({
              severity: response.status.toLowerCase(),
              summary: 'Update Appointment',
              detail: response.message,
            });
            this.loadAppointments();
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Appointment',
              detail: error.message,
            });
          }
        );
      },
    });
  }
}
